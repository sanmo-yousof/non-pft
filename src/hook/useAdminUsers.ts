'use client'

import axiosInstance from '@/lib/api'
import { TUsers } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'


const fetchAdminUsers = async (): Promise<TUsers[]> => {
  const res = await axiosInstance.get('/users')
  return res.data.data
}

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchAdminUsers,
  })
}