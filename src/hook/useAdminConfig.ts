'use client'

import axiosInstance from '@/lib/api'
import { TConfig } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'


const fetchAdminConfig = async (): Promise<TConfig> => {
  const res = await axiosInstance.get('/settings')
  return res.data.data
}

export const useAdminConfig = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchAdminConfig,
  })
}