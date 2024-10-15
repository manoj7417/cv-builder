"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react';
import { ChevronRight, CirclePlus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ProgramValidationSchema } from './ProgramValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

function CreateProgram() {

    const [isMounted, setIsMounted] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(ProgramValidationSchema),
        defaultValues: {
            title: "",
            description: "",
            prerequisites: [
                {
                    type: "",
                    description: "",
                    attachmentUrl: "",
                },
            ],
            days: []
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "prerequisites",
    });
    const [openAccordion, setOpenAccordion] = useState(fields.length > 0 ? 'item-0' : null);
    const handleAddPrequisites = () => {
        const newIndex = fields.length;
        append({
            type: "",
            description: "",
            attachmentUrl: "",
        });
        setOpenAccordion(`item-${newIndex}`);
    };

    const deletePrerequisite = (index) => {
        remove(index);
        if (openAccordion === `item-${index}`) {
            setOpenAccordion(null);
        }
    };

    const handleCreateProgram = (data) => {
        console.log(data)
        toast.success("Program created successfully");
    }

    const handleAccordionToggle = (value) => {
        if (openAccordion === value) {
            setOpenAccordion(null);
        } else {
            setOpenAccordion(value);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='w-full h-full min-h-screen p-10 '>
            <div className='w-full h-full shadow-lg rounded-lg p-8'>
                <form onSubmit={handleSubmit(handleCreateProgram)}>
                    <h1 className='py-4 text-lg font-bold' >Create a new program</h1>
                    <div className='py-2'>
                        <Label >Title</Label>
                        <Input placeholder='Enter program title' className='my-2' {...register("title")} />
                        <p className='text-red-500 text-sm ml-2'>{errors.title?.message}</p>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Textarea placeholder='Enter program description' className='my-2' {...register("description")} />
                        <p className='text-red-500 text-sm ml-2'>{errors.description?.message}</p>
                    </div>
                    <div className='py-6'>
                        <div className='flex w-full justify-between items-center'>
                            <p className='text-lg font-bold text-blue-950'>Prerequisites</p>
                            <Button onClick={handleAddPrequisites} type='button'>Add <CirclePlus className='h-4 ml-1' /> </Button>
                        </div>
                        <div className='py-4'>
                            {
                                fields.length > 0 && fields.map((prerequisite, index) => (
                                    <Accordion type="single" collapsible className='shadow-md my-4 rounded-sm' key={index} value={openAccordion}>
                                        <AccordionItem value={`item-${index}`}>
                                            <AccordionTrigger className='w-full px-2 text-blue-800 py-4' onClick={() => handleAccordionToggle(`item-${index}`)}>
                                                <div className='w-full flex items-center justify-between px-2'>
                                                    <p>
                                                        {prerequisite.type || "(Not specified)"}
                                                    </p>
                                                    <Button className='hover:bg-gray-100 p-2 rounded-md bg-white'
                                                        type='button' onClick={() => deletePrerequisite(index)}><Trash2 className='h-4 text-red-500' /></Button>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className='py-2 px-8'>
                                                    <div className='py-3'>
                                                        <Label>Type</Label>
                                                        <Input
                                                            placeholder='Enter type of prerequisite'
                                                            className='my-2'
                                                            {...register(`prerequisites.${index}.type`)}
                                                        />
                                                        <p className='text-red-500 text-sm ml-2'>{errors?.prerequisites?.[index]?.type?.message}</p>
                                                    </div>
                                                    <div className='py-3'>
                                                        <Label>Description</Label>
                                                        <Textarea
                                                            placeholder='Enter description'
                                                            className='my-2'
                                                            {...register(`prerequisites.${index}.description`)}
                                                        />
                                                        <p className='text-red-500 text-sm ml-2'>{errors?.prerequisites?.[index]?.description?.message}</p>
                                                    </div>
                                                    <div className='py-3'>
                                                        <Label className='font-medium'>Attachments</Label>
                                                        <Input
                                                            placeholder='Enter attachment url'
                                                            className='my-2'
                                                            {...register(`prerequisites.${index}.attachmentUrl`)}
                                                        />
                                                        <p className='text-red-500 text-sm ml-2'>{errors?.prerequisites?.[index]?.attachmentUrl?.message}</p>
                                                    </div>
                                                </div>
                                            </AccordionContent>

                                        </AccordionItem>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </div>
                    <div className='w-full flex justify-end py-4'>
                        <Button>Create Program <ChevronRight className='h-4 ' type='submit' /></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProgram