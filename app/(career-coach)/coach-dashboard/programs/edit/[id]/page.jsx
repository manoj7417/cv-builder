'use client'
import { useParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

function EditProgramfunc() {
    const { id } = useParams()
    const [isInfoLoading, setIsInfoLoading] = useState(true)
    const handleGetProgrambyId = async (id) => {

        try {
            const { data } = await axios.get(`/api/getProgramById/${id}`)
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsInfoLoading(false)
        }
    }

    useEffect(() => {
        handleGetProgrambyId()
    }, [id])
    return (
        <div className='w-full '>
            {isInfoLoading ? <div className='h-screen w-full flex items-center justify-center'>
                <p>Loading...</p>
            </div>
                : <p>Program Information here</p>}
        </div>
    )
}


const EditProgram = () => {
    return (
        <Suspense >
            <EditProgramfunc />
        </Suspense>
    )
}

export default EditProgram