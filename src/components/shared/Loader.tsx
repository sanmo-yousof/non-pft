import { cn } from '@/lib/utils'
import React from 'react'

export default function Loader({ className }: { className?: string }) {
    return (
        <div className={cn(`flex items-center justify-center h-[calc(100vh-65px)]`, className)}>
            <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}
