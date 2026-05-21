'use client'

import axiosInstance from '@/lib/api'
import { TSponsors } from '@/types/admin'
import { useQuery } from '@tanstack/react-query'


const fetchadminSponsorship = async (): Promise<TSponsors[]> => {
  const res = await axiosInstance.get('/sponsorship-levels')
  return res.data.data
}

export const useAdminSponsorship = () => {
  return useQuery({
    queryKey: ['sponsorship'],
    queryFn: fetchadminSponsorship,
  })
}