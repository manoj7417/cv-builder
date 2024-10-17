import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CirclePlus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form';

function SubModuleFieldArray({ control, register, errors, name }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    const subModules = useWatch({
        control,
        name,
    });

    const [openSubModuleAccordion, setOpenSubModuleAccordion] = useState(fields.length > 0 ? 'item-0' : null);

    const handleAddSubModule = () => {
        const newIndex = fields.length;
        append({
            title: '',
            description: '',
            timeToComplete: 0
        });
        setOpenSubModuleAccordion(`item-${newIndex}`);
    };
    const handleRemoveSubmodule = (index) => {
        remove(index);
    };

    const handleAccordionToggle = (value) => {
        if (openSubModuleAccordion === value) {
            setOpenSubModuleAccordion(null);
        } else {
            setOpenSubModuleAccordion(value);
        }
    };

    const getError = (name, index, field) => {
        const path = `${name}.${index}.${field}`;
        const errorPath = path.split('.');
        let errorObject = errors;
        for (const key of errorPath) {
            if (!errorObject) break;
            errorObject = errorObject[key];
        }
        return errorObject?.message;
    };

    const getSubModuleError = () => {
        const pathParts = name.split('.');

        let errorObject = errors;
        for (const key of pathParts) {
            if (errorObject && errorObject[key]) {
                errorObject = errorObject[key];
            } else {
                return undefined;
            }
        }

        return errorObject?.message;
    };


    return (
        <div className='py-6'>
            <p className='text-lg font-medium text-blue-950'>Submodules</p>
            <div className='py-4'>
                {fields.length > 0 && fields.map((submodule, index) => (
                    <Accordion type="single" collapsible className='border my-4 rounded-lg border-gray-200' key={index} value={openSubModuleAccordion}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className='w-full px-2 text-blue-800 py-4' onClick={() => handleAccordionToggle(`item-${index}`)}>
                                <div className='w-full flex items-center justify-between px-2'>
                                    <p>
                                        {subModules?.[index]?.type ? subModules[index].type : "(Not specified)"}
                                    </p>
                                    <Button className='hover:bg-gray-100 p-2 rounded-md bg-white'
                                        type='button' onClick={() => handleRemoveSubmodule(index)}><Trash2 className='h-4 text-red-500' /></Button>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='py-2 px-8'>
                                    <div className='py-3'>
                                        <Label>Title<span className='text-red-500 ml-1'>*</span></Label>
                                        <Input
                                            placeholder='Enter title'
                                            className='my-2'
                                            {...register(`${name}.${index}.title`)}
                                        />
                                        <p className='text-red-500 text-sm ml-2'>{getError(name, index, 'title')}</p>
                                    </div>
                                    <div className='py-3'>
                                        <Label>Description<span className='text-red-500 ml-1'>*</span></Label>
                                        <Textarea
                                            placeholder='Enter description'
                                            className='my-2'
                                            {...register(`${name}.${index}.description`)}
                                        />
                                        <p className='text-red-500 text-sm ml-2'>{getError(name, index, 'description')}</p>
                                    </div>
                                    <div className='py-3'>
                                        <Label className='font-medium'>Time to complete (minutes)<span className='text-red-500 ml-1'>*</span></Label>
                                        <Input
                                            placeholder='Enter time to complete in minutes'
                                            type='number'
                                            min={'0'}
                                            className='my-2'
                                            {...register(`${name}.${index}.timeToComplete`)}
                                        />
                                        <p className='text-red-500 text-sm ml-2'>{getError(name, index, 'timeToComplete')}</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
            <div className='py-4'>
                <Button type='button' onClick={handleAddSubModule}>Add new submodule<CirclePlus className='h-4 ml-1' /></Button>
            </div>
            <p className='text-red-500 text-sm ml-2'>{getSubModuleError() && `${getSubModuleError()}`}</p>
        </div>
    )
}

export default SubModuleFieldArray;