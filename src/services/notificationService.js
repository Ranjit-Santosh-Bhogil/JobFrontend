export const notificationService = {
  async requestPermission() {
    if (!('Notification' in window)) return 'unsupported'
    if (Notification.permission === 'granted') return 'granted'
    if (Notification.permission === 'denied') return 'denied'
    return Notification.requestPermission()
  },

  show(title, options = {}) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return null
    }
    return new Notification(title, options)
  },
}
