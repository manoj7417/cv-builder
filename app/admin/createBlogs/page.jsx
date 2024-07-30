'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useRef, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import dynamic from 'next/dynamic';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MdDeleteOutline } from 'react-icons/md';
import { ImSpinner3 } from "react-icons/im";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function CreateBlogs() {
    const [blog, setBlog] = useState({
        slug: '',
        meta: {
            title: " ",
            description: ""
        },
        title: '',
        mainImage: '',
        author: '',
        description: '',
        sections: [{ title: '', description: '', images: [''] }]
    });
    const editor = useRef(null);
    const sectionEditor = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        });
    };

    const handleMetaChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            meta: {
                ...blog.meta,
                [name]: value
            }
        });
    }

    const handleSectionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = blog.sections.map((section, i) =>
            i === index ? { ...section, [name]: value } : section
        );
        setBlog({
            ...blog,
            sections: updatedSections
        });
    };

    const handleAddSection = () => {
        setBlog({
            ...blog,
            sections: [...blog.sections, { title: '', description: '', images: [''] }]
        });
    };

    const handleEditorStateChange = (e) => {
        console.log(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post('/api/blogs/create', blog);
            console.log(response.data);
            // Handle success (e.g., clear form, show success message)
        } catch (error) {
            console.error('Error creating blog:', error);
            // Handle error (e.g., show error message)
        }
    };


    const handleDeleteSection = (i) => {
        const updatedSections = blog.sections.filter((_, j) => j !== i);
        setBlog({ ...blog, sections: updatedSections });
    }

    const handleSectionDescriptionChange = (e, i) => {
        const updatedSections = blog.sections.map((section, j) =>
            j === i ? { ...section, description: e } : section
        );
        setBlog({ ...blog, sections: updatedSections });
    }

    return (
        <div className='mt-24 mb-10  w-[80%] h-auto p-5 mx-auto rounded-xl shadow-xl '>
            <h1 className='text-center text-2xl text-blue-900 font-bold'>Create New Blog Post</h1>
            <form onSubmit={handleSubmit} className='p-4'>
                <div>
                    <Label>Slug <span className='text-red-500'>*</span></Label>
                    <Input
                        type='text'
                        name='slug'
                        value={blog.slug}
                        onChange={handleChange}
                        required
                        className=' p-2 w-full mt-1'
                    ></Input>
                </div>
                <div>
                    <Label>Meta Title<span className='text-red-500'>*</span></Label>
                    <Input
                        type='text'
                        name='title'
                        value={blog.meta.title}
                        onChange={handleMetaChange}
                        required
                        className='border p-2 w-full mt-1'
                    />
                </div>
                <div>
                    <Label>Meta Description<span className='text-red-500'>*</span></Label>
                    <Textarea
                        type='text'
                        name='description'
                        value={blog.meta.description}
                        onChange={handleMetaChange}
                        required
                        className='border p-2 w-full mt-1'
                    />
                </div>

                <div className='my-2'>
                    <Label>Title<span className='text-red-500'>*</span></Label>
                    <Input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        required
                        className='border p-2 w-full mt-1'
                    />
                </div>
                <div className='my-2'>
                    <Label>Main Image URL<span className='text-red-500'>*</span></Label>
                    <Input
                        type="text"
                        name="mainImage"
                        value={blog.mainImage}
                        onChange={handleChange}
                        required
                        className='border p-2 w-full mt-1'
                    />
                </div>
                <div className='my-2'>
                    <Label>Author <span className='text-xs ml-1'>(optional)</span></Label>
                    <Input
                        type="text"
                        name="author"
                        value={blog.author}
                        onChange={handleChange}
                        required
                        className='border p-2 w-full mt-1'
                    />
                </div>
                <div className='my-2'>
                    <Label>Description<span className='text-red-500'>*</span></Label>
                    <JoditEditor
                        ref={editor}
                        name="description"
                        value={blog?.description}
                        onChange={handleEditorStateChange}
                        required={true}
                        className='border p-2 w-full mt-1'
                    />
                </div>

                <div className='my-2 mt-10'>
                    <div className='w-full flex items-center justify-between'>
                        <h2 className='text-2xl font-bold text-blue-900'>Sections</h2>
                        <Button
                            type="button"
                            onClick={handleAddSection}
                        >
                            <FaPlus className='mr-1' /> Add Section
                        </Button>
                    </div>
                    {blog.sections.map((section, index) => (
                        <div key={index} className='p-2 mt-4 group relative'>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-4 bg-white"
                                defaultValue={`item-${index}`}
                                defaultChecked
                            >
                                <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <div className=" px-3 flex flex-col items-start">
                                            <h3 className='text-xl font-bold'>{section?.title || '( not described )'}</h3>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>

                                        <div className='p-2 '>
                                            <Label>Section Title</Label>
                                            <Input
                                                type="text"
                                                name="title"
                                                value={section.title}
                                                onChange={(e) => handleSectionChange(index, e)}
                                                required
                                                className='border p-2 w-full mt-1'
                                            />
                                        </div>
                                        <div className='p-2'>
                                            <Label>Section Description</Label>
                                            <JoditEditor
                                                ref={sectionEditor}
                                                name="description"
                                                value={section?.description}
                                                onChange={(e) => handleSectionDescriptionChange(e, index)}
                                                required
                                                className='border p-2 w-full mt-1'
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                            </  Accordion>
                            <MdDeleteOutline
                                className="-right-5 top-8 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out absolute"
                                onClick={() => handleDeleteSection(index)}
                            />
                        </div>
                    ))}


                </div>
                <div className='flex justify-center items-center'>
                    <Button
                        type="submit"
                        className='bg-green-500 text-white text-xl p-6 mt-4 hover:bg-green-700 flex items-center'
                    >
                        {isLoading ?
                            <>
                                Creating Blog <ImSpinner3 className='h-4 w-4 animate-spin ml-1' />
                            </>
                            :
                            <>
                                Create Blog
                            </>
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateBlogs;