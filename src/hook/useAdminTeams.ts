'use client'

import axiosInstance from '@/lib/api'
import { TUserTeams } from '@/types/admin'

import { useQuery } from '@tanstack/react-query'


const fetchAdminTeams = async (): Promise<TUserTeams> => {
  const res = await axiosInstance.get('/user-teams')
  return res.data.data
}

export const useAdminTeams = () => {
  return useQuery({
    queryKey: ['user-teams'],
    queryFn: fetchAdminTeams,
  })
}