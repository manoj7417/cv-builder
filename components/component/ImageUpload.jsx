import { uploadImage } from '@/app/api/api';
import React, { useRef, useState } from 'react'
import { TbEdit } from "react-icons/tb";
import { Skeleton } from '../ui/skeleton';
import { FaCamera } from 'react-icons/fa';
import { useResumeStore } from '@/app/store/ResumeStore';

function ImageUpload() {
    const resumeData = useResumeStore((state) => state.resume.data)
    const setResumeData = useResumeStore((state) => state.setResumeData)
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
    const [avatarURL, setAvatarURL] = useState(resumeData?.basics?.picture?.url || defaultImage);
    const [isUploading, setIsUploading] = useState(false)

    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const uploadImageDisplay = async () => {
        setIsUploading(true);
        try {
            if (!fileUploadRef.current.files[0]) {
                throw new Error('No file selected');
            }
            let uploadedFile = fileUploadRef.current.files[0];
            let reader = new FileReader();

            // Read the file as a data URL
            reader.readAsDataURL(uploadedFile);

            reader.onload = async () => {
                // File read successfully
                const formData = new FormData();
                formData.append("file", uploadedFile);
                formData.append("upload_preset", 'careerg')
                const response = await uploadImage(formData);
                if (response.status === 200) {
                    const url = response.data.secure_url
                    setAvatarURL(url);
                    setResumeData('basics.picture.url', url)
                }
            };

            reader.onerror = () => {
                console.error("Error reading file");
                setAvatarURL(defaultImage);
            };
        } catch (error) {
            console.error(error);
            setAvatarURL(defaultImage);
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="relative h-[100px] w-[100px]">
            {isUploading ?
                <Skeleton className="h-full w-full rounded-full" />
                : <img
                    src={avatarURL}
                    alt="Avatar"
                    className="h-full w-full rounded-full" />}

            <form id="form" encType='multipart/form-data'>
                <button
                    type='submit'
                    onClick={handleImageUpload}
                    className='absolute top-0 r-0 w-[100px] h-[100px] flex items-baseline justify-end rounded-full'>
                    <FaCamera className='bg-blue-900 text-white text-2xl border border-black/40 p-1 rounded-full absolute top-16' />
                </button>
                <input
                    type="file"
                    id="file"
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    accept="image/png, image/gif, image/jpeg"
                    hidden />
            </form>
        </div>
    )
}

export default ImageUpload