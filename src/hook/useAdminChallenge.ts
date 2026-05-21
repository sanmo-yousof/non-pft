'use client'

import axiosInstance from '@/lib/api'
import { TChallenges } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'




const fetchAdminChallenges = async (): Promise<TChallenges> => {
  const res = await axiosInstance.get('/challenges')
  return res.data.data
}

export const useAdminChallenges = () => {
  return useQuery({
    queryKey: ['admin-challenges'],
    queryFn: fetchAdminChallenges,
  })
}