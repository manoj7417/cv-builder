import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CirclePlus, Trash2 } from 'lucide-react';
import React from 'react'
import { useFieldArray, useWatch } from 'react-hook-form';
import PrerequisitesFieldArray from './PrerequisitesFieldArray';
import SubModuleFieldArray from './SubModuleFieldArray';

function DaysFieldArray({ control, register, errors }) {
    const { fields: dayFields, append: appendDay, remove: removeDay } = useFieldArray({
        control,
        name: "days",
    });
    const days = useWatch({
        control,
        name: "days"
    });

    const [openDayAccordion, setOpenDayAccordion] = React.useState(dayFields.length > 0 ? 'item-0' : null);

    const handleAccordionToggleDay = (value) => {
        if (openDayAccordion === value) {
            setOpenDayAccordion(null);
        } else {
            setOpenDayAccordion(value);
        }
    };

    const handleAddDay = () => {
        appendDay({
            title: "",
            description: "",
            prerequisites: [],
            subModules: [],
            timeToComplete: 0
        });
        setOpenDayAccordion(`item-${dayFields.length}`);
    };

    const deleteDay = (index) => {
        removeDay(index);
        if (openDayAccordion === `item-${index}`) {
            setOpenDayAccordion(null);
        }
    };

    return (
        <div className='py-6'>
            <div className='flex w-full justify-between items-center'>
                <p className='text-lg font-bold text-blue-950'>Program Days</p>
            </div>
            <div className='py-4'>
                {dayFields.length > 0 && dayFields.map((day, index) => (
                    <div key={index}>
                        <Accordion type="single" collapsible className='border border-gray-200 my-4 rounded-lg' key={index} value={openDayAccordion}>
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger className='w-full px-2 text-blue-800 py-4' onClick={() => handleAccordionToggleDay(`item-${index}`)}>
                                    <div className='w-full flex items-center justify-between px-2'>
                                        <p>{days[index]?.title ? days[index].title : "(Not specified)"}</p>
                                        <Button className='hover:bg-gray-100 p-2 rounded-md bg-white'
                                            type='button' onClick={() => deleteDay(index)}><Trash2 className='h-4 text-red-500' /></Button>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='py-2 px-8'>
                                        <div className='py-3'>
                                            <Label>Title<span className='text-red-500 ml-1'>*</span></Label>
                                            <Input
                                                placeholder='Enter day title'
                                                className='my-2'
                                                {...register(`days.${index}.title`)}
                                            />
                                            <p className='text-red-500 text-sm ml-2'>{errors?.days?.[index]?.title?.message}</p>
                                        </div>
                                        <div className='py-3'>
                                            <Label>Description<span className='text-red-500 ml-1'>*</span></Label>
                                            <Textarea
                                                placeholder='Enter description'
                                                className='my-2'
                                                {...register(`days.${index}.description`)}
                                            />
                                            <p className='text-red-500 text-sm ml-2'>{errors?.days?.[index]?.description?.message}</p>
                                        </div>
                                        <div className='py-3'>
                                            <Label>Time to complete (minutes)<span className='text-red-500 ml-1'>*</span></Label>
                                            <Input type='number'
                                                placeholder='Enter time to complete in minutes'
                                                min={'0'}
                                                className='my-2'
                                                {...register(`days.${index}.timeToComplete`)}
                                            />
                                            <p className='text-red-500 text-sm ml-2'>{errors?.days?.[index]?.timeToComplete?.message}</p>
                                        </div>
                                        <PrerequisitesFieldArray
                                            control={control}
                                            register={register}
                                            errors={errors}
                                            name={`days.${index}.prerequisites`}
                                        />
                                        <SubModuleFieldArray
                                            control={control}
                                            register={register}
                                            errors={errors}
                                            name={`days.${index}.subModules`} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <p className='text-red-500 text-sm py-1'>{errors?.days?.[index]?.message}</p>
                    </div>
                ))}
            </div>
            <div>
                <Button onClick={handleAddDay} type='button' >Add Day <CirclePlus className='h-4 ml-1' /> </Button>
            </div>
            <p className='text-red-500 text-sm py-4'>{errors?.days?.message}</p>
        </div>
    );
}

export default DaysFieldArray