"use client"
import { GetTokens } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function EditRequests() {
    const [isLoading, setIsLoading] = useState(true)
    const [requests, setRequests] = useState([])

    const handlegetEditCoach = async () => {
        const { accessToken } = await GetTokens()
        if (!accessToken && !accessToken.value) {
            toast("Please login")
            return
        }
        try {
            const response = await axios.get("/api/getEditCoachRequests", {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            if (response.status === 200) {
                
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handlegetEditCoach()
    }, [])
    if (isLoading) {
        return (
            <Table>
                <TableCaption>
                    <Skeleton className="h-4 w-2/3 mx-auto" />
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-32" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(3)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Skeleton className="h-8 w-20" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold text-gray-700">No Requests Yet</h2>
                <p className="text-gray-500 mt-2">There are currently no pending requests from coaches.</p>
            </div>
        )
    }

    return (
        <Table>
            <TableCaption>Coach Profile Edit Requests</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Coach Name</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell>{request.coachName}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{request.requestType}</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button onClick={() => handleApprove(request.id)} size="sm" variant="outline">Approve</Button>
                                <Button onClick={() => handleReject(request.id)} size="sm" variant="outline">Reject</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default EditRequests