import React from 'react';
import { DialogContent, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';
import { Checkbox } from '../ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { DatePicker } from 'antd';
import { Textarea } from '../ui/textarea';
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Input } from '../ui/input';
import Lottie from 'lottie-react';
import animation from '@/public/animations/JobCVLoader.json';
import { GetTokens } from '@/app/actions';
import { useUserStore } from '@/app/store/UserStore';
import { useResumeStore } from '@/app/store/ResumeStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import dayjs from 'dayjs';

const dateFormat = "YYYY-MM";

function JobMultistepForm({ handleCloseMultistepForm, steps, setSteps, formData, setFormData, jobRole, type, setIsServiceDialogOpen }) {
    const replaceResumeData = useResumeStore((state) => state.replaceResumeData);
    const router = useRouter();
    const { updateUserData, userState } = useUserStore(state => state);
    const { userdata } = userState;

    const handleChangeStep1 = () => {
        if (!formData.fullname.trim() || !formData.email.trim() || !formData.jobTitle.trim() || !formData.country.trim() || !formData.city.trim()) {
            return toast.error("Please fill all details");
        }
        setSteps(prevState => prevState + 1);
    };

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFreshercheck = () => {
        setFormData({ ...formData, isFresher: !formData.isFresher });
    };

    const handleExperienceChange = (e, i) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData, experience: formData.experience.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        [name]: value
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleDeleteExperience = (i) => {
        const updatedFromData = {
            ...formData, experience: formData.experience.filter((item, index) => index !== i)
        };
        setFormData(updatedFromData);
    };

    const handleAddExperience = () => {
        const updatedFromData = {
            ...formData, experience: [...formData.experience, {
                jobTitle: "",
                employer: "",
                startDate: '',
                endDate: '',
                highlights: []
            }]
        };
        setFormData(updatedFromData);
    };

    const handleExperienceStartDateChange = (val, i) => {
        let newDate;
        if (!val) {
            newDate = "";
        } else {
            newDate = dayjs(val).format("YYYY-MM");
        }
        const updatedFormData = {
            ...formData, experience: formData.experience.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        startDate: newDate
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleExperienceEndDateChange = (val, i) => {
        let newDate;
        if (!val) {
            newDate = "";
        } else {
            newDate = dayjs(val).format("YYYY-MM");
        }
        const updatedFormData = {
            ...formData, experience: formData.experience.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        endDate: newDate
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const disabledExperienceEndDate = (current, item) => {
        const startDate = dayjs(item.startDate, dateFormat);
        return current && (current < startDate || (current.year() === startDate.year() && current.month() === startDate.month()));
    };

    const handleExperienceHighlightsChange = (i, val) => {
        let highlights = val.split("\n");
        const updatedFormData = {
            ...formData, experience: formData.experience.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        highlights
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleExperienceCheckChange = (index) => {
        const updatedFormData = {
            ...formData, experience: formData.experience.map((exp, expIndex) => {
                if (expIndex === index) {
                    return { ...exp, present: !exp.present, endDate: !exp.present ? "present" : "" };
                }
                return exp;
            })
        };
        setFormData(updatedFormData);
    };

    const handlePrevStep = () => {
        setSteps(prevState => prevState - 1);
    };

    const handleChangeStep2 = () => {
        if (!formData.isFresher && formData.experience.length === 0) {
            return toast.error("Please add experience");
        }

        if (formData.isFresher) {
            return setSteps(prevState => prevState + 1);
        }

        setSteps(prevState => prevState + 1);
    };

    const handleChangeStep3 = () => {
        setSteps(prevState => prevState + 1);
    };

    const handleAddEducation = () => {
        const updatedFromData = {
            ...formData, education: [...formData.education, {
                institute: '',
                degree: '',
                startDate: '',
                endDate: '',
            }]
        };
        setFormData(updatedFromData);
    };

    const handleEducationChange = (e, i) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData, education: formData.education.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        [name]: value
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleEducationStartDateChange = (val, i) => {
        let newDate;
        if (!val) {
            newDate = "";
        } else {
            newDate = dayjs(val).format("YYYY-MM");
        }

        const updatedFormData = {
            ...formData,
            education: formData.education.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        startDate: newDate
                    };
                }
                return item;
            })
        };

        setFormData(updatedFormData);
    };

    const handleEducationEndDateChange = (val, i) => {
        let newDate;
        if (!val) {
            newDate = "";
        } else {
            newDate = dayjs(val).format("YYYY-MM");
        }
        const updatedFormData = {
            ...formData, education: formData.education.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        endDate: newDate
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const disableEducationEndDate = (current, item) => {
        const startDate = dayjs(item.startDate, dateFormat);
        // Disable dates before the start date and in the same month as the start date
        return current && (current < startDate || (current.year() === startDate.year() && current.month() === startDate.month()));
    };

    const handleEducationCheckChange = (index) => {
        const updatedFormData = {
            ...formData, education: formData.education.map((edu, eduIndex) => {
                if (eduIndex === index) {
                    return { ...edu, present: !edu.present, endDate: !edu.present ? "present" : "" };
                }
                return edu;
            })
        };
        setFormData(updatedFormData);
    };

    const handleDeleteEducation = (i) => {
        const updatedFromData = {
            ...formData, education: formData.education.filter((item, index) => index !== i)
        };
        setFormData(updatedFromData);
    };

    const handleAddProject = () => {
        const updatedFormData = {
            ...formData, projects: [...formData.projects, {
                name: '',
                startDate: '',
                endDate: "",
                highlights: []
            }]
        };
        setFormData(updatedFormData);
    };

    const handleProjectnameChange = (val, i) => {
        let value = val;
        if (!value) return;
        const updatedFormData = {
            ...formData, projects: formData.projects.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        name: value
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleProjectStartDateChange = (val, i) => {
        let newDate;
        if (!val) {
            newDate = "";
        } else {
            newDate = dayjs(val).format("YYYY-MM");
        }
        const updatedFormData = {
            ...formData, projects: formData.projects.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        startDate: newDate
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleProjectEndDateChange = (val, i) => {
        let newDate;
        if (!val) {
            newDate = "";
        } else {
            newDate = dayjs(val).format("YYYY-MM");
        }
        const updatedFormData = {
            ...formData, projects: formData.projects.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        endDate: newDate
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const disableProjectEndDate = (current, item) => {
        const startDate = dayjs(item.startDate, dateFormat);
        // Disable dates before the start date and in the same month as the start date
        return current && (current < startDate || (current.year() === startDate.year() && current.month() === startDate.month()));
    };

    const handleProjectHighlightsChange = (val, i) => {
        let highlights = val.split("\n");
        const updatedFormData = {
            ...formData, projects: formData.projects.map((item, index) => {
                if (index === i) {
                    return {
                        ...item,
                        highlights
                    };
                }
                return item;
            })
        };
        setFormData(updatedFormData);
    };

    const handleProjectCheckChange = (i) => {
        const updatedFormData = {
            ...formData, projects: formData.projects.map((pro, proIndex) => {
                if (proIndex === i) {
                    return { ...pro, present: !pro.present, endDate: !pro.present ? "present" : "" };
                }
                return pro;
            })
        };
        setFormData(updatedFormData);
    };

    const handleDeleteProjects = (i) => {
        const updatedFormData = {
            ...formData, projects: formData.projects.filter((item, index) => index !== i)
        };
        setFormData(updatedFormData);
    };

    const handleChangeStep4 = () => {
        setSteps(prevState => prevState + 1);
    };

    const handleSkillsChange = (e) => {
        let skills = e.target.value;
        skills = skills.split("\n");
        const updatedFromData = { ...formData, skills };
        setFormData(updatedFromData);
    };

    const fetchBetterResume = async (message) => {
        const { accessToken } = await GetTokens();
        try {
            const response = await axios.post('/api/generateResumeOnFeedback', { message, type }, {
                headers: {
                    Authorization: 'Bearer ' + accessToken.value
                }
            });
            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            if (error.response.status === 403) {
                if (error.response.data.error === "Insufficient JobCV tokens" || error.response.data.error === "Insufficient optimizer tokens") {
                    if (userdata.subscription.plan.includes('CVSTUDIO')) {
                        return setIsServiceDialogOpen(true)
                    } else {
                        toast.info("Please subscribe to Genies Pro Suit to use this service", { autoClose: 10000 })
                        return router.push('/pricing?scroll=1')
                    }
                } else {
                    toast.error("You don not have a valid plan.")
                    return router.push('/pricing?scroll=1')
                }
            }
            else {
                toast.error("Unable to generate JobCV , Please try again");
            }
        }
    };

    const handleSubmitForm = async () => {
        setSteps(6);
        const message = JSON.stringify(formData) + `generate resume for this ${jobRole}`;
        try {
            const response = await fetchBetterResume(message);
            if (response?.data && response?.userdata) {
                replaceResumeData(response?.data);
                updateUserData(response?.userdata);
                return router.push("/resume-builder");
            }
        } catch (error) {
            console.log(error);
        } finally {
            handleCloseMultistepForm();
            setSteps(1);
        }
    };

    if (steps === 1) {
        return (
            <DialogContent className='h-full sm:max-w-[70dvw] sm:h-[80dvh] p-0 bg-blue-900' onClick={handleCloseMultistepForm} showCloseButton>
                <div className='flex justify-around'>
                    <div className='w-1/3 h-full hidden sm:block'>
                        <Image priority src='/illustration-manager-choosing-new-worker.png' alt='choice-worker-concept-illustrated' className='absolute bottom-5' width={400} height={500} />
                    </div>

                    <div className='w-full sm:w-2/3 py-5 h-full'>
                        <div className='shadow-xl p-6 sm:p-10 h-full rounded-2xl bg-white'>
                            <div className='my-2'>
                                <h2 className='font-bold text-xl sm:text-2xl text-blue-950 mb-5 text-center'>Design a winning <span className='text-blue-600'>CV</span> in just minutes with <br /> <span className='text-blue-600 text-2xl sm:text-3xl'>&#x201B; Genies Career Hub &#x2019;</span></h2>
                            </div>
                            <div className='my-2'>
                                <Label >Full Name</Label>
                                <Input className='my-1' placeholder='Enter full name' value={formData.fullname} onChange={handleFormDataChange} name='fullname' />
                            </div>
                            <div>
                                <Label >Email</Label>
                                <Input className='my-1' placeholder='Enter email address' value={formData.email} onChange={handleFormDataChange} name='email' />
                            </div>
                            <div>
                                <Label>Job Title</Label>
                                <Input className='my-1' placeholder='Enter Job Title' value={formData.jobtitle} onChange={handleFormDataChange} name='jobTitle' />
                            </div>
                            <div className='flex'>
                                <div className='w-1/2 pr-2'>
                                    <Label>City</Label>
                                    <Input className='my-1' placeholder='Enter city name' value={formData.city} onChange={handleFormDataChange} name='city' />
                                </div>
                                <div className='w-1/2 pl-2'>
                                    <Label>Country</Label>
                                    <Input className='my-1' placeholder='Enter Country name' value={formData.country} onChange={handleFormDataChange} name='country' />
                                </div>
                            </div>
                            <div className='py-5 flex justify-end'>
                                <Button onClick={handleChangeStep1} >Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        );
    }

    if (steps === 2) {
        return (
            <DialogContent className='sm:max-w-[70dvw] no-scrollbar sm:h-[80vh] h-full p-0 bg-blue-900 z' onClick={handleCloseMultistepForm} showCloseButton>
                <div className='flex flex-col-reverse sm:flex-row justify-around overflow-hidden'>
                    <div className='sm:w-1/3 w-full h-64 sm:h-full hidden sm:block'>
                        <Image priority src='/illustration-manager-choosing-new-worker.png' alt='choice-worker-concept-illustrated' objectFit='cover' className='sm:absolute sm:bottom-5' width={400} height={500} />
                    </div>
                    <div className='w-full sm:w-2/3 py-5 h-full overflow-hidden'>
                        <div className=' shadow-xl px-4 sm:px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden  bg-white'>
                            <div className='flex items-center'>
                                <Checkbox checked={formData?.isFresher} onCheckedChange={handleFreshercheck} id='checkbox' />
                                <Label htmlFor='checkbox' className='text-md sm:text-lg ml-4'>Are you a fresher?</Label>
                            </div>

                            {
                                !formData?.isFresher &&
                                <>
                                    <div className='overflow-y-scroll  h-[80%]'>
                                        <div className='my-2'>
                                            <hr />
                                        </div>
                                        <div className='max-h-[85%]'>
                                            <div className='flex justify-between items-center my-4 px-1'>
                                                <p className='text-blue-900'>Add Experience</p>
                                                <button className='flex text-sm px-3 py-2 text-white rounded-md bg-blue-950 cursor-pointer hover:bg-green-500' onClick={handleAddExperience}>
                                                    Add <IoIosAddCircle className='text-xl ml-2' />
                                                </button>
                                            </div>
                                            {
                                                formData.experience.length > 0 && formData.experience.map((item, index) => {
                                                    return (
                                                        <div className='flex justify-between items-center relative my-2' key={index}>
                                                            <Accordion
                                                                type="single"
                                                                collapsible
                                                                className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                                                            >
                                                                <AccordionItem value={`item-${index}`}>
                                                                    <AccordionTrigger>
                                                                        <div className="px-3 flex flex-col items-start">
                                                                            {item?.jobtitle || item?.employer ? (
                                                                                <p>
                                                                                    {item?.jobtitle &&
                                                                                        `${item?.jobtitle}${item?.employer && ` at `} `}
                                                                                    {item?.employer}
                                                                                </p>
                                                                            ) : (
                                                                                <p>(Not Specified)</p>
                                                                            )}
                                                                            <p className="text-gray-500 text-sm">
                                                                                {item?.startDate && `${item.startDate} - `}
                                                                                {item?.endDate}
                                                                            </p>
                                                                        </div>
                                                                    </AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="w-full">
                                                                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                                                                                <div className="space-y-1">
                                                                                    <Label htmlFor="institute">Job Title</Label>
                                                                                    <Input className='my-1'
                                                                                        id="institute"
                                                                                        placeholder="Enter Job title"
                                                                                        value={item.jobtitle}
                                                                                        name="jobtitle"
                                                                                        onChange={(e) => handleExperienceChange(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <Label htmlFor="degree">Employer</Label>
                                                                                    <Input className='my-1'
                                                                                        id="degree"
                                                                                        placeholder="Employer name"
                                                                                        type="text"
                                                                                        value={item.employer}
                                                                                        name="employer"
                                                                                        onChange={(e) => handleExperienceChange(e, index)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                                                                                <div className="flex flex-col w-full md:w-1/2 space-y-1 pr-2">
                                                                                    <Label for="start_date" className="block">
                                                                                        Start Date
                                                                                    </Label>
                                                                                    <DatePicker
                                                                                        picker="month"
                                                                                        onChange={(e) => handleExperienceStartDateChange(e, index)}
                                                                                        maxDate={dayjs()}
                                                                                        className="w-full h-10"
                                                                                    />
                                                                                </div>
                                                                                <div className="flex flex-col w-full md:w-1/2 space-y-1 pl-2">
                                                                                    <Label for="end_date" className="block">
                                                                                        End Date
                                                                                    </Label>
                                                                                    <DatePicker
                                                                                        picker="month"
                                                                                        onChange={(e) => handleExperienceEndDateChange(e, index)}
                                                                                        className="w-full h-10"
                                                                                        disabledDate={(e) => disabledExperienceEndDate(e, item)}
                                                                                        maxDate={dayjs()}
                                                                                        disabled={!item?.startDate}
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <Label htmlFor="city">City</Label>
                                                                                    <Input className='my-1'
                                                                                        id="city"
                                                                                        placeholder="Enter city name"
                                                                                        type="text"
                                                                                        value={item.city}
                                                                                        name="city"
                                                                                        onChange={(e) => handleExperienceChange(e, index)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="space-y-2 px-2">
                                                                                <Label >Highlights</Label>
                                                                                <Textarea
                                                                                    value={item?.highlights?.join("\n") || ""}
                                                                                    className="text-sm h-[150px] no-scrollbar"
                                                                                    onChange={(e) => handleExperienceHighlightsChange(index, e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
                                                            <MdDeleteOutline
                                                                className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl text-red-600'
                                                                onClick={() => handleDeleteExperience(index)}
                                                            />
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                            <DialogFooter >
                                <div className='w-full mt-5 justify-between items-center flex'>
                                    <Button onClick={handlePrevStep}>Back</Button>
                                    <Button onClick={handleChangeStep2} disabled={!formData.isFresher && formData.experience.length === 0}>Next</Button>
                                </div>
                            </DialogFooter>
                        </div>
                    </div>
                </div>
            </DialogContent>
        );
    }

    if (steps === 3) {
        return (
            <DialogContent className='sm:max-w-[70dvw] no-scrollbar h-full sm:h-[80vh] p-0 bg-blue-900' onClick={handleCloseMultistepForm} showCloseButton>
                <div className='flex flex-col-reverse sm:flex-row justify-around overflow-hidden'>
                    <div className='sm:w-1/3 w-full h-64 sm:h-full hidden sm:block'>
                        <Image priority src='/illustration-manager-choosing-new-worker.png' alt='choice-worker-concept-illustrated' objectFit='cover' className='sm:absolute sm:bottom-5' width={400} height={500} />
                    </div>
                    <div className='w-full sm:w-2/3 py-5 h-full overflow-hidden'>
                        <div className='shadow-xl px-4 sm:px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden bg-white'>
                            <div className=' max-h-[85%]  overflow-scroll no-scrollbar'>
                                <div className='flex justify-between items-center my-4 px-1'>
                                    <p className='text-blue-900'>Add Education</p>
                                    <button className='flex text-sm px-3 py-2 text-white rounded-md bg-blue-950 cursor-pointer hover:bg-green-500' onClick={handleAddEducation}>
                                        Add <IoIosAddCircle className='text-xl ml-2' />
                                    </button>
                                </div>
                                <div >
                                    {
                                        formData.education.length > 0 && formData.education.map((item, index) => {
                                            return (
                                                <div className='flex justify-between items-center relative my-2' key={index}>
                                                    <Accordion
                                                        type="single"
                                                        collapsible
                                                        className="w-[90%] sm:w-[95%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                                                    >
                                                        <AccordionItem value={`item-${index}`}>
                                                            <AccordionTrigger>
                                                                <div className="px-3 flex flex-col items-start">
                                                                    {item?.degree || item?.institute ? (
                                                                        <p>
                                                                            {item?.degree &&
                                                                                `${item?.degree}${item?.institute && ` at `} `}
                                                                            {item?.institute}
                                                                        </p>
                                                                    ) : (
                                                                        <p>(Not Specified)</p>
                                                                    )}
                                                                    <p className="text-gray-500 text-sm">
                                                                        {item?.startDate && `${item.startDate} - `}
                                                                        {item?.endDate}
                                                                    </p>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="w-full pt-0 sm:pt-5 px-1 sm:px-5 pb-0 sm:pb-10">
                                                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="institute">Degree</Label>
                                                                            <Input className='my-1'
                                                                                id="institute"
                                                                                placeholder="Enter Degree"
                                                                                value={item.degree}
                                                                                name="degree"
                                                                                onChange={(e) =>
                                                                                    handleEducationChange(e, index)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="degree">Institute</Label>
                                                                            <Input className='my-1'
                                                                                id="degree"
                                                                                placeholder="Institute name"
                                                                                type="text"
                                                                                value={item.institute}
                                                                                name="institute"
                                                                                onChange={(e) =>
                                                                                    handleEducationChange(e, index)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex sm:flex-row flex-col px-2">
                                                                        <div className="flex flex-col w-full md:w-1/2 space-y-1 pr-2 lg:py-0 py-5">
                                                                            <Label for="start_date" className="block">
                                                                                Start Date
                                                                            </Label>
                                                                            <div className="w-full">
                                                                                <DatePicker
                                                                                    picker="month"
                                                                                    onChange={(e) =>
                                                                                        handleEducationStartDateChange(
                                                                                            e,
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                    className="w-full h-10"
                                                                                    maxDate={dayjs()}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-col w-full md:w-1/2 space-y-1 justify-around lg:pl-2 pl-0">
                                                                            <Label for="end_date" className="block">
                                                                                End Date
                                                                            </Label>
                                                                            <div className="w-full">
                                                                                {
                                                                                    item?.present ?
                                                                                        <div className='h-10 rounded-md flex items-center pl-2'>
                                                                                            <p className='text-xl text-gray-500'>Present</p>
                                                                                        </div> :
                                                                                        <DatePicker
                                                                                            picker="month"
                                                                                            onChange={(e) =>
                                                                                                handleEducationEndDateChange(e, index)
                                                                                            }
                                                                                            className="w-full h-10"
                                                                                            disabledDate={(e) => disableEducationEndDate(e, item)}
                                                                                            maxDate={dayjs()}
                                                                                            disabled={!item?.startDate}
                                                                                        />
                                                                                }
                                                                            </div>
                                                                            <div className='flex items-center'>
                                                                                <Checkbox className='mr-2 font-thin'
                                                                                    checked={item?.present}
                                                                                    onCheckedChange={() => handleEducationCheckChange(index)} /><p className='font-mono italic text-gray-500'>present</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                    <MdDeleteOutline className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl text-red-600' onClick={() => handleDeleteEducation(index)} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-full mt-5 justify-between items-center flex'>
                                <Button onClick={handlePrevStep}>Back</Button>
                                <Button onClick={handleChangeStep3} disabled={formData.education.length === 0}>Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        );
    }

    if (steps === 4) {
        return (
            <DialogContent className='sm:max-w-[70dvw] no-scrollbar h-full sm:h-[80vh] p-0 bg-blue-900' onClick={handleCloseMultistepForm} showCloseButton>
                <div className='flex flex-col-reverse sm:flex-row justify-around overflow-hidden'>
                    <div className='sm:w-1/3 w-full h-64 sm:h-full hidden sm:block'>
                        <Image priority src='/illustration-manager-choosing-new-worker.png' alt='choice-worker-concept-illustrated' objectFit='cover' className='sm:absolute sm:bottom-5' width={400} height={500} />
                    </div>
                    <div className='w-full sm:w-2/3 py-5 h-full overflow-hidden'>
                        <div className='shadow-xl px-4 sm:px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden bg-white'>
                            <div className='max-h-[85%]  overflow-scroll no-scrollbar'>
                                <div className='flex justify-between items-center my-4 px-1'>
                                    <p className='text-blue-900'>Add Projects</p>
                                    <button className='flex text-sm px-3 py-2 text-white rounded-md bg-blue-950 cursor-pointer hover:bg-green-500' onClick={handleAddProject}>
                                        Add <IoIosAddCircle className='text-xl ml-2' />
                                    </button>
                                </div>
                                <div className=' max-h-[85%] overflow-scroll no-scrollbar' >
                                    {
                                        formData.projects.length > 0 && formData.projects.map((item, index) => {
                                            return (
                                                <div className='flex justify-between items-center relative my-2' key={index}>
                                                    <Accordion
                                                        type="single"
                                                        collapsible
                                                        className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                                                    >
                                                        <AccordionItem value={`item-${index}`}>
                                                            <AccordionTrigger>
                                                                <div className="px-3 flex flex-col items-start">
                                                                    {item?.name ? (
                                                                        <p>{item?.name}</p>
                                                                    ) : (
                                                                        <p>(Not Specified)</p>
                                                                    )}
                                                                    <p className="text-gray-500 text-sm">
                                                                        {item?.startDate && `${item.startDate} - `}
                                                                        {item?.endDate}
                                                                    </p>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="w-full sm:pt-5 sm:px-5 sm:pb-10">
                                                                    <div className="my-3 px-2">
                                                                        <Label htmlFor="institute">Project name</Label>
                                                                        <Input
                                                                            className='my-1'
                                                                            id="institute"
                                                                            placeholder="Enter Project Name"
                                                                            value={item.name}
                                                                            name="name"
                                                                            onChange={(e) => handleProjectnameChange(e.target.value, index)}
                                                                        />
                                                                    </div>
                                                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                                                                        <div className="flex flex-col w-full space-y-2 pr-2 lg:py-0 py-5">
                                                                            <Label for="start_date" className="block">
                                                                                Start Date
                                                                            </Label>
                                                                            <div className="w-full">
                                                                                <DatePicker
                                                                                    picker="month"
                                                                                    onChange={(e) => handleProjectStartDateChange(e, index)}
                                                                                    className="w-full h-10"
                                                                                    maxDate={dayjs()}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-col w-full space-y-2 justify-around lg:pl-2 pl-0">
                                                                            <Label for="end_date" className="block">
                                                                                End Date
                                                                            </Label>
                                                                            <div className="w-full">
                                                                                {item?.present ? (
                                                                                    <div className='h-10 rounded-md flex items-center pl-2'>
                                                                                        <p className='text-xl text-gray-600'>Present</p>
                                                                                    </div>
                                                                                ) : (
                                                                                    <DatePicker
                                                                                        picker="month"
                                                                                        onChange={(e) => handleProjectEndDateChange(e, index)}
                                                                                        disabled={!item?.startDate}
                                                                                        className="w-full h-10"
                                                                                        maxDate={dayjs()}
                                                                                        disabledDate={(e) => disableProjectEndDate(e, item)}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            <div className='flex items-center'>
                                                                                <Checkbox
                                                                                    className='mr-2 font-thin'
                                                                                    checked={item?.present}
                                                                                    onCheckedChange={() => handleProjectCheckChange(index)}
                                                                                />
                                                                                <p className='font-mono italic'>present</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='m-2'>
                                                                        <Label className='mb-1'>Description</Label>
                                                                        <Textarea
                                                                            value={item.highlights.join("\n")}
                                                                            onChange={(e) => handleProjectHighlightsChange(e.target.value, index)}
                                                                            className='mt-1'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                    <MdDeleteOutline
                                                        className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl text-red-600'
                                                        onClick={() => handleDeleteProjects(index)}
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className='w-full mt-5 justify-between items-center flex'>
                                <Button onClick={handlePrevStep}>Back</Button>
                                <Button onClick={handleChangeStep4} disabled={formData.projects.length === 0}>Next</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        );
    }

    if (steps === 5) {
        return (
            <DialogContent className='sm:max-w-[70dvw] no-scrollbar p-0 h-full sm:h-[80vh] bg-blue-900' onClick={handleCloseMultistepForm} showCloseButton>
                <div className='flex flex-col-reverse sm:flex-row justify-around overflow-hidden'>
                    <div className='sm:w-1/3 w-full h-64 sm:h-full hidden sm:block'>
                        <Image priority src='/illustration-manager-choosing-new-worker.png' alt='choice-worker-concept-illustrated' objectFit='cover' className='sm:absolute sm:bottom-5' width={400} height={500} />
                    </div>
                    <div className='w-full sm:w-2/3 py-5 h-full overflow-hidden'>
                        <div className='shadow-xl px-4 sm:px-10 py-5 w-full h-full max-h-full rounded-2xl overflow-hidden bg-white'>
                            <Label >Skills</Label>
                            <Textarea placeholder='Enter your skills' value={formData.skills.join("\n")} onChange={handleSkillsChange} className='mt-2 h-1/2' />
                            <div className='w-full justify-between items-center py-10 flex'>
                                <Button onClick={handlePrevStep}>Back</Button>
                                <Button onClick={handleSubmitForm} disabled={formData.skills.length === 0}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        );
    }

    if (steps === 6) {
        return (
            <DialogContent className='sm:max-w-[70dvw] no-scrollbar h-[80vh]' onClick={handleCloseMultistepForm} showCloseButton>
                <div className='flex flex-col-reverse sm:flex-row justify-around'>
                    <div className='sm:w-1/3 w-full h-64 sm:h-full hidden sm:block'>
                        <Image priority src='/illustration-manager-choosing-new-worker.png' alt='choice-worker-concept-illustrated' objectFit='cover' className='sm:absolute sm:bottom-5' width={400} height={500} />
                    </div>
                    <div className='w-1/2 h-full flex item-center'>
                        <div className='mx-auto flex items-center justify-center flex-col'>
                            <Lottie animationData={animation} className='w-[300px] h-[300px] mx-auto' />
                            <p className='mt-1'>Preparing your CV</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        );
    }
}

export default JobMultistepForm;
