import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'

function ProgramSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden">
            <div className="relative h-0 pb-[70%] bg-gray-200 animate-pulse" />
            <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
            </CardFooter>
        </Card>
    )
}

export default ProgramSkeleton;