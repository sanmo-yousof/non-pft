'use client'

import axiosInstance from '@/lib/api'
import { TRegistrationLevels } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'




const fetchAdminRegistrationLevels = async (): Promise<TRegistrationLevels[]> => {
  const res = await axiosInstance.get('/registration-levels')
  return res.data.data
}

export const useAdminRegistrationLevels = () => {
  return useQuery({
    queryKey: ['admin-registration-levels'],
    queryFn: fetchAdminRegistrationLevels,
  })
}