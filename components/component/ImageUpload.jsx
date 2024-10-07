import { uploadImage } from '@/app/api/api';
import React, { useRef, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { FaCamera, FaUndo } from 'react-icons/fa';
import { useResumeStore } from '@/app/store/ResumeStore';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im';

function ImageUpload() {
    const resumeData = useResumeStore((state) => state.resume.data);
    const setResumeData = useResumeStore((state) => state.setResumeData);
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';
    const [avatarURL, setAvatarURL] = useState(resumeData?.basics?.picture?.url || defaultImage);
    const [isUploading, setIsUploading] = useState(false);

    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    };

    const uploadImageDisplay = async () => {
        try {
            if (!fileUploadRef.current.files[0]) {
                throw new Error('No file selected');
            }
            let uploadedFile = fileUploadRef.current.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(uploadedFile);

            reader.onload = async () => {
                setIsUploading(true);
                const formData = new FormData();
                formData.append("file", uploadedFile);
                const response = await axios.post('/api/uploadImage', formData);
                if (response.status === 200) {
                    const url = response.data.url;
                    setAvatarURL(url);
                    setResumeData('basics.picture.url', url);
                    setIsUploading(false);
                }
            };
            reader.onerror = () => {
                console.error("Error reading file");
                setAvatarURL(defaultImage);
                setIsUploading(false);
            };
        } catch (error) {
            console.error(error);
            setAvatarURL(defaultImage);
            setIsUploading(false);
        } finally {
            if (fileUploadRef.current) {
                fileUploadRef.current.value = '';
            }
        }
    };

    const resetImage = () => {
        setAvatarURL(defaultImage);
        setResumeData('basics.picture.url', defaultImage);
        if (fileUploadRef.current) {
            fileUploadRef.current.value = '';
        }
    };

    return (
        <div className="relative h-[100px] w-[100px]">
            {isUploading ?
                <div className='h-full w-full rounded-full bg-black/20  flex justify-center items-center'>
                    <ImSpinner8 className='text-2xl text-white animate-spin' />
                </div>
                :
                <>
                    <img
                        src={avatarURL}
                        alt="Avatar"
                        className="h-full w-full rounded-full object-cover" />
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

                    {avatarURL !== defaultImage && (
                        <button
                            type='button'
                            onClick={resetImage}
                            className='absolute  r-0 top-[68px] p-1 bg-red-600 text-white rounded-full'>
                            <FaUndo className='text-sm' />
                        </button>
                    )}
                </>
            }



        </div>
    );
}

export default ImageUpload;
