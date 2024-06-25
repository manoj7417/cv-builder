import { cn } from '@/lib/utils'
import React from 'react'

function CustomLabelInput({ className, children, ...props }) {
    return (
        <input className={cn("focus:outline-none w-full bg-transparent text-black border-b-2 border-black text-2xl font-bold", className)} {...props} type='text' />
    )
}

export default CustomLabelInput