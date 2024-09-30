import { Skeleton } from "@/components/ui/skeleton"


function CoachTableSkeleton() {
    return (
        <>
            <tr>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="ml-4 space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[120px]" />
                        </div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-900 ">
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-900 ">
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-end">
                        <Skeleton className="h-8 w-[100px]" />
                    </div>
                </td>
            </tr>
            <tr>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="ml-4 space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[120px]" />
                        </div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-900 ">
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-900 ">
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-end">
                        <Skeleton className="h-8 w-[100px]" />
                    </div>
                </td>
            </tr>
            <tr>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="ml-4 space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[120px]" />
                        </div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-900 ">
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-900 ">
                        <Skeleton className="h-4 w-[80px]" />
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 w-[25%]">
                    <div className="flex gap-1 items-center justify-end">
                        <Skeleton className="h-8 w-[100px]" />
                    </div>
                </td>
            </tr>
        </>
    )
}

export default CoachTableSkeleton