import React from 'react'
import { Card, CardContent } from '../ui/card'
import { TAchievements } from '@/types/admin'

const Achievment = ({data,totalRaised}:{data?:TAchievements|null;totalRaised:number}) => {
  return (
    <Card className="bg-white rounded-2xl border border-stone-100 mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-3">Achievement Level</h3>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-sm font-bold text-emerald-800">{data?.achievement}</p>
                <p className="text-xs text-emerald-600 mt-1">Swag: {data?.swag}</p>
                <p className="text-xs text-stone-500 mt-1">Total raised: ${totalRaised}</p>
              </div>
            </CardContent>
          </Card>
  )
}

export default Achievment
