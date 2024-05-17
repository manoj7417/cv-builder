import { cn } from '@/lib/utils'
import React from 'react'

function CustomLabelInput({ className, children, ...props }) {
    return (
        <input className={cn("text-2xl border-b-2 text-blue-900 border-blue-900 font-medium focus:outline-none w-full", className)} {...props} type='text' />
    )
}

export default CustomLabelInput