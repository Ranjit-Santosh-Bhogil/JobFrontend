import fs from 'fs'
import path from 'path'

const wrong = ['m', 'o', 't', 'i', 'o', 'n'].join('')
const right = ['d', 'i', 'v'].join('')

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file)
    if (fs.statSync(full).isDirectory()) walk(full)
    else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(full, 'utf8')
      const fixed = content
        .replaceAll(`<${wrong}`, `<${right}`)
        .replaceAll(`</${wrong}>`, `</${right}>`)
        .replaceAll(`</${wrong}`, `</${right}>`)
      if (fixed !== content) {
        fs.writeFileSync(full, fixed)
        console.log('fixed', full)
      }
    }
  }
}

walk('src')
