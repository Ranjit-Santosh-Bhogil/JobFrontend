import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '@/api/adminApi'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PageHeader from '@/components/common/PageHeader'
import Pagination from '@/components/common/Pagination'
import UserTable from '@/components/admin/UserTable'
import { usePagination } from '@/hooks/usePagination'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')
  const { page, totalPages, paginationParams, setPage, updateFromResponse } = usePagination()

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const { data } = await adminApi.getUsers(paginationParams)
      setUsers(data.content ?? data ?? [])
      updateFromResponse(data)
    } catch (err) {
      setError(err.message || 'Failed to load users.')
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }, [paginationParams, updateFromResponse])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleStatusChange = async (userId, enabled) => {
    setUpdatingId(userId)
    try {
      const { data } = await adminApi.updateUserStatus(userId, { enabled })
      setUsers((current) => current.map((user) => (user.id === userId ? data : user)))
    } catch (err) {
      setError(err.message || 'Failed to update user.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <>
      <PageHeader title="Users" subtitle="Enable or disable platform accounts" />
      {isLoading && <Loader />}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {!isLoading && users.length === 0 && <EmptyState title="No users found" message="Registered users will appear here." />}
      {!isLoading && users.length > 0 && <UserTable users={users} onStatusChange={handleStatusChange} updatingId={updatingId} />}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={isLoading} />
    </>
  )
}
