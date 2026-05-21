'use client'

import axiosInstance from '@/lib/api'
import { TAchievements } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'


const fetchAdminAchievments = async (): Promise<TAchievements[]> => {
  const res = await axiosInstance.get('/achievement-levels')
  return res.data.data
}

export const useAdminAchivments = () => {
  return useQuery({
    queryKey: ['achievments-levels'],
    queryFn: fetchAdminAchievments,
  })
}