import { Button } from '@/components/ui/button'
import React from 'react';
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const samplePrograms = [
    { id: 1, title: 'Web Development Bootcamp', description: 'Learn full-stack web development in 12 weeks.', image: '/placeholder.svg?height=400&width=600' },
    { id: 2, title: 'Data Science Fundamentals', description: 'Master the basics of data analysis and machine learning.', image: '/placeholder.svg?height=400&width=600' },
    { id: 3, title: 'UX/UI Design Course', description: 'Create stunning user interfaces and experiences.', image: '/placeholder.svg?height=400&width=600' },
    { id: 4, title: 'Mobile App Development', description: 'Build iOS and Android apps using React Native.', image: '/placeholder.svg?height=400&width=600' },
    { id: 5, title: 'Cybersecurity Essentials', description: 'Learn to protect systems and networks from cyber threats.', image: '/placeholder.svg?height=400&width=600' },
    { id: 6, title: 'Cloud Computing Fundamentals', description: 'Master cloud services and deployment models.', image: '/placeholder.svg?height=400&width=600' },
]

function Programs() {
    return (
        <div className='w-full min-h-screen p-10'>
            <div className='w-full h-full'>
                <div className='w-full flex justify-end'>
                    <Link href='/coach-dashboard/create-program'>
                        <Button >New Program <CirclePlus className='h-5 ml-1' /></Button>
                    </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10'>
                    {samplePrograms.map((program) => (
                        <Card key={program.id} className='flex flex-col overflow-hidden'>
                            <div className='relative h-0 pb-[70%]'>
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className='text-lg'>{program.title}</CardTitle>
                            </CardHeader>
                            <CardContent className='flex-grow'>
                                <p className='text-sm text-muted-foreground'>{program.description}</p>
                            </CardContent>
                            <CardFooter className='flex justify-end space-x-2'>
                                <Button variant='outline' size='sm' className='text-blue-950 hover:bg-blue-950 hover:text-white'>
                                    <Pencil className='h-4 w-4 mr-2' />
                                    Edit
                                </Button>
                                <Button variant='outline' size='sm' className='text-red-600 hover:bg-red-600 hover:text-white'>
                                    <Trash2 className='h-4 w-4 mr-2' />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Programs