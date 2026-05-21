'use client'

import axiosInstance from '@/lib/api'
import { TCorporate } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'


const fetchAdminCorporate = async (): Promise<TCorporate[]> => {
  const res = await axiosInstance.get('/corporate-sponsors')
  return res.data.data
}

export const useAdminCorporate = () => {
  return useQuery({
    queryKey: ['corporate'],
    queryFn: fetchAdminCorporate,
  })
}