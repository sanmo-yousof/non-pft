'use client'

import { getApi } from '@/lib/apiHandler'
import { useQuery } from '@tanstack/react-query'

const fetchAllWalkers = async () => {
  const res: any = await getApi('/all-walker')
  return res.data?.data || []
}

export const useAllWalkers = () => {
  return useQuery({
    queryKey: ['allWalkers'],
    queryFn: fetchAllWalkers,
  })
}
