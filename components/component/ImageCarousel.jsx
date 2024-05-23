import React from 'react'
import { CarouselItem } from '../ui/carousel'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { IoIosStar } from 'react-icons/io'
import { templateType } from './Slider'

function ImageCarousel({ data, userState }) {
    return (
        <CarouselItem>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-4 pt-14" >
                {
                    data.map((image, index) => {
                        return <div className="group relative overflow-hidden rounded-lg shadow-lg p-4 bg-gradient-to-t from-[#8181b9] to-[#dcecff]" key={index}>
                            {
                                image.type === templateType.premium &&
                                <div className="card_box">
                                    <span></span>
                                </div>
                            }
                            <Image
                                alt={image.alt}
                                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                                src={image.src}
                                height={900}
                                width={600}
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {
                                    image.type === templateType.premium && !userState?.premiumTemplates?.includes(image.name) ?
                                        < Dialog >
                                            <DialogTrigger className="bg-[#0EA5E9] text-white px-8 h-10 rounded-md">
                                                Try Now
                                            </DialogTrigger>
                                            <DialogContent className="bg-gradient-to-r from-[white] to-[#dcecff]">
                                                <DialogHeader>
                                                    <DialogTitle className="mt-1">
                                                        Download our premium CV now and enhance your job
                                                        search!
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        <section className="overflow-hidden">
                                                            <div className="mx-auto max-w-5xl py-10">
                                                                <div className="mx-auto flex flex-wrap items-center lg:w-full">
                                                                    <Image
                                                                        alt={image.alt}
                                                                        className="w-full rounded object-cover lg:w-1/2"
                                                                        src={image.src}
                                                                        width={500}
                                                                        height={500}
                                                                    />
                                                                    <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-5">
                                                                        <h2 className="text-base font-semibold tracking-widest text-blue-950">
                                                                            Premium
                                                                        </h2>
                                                                        <h1 className="my-1 text-2xl font-bold text-blue-950">
                                                                            Professional Templates
                                                                        </h1>
                                                                        <div className="my-2 flex items-center">
                                                                            <span className="flex items-center space-x-1">
                                                                                {[...Array(5)].map((_, i) => (
                                                                                    <IoIosStar
                                                                                        key={i}
                                                                                        size={16}
                                                                                        className="text-yellow-500"
                                                                                    />
                                                                                ))}
                                                                                <span className="ml-5 inline-block text-xs font-semibold">
                                                                                    4 Reviews
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <p className="leading-relaxed text-gray-800">
                                                                            Exceptional quality and design, crafted to meet your professional needs. Elevate your projects with our expertly curated templates.
                                                                        </p>
                                                                        <div className="mb-5 flex items-center border-b-2 border-gray-600 pb-5"></div>
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="title-font text-xl font-bold text-gray-900">
                                                                                $50
                                                                            </span>
                                                                            <button
                                                                                type="button"
                                                                                className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                                            >
                                                                                Download
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                        :
                                        <a
                                            className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                                            href="/builder"
                                        >
                                            Try Now
                                        </a>
                                }
                            </div>

                        </div>
                    })
                }
            </div>
        </CarouselItem>
    )
}

export default ImageCarousel