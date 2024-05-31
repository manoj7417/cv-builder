import React from 'react'
import { CarouselItem } from '../ui/carousel'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { IoIosStar } from 'react-icons/io'
import { templateType } from './Slider'

function ImageCarousel({ data }) {
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

                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"><a
                                className="inline-flex h-10 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#0284C7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50"
                                href="/builder"
                            >
                                Try Now
                            </a>
                            </div>

                        </div>
                    })
                }
            </div>
        </CarouselItem>
    )
}

export default ImageCarousel