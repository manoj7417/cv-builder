"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { GoGrabber } from "react-icons/go";
import { FaCrown } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DatePicker } from "antd";
import CustomLabelInput from "@/components/ui/customLabelInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { AccordianColor, colors } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { SkillsSelect } from "@/components/component/skills-select";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { AskBot, getBetterResume } from "@/app/api/api";
import ImageUpload from "@/components/component/ImageUpload";
import pdfToText from "react-pdftotext";
import NewResumeLoader from "@/app/ui/newResumeLoader";
import { MultiStepForm } from "@/components/component/MultiStepForm";
import { useResumeStore } from "@/app/store/ResumeStore";
import { useUserStore } from "@/app/store/UserStore";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { BsStars } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { Editor } from "primereact/editor";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";
import LanguageSelect from "@/components/component/LanguageSelect";

const ImageTemplates = [
  "Template1",
  "Template3",
  "Template10",
  "Template11",
  "Template13",
  "Template14",
  "Template15",
  "Template17",
  "Template18",
  "Template19",
  "Template20",
  "Template21",
  "Template23",
  "Template24",
  "Template25",
  "Template26",
];

const dateFormat = "YYYY-MM";

export default function ResumeForm() {
  const data = useResumeStore((state) => state.resume.data);
  const resumeData = useResumeStore((state) => state.resume);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const updateBasicAndSectionsData = useResumeStore(
    (state) => state.updateBasicAndSectionsData
  );
  const updateResume = useUserStore((state) => state.updateResume);
  const { sections } = data;
  const [generatingResume, setIsGeneratingResume] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: {
      startDate: "",
      endDate: "",
      companyName: "",
      location: "",
      description: "",
      jobTitle: "",
    },
    skills: "",
  });
  const hobbiesRef = useRef("");
  const [steps, setSteps] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChangeProfileSummaryChange = (e) => {
    setResumeData("sections.summary.content", e.htmlValue);
  };

  const handleEducationChange = (e, i) => {
    const { name, value } = e.target;
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleEducationStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleEducationEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const disabledEducationEndDate = (current, item) => {
    const startDate = dayjs(item.startDate, dateFormat);
    return (
      current &&
      (current < startDate ||
        (current.year() === startDate.year() &&
          current.month() === startDate.month()))
    );
  };

  const handleEducationDescriptionChange = (val, i) => {
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleEducationCheckChange = (e, i) => {
    const updatedEducationItems = data.sections.education.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: e ? "present" : "",
          };
        }
        return item;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleExperienceChange = (e, i) => {
    const { name, value } = e.target;
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceDescriptionChange = (val, i) => {
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handledisableExperienceDate = (current, item) => {
    const startDate = dayjs(item.startDate, dateFormat);
    return (
      current &&
      (current < startDate ||
        (current.year() === startDate.year() &&
          current.month() === startDate.month()))
    );
  };

  const handleExperienceCheckChange = (e, i) => {
    const updatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: e ? "present" : "",
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", updatedExperienceItems);
  };

  const handleAddNewEducation = () => {
    const newEducationItems = [
      ...data.sections.education.items,
      {
        institution: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ];
    setResumeData("sections.education.items", newEducationItems);
  };

  const handleAddNewExperience = () => {
    const udpatedExperienceItems = [
      ...data.sections.experience.items,
      {
        jobtitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        description: "",
        city: "",
      },
    ];
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleExperienceHighlightsChange = (i, e) => {
    let val = e.target.value;
    const highlightsArray = val.split("\n");
    const udpatedExperienceItems = data.sections.experience.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            highlights: highlightsArray,
          };
        }
        return item;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleDeleteExperienceSection = (i) => {
    const udpatedExperienceItems = data.sections.experience.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.experience.items", udpatedExperienceItems);
  };

  const handleDeleteEducationSection = (i) => {
    const updatedEducationItems = data.sections.education.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.education.items", updatedEducationItems);
  };

  const handleProjectChange = (e, i) => {
    const { name, value } = e.target;
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleProjectDescriptionChange = (val, i) => {
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleDeleteProjectSection = (i) => {
    const updatedProjectItems = data.sections.projects.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleAddNewProject = () => {
    const updatedProjectItems = [
      ...data.sections.projects.items,
      {
        title: "",
        subtitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleProjectStartDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            startDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleProjectEndDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: newDate,
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleDisableProjectEndDate = (current, item) => {
    const startDate = dayjs(item.startDate, dateFormat);
    return (
      current &&
      (current < startDate ||
        (current.year() === startDate.year() &&
          current.month() === startDate.month()))
    );
  };

  const handleProjectCheckChange = (e, i) => {
    const updatedProjectItems = data.sections.projects.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            endDate: e ? "present" : "",
          };
        }
        return item;
      }
    );
    setResumeData("sections.projects.items", updatedProjectItems);
  };

  const handleTemplateThemeChange = (color) => {
    if (color) {
      setResumeData("metadata.theme.primary", color);
    }
  };

  const handleSkillsLabelChange = (e) => {
    setResumeData("sections.skills.name", e.target.value);
  };

  const handleAddNewSkills = () => {
    const updatedSkills = [
      ...data.sections.skills.items,
      {
        name: "",
        level: "",
      },
    ];
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleSkillNameChange = (val, i) => {
    const updatedSkills = data.sections.skills.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          name: val,
        };
      }
      return item;
    });
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleDeleteSkills = (i) => {
    const updatedSkills = data.sections.skills.items.filter((el, index) => {
      return index !== i;
    });
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleSkillLevelChange = (val, i) => {
    const updatedSkills = data.sections.skills.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          level: val,
        };
      }
      return item;
    });
    setResumeData("sections.skills.items", updatedSkills);
  };

  const handleGenerateProfileSummary = async () => {
    const data = JSON.stringify(formData);
    const message =
      data + " Generated profile summary using the data appended data";
    setIsLoading(true);
    try {
      const response = await AskBot(message);
      const data = JSON.parse(response[0]?.text?.value.split("\n")[2]);

      if (data) {
        setResumeData("sections.summary.content", data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setFormData({
        jobTitle: "",
        experience: {
          startDate: "",
          endDate: "",
          companyName: "",
          location: "",
          description: "",
          jobTitle: "",
        },
        skills: "",
      });
      setSteps(1);
      handleCloseAIDialog();
    }
  };

  const handleOpenAIDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAIDialog = () => {
    setIsDialogOpen(false);
  };

  const handlehobbieslevelChange = (e) => {
    setResumeData("sections.hobbies.name", e.target.value);
  };

  const handleChangeHobbies = (e) => {
    hobbiesRef.current.value = e.target.value;
  };

  const handleAddNewHobbies = () => {
    const newHobbie = hobbiesRef.current.value.trim();
    if (!newHobbie) {
      return;
    }
    const updatedHobbies = [...data.sections.hobbies.items, newHobbie];
    setResumeData("sections.hobbies.items", updatedHobbies);
    hobbiesRef.current.value = "";
  };

  const handleDeleteHobbies = (i) => {
    const updatedHobbies = data.sections.hobbies.items.filter((el, index) => {
      return index !== i;
    });
    setResumeData("sections.hobbies.items", updatedHobbies);
  };

  const handleAwardNameChange = (val, i) => {
    const updatedAwards = data.sections.awards.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          name: val,
        };
      }
      return item;
    });
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handleDeleteAward = (i) => {
    const updatedAwards = data.sections.awards.items.filter((el, index) => {
      return index !== i;
    });
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handleAddNewAwards = () => {
    const updatedAwards = [
      ...data.sections.awards.items,
      {
        name: "",
        url: "",
        data: "",
        issuer: "",
        description: "",
      },
    ];
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handlelanguageLabelChange = (e) => {
    const updatedResumeData = {
      ...data,
      sections: {
        ...data.sections,
        language: { ...data.sections.language, name: e.target.value },
      },
    };
    setResumeData(updatedResumeData);
  };

  const handlelanguageLevelChange = (val, i) => {
    const updatedLanguages = data.sections.language.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          level: val,
        };
      }
      return item;
    });
    setResumeData("sections.language.items", updatedLanguages);
  };

  const handlelanguageNameChange = (val, i) => {
    const updatedLanguages = data.sections.language.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          name: val,
        };
      }
      return item;
    });
    setResumeData("sections.language.items", updatedLanguages);
  };

  const handleDeletelanguage = (i) => {
    const updatedLanguages = data.sections.language.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.language.items", updatedLanguages);
  };

  const handleawardslevelChange = (e) => {
    setResumeData("sections.awards.name", e.target.value);
  };

  const handleAddNewLanguage = () => {
    const updatedLanguages = [
      ...data.sections.language.items,
      {
        name: "",
        level: "",
      },
    ];
    setResumeData("sections.language.items", updatedLanguages);
  };

  const handleAwardInfoChange = (e, i) => {
    const { name, value } = e.target;
    const updatedAwards = data.sections.awards.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handleAwardDescription = (val, i) => {
    const updatedAwards = data.sections.awards.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          description: val,
        };
      }
      return item;
    });
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handleAwardurlChange = (e, i) => {
    let val = e.target.value;
    if (!/^https?:\/\//i.test(val)) {
      val = "https://" + val;
    }

    const updatedAwards = data.sections.awards.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          url: val,
        };
      }
      return item;
    });
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handleAwardDateChange = (val, i) => {
    let newDate;
    if (!val) {
      newDate = "";
    } else {
      newDate = dayjs(val).format("YYYY-MM");
    }

    const updatedAwards = data.sections.awards.items.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          date: newDate,
        };
      }
      return item;
    });
    setResumeData("sections.awards.items", updatedAwards);
  };

  const handlereferencelevelChange = (e) => {
    setResumeData("sections.reference.name", e.target.value);
  };

  const handleReferenceInfoChange = (e, i) => {
    const { name, value } = e.target;
    const updatedReferences = data.sections.reference.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.reference.items", updatedReferences);
  };

  const handleReferenceUrlChange = (e, i) => {
    let val = e.target.value;
    if (!/^https?:\/\//i.test(val)) {
      val = "https://" + val;
    }

    const updatedReferences = data.sections.reference.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            url: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.reference.items", updatedReferences);
  };

  const handleDeleteReference = (i) => {
    const updatedReferences = data.sections.reference.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.reference.items", updatedReferences);
  };

  const handleAddNewreference = () => {
    const updatedAwards = [
      ...data.sections.reference.items,
      {
        name: "",
        url: "",
        jobTitle: "",
        organization: "",
        email: "",
        phone: "",
      },
    ];
    setResumeData("sections.reference.items", updatedAwards);
  };

  const handlecertificateurlChange = (e, i) => {
    let val = e.target.value;
    if (!/^https?:\/\//i.test(val)) {
      val = "https://" + val;
    }

    const updatedCertificates = data.sections.certificates.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            url: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.certificates.items", updatedCertificates);
  };

  const handlecertificatesLabelChange = (e) => {
    setResumeData("sections.certificates.name", e.target.value);
  };

  const handleAddNewcertificate = () => {
    const updatedCertificates = [
      ...data.sections.certificates.items,
      {
        name: "",
        url: "",
        description: "",
      },
    ];
    setResumeData("sections.certificates.items", updatedCertificates);
  };

  const handleDeletecertificate = (i) => {
    const updatedCertificates = data.sections.certificates.items.filter(
      (el, index) => {
        return index !== i;
      }
    );
    setResumeData("sections.certificates.items", updatedCertificates);
  };

  const handlecertificateInfoChange = (e, i) => {
    const { name, value } = e.target;
    const updatedCertificates = data.sections.certificates.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }
    );
    setResumeData("sections.certificates.items", updatedCertificates);
  };

  const handlecertificateDescription = (val, i) => {
    const updatedCertificates = data.sections.certificates.items.map(
      (item, index) => {
        if (index === i) {
          return {
            ...item,
            description: val,
          };
        }
        return item;
      }
    );
    setResumeData("sections.certificates.items", updatedCertificates);
  };

  function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }

  function getLuminance(r, g, b) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const handleTextColor = () => {
    const rgb = hexToRgb(data.metadata.theme.primary);
    if (rgb) {
      const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
      const calculatedTextColor = luminance > 0.5 ? "#484747" : "#FFFFFF";
      setResumeData("metadata.theme.text", calculatedTextColor);
    }
  };

  function lightenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const { r, g, b } = rgb;

    const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
    const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
    const newB = Math.min(255, Math.floor(b + (255 - b) * percent));

    return rgbToHex(newR, newG, newB);
  }

  const stripProtocol = (url) => {
    return url.replace(/^https?:\/\//i, "");
  };

  const handlesetSecondayColor = () => {
    const primaryColor = data.metadata.theme.primary;
    const secondaryColor = lightenColor(primaryColor, 0.5);

    setResumeData("metadata.theme.background", secondaryColor);
  };

  useEffect(() => {
    const unsubs = useResumeStore.subscribe((state) => {
      updateResume(state.resume._id, state.resume);
    });
    return unsubs;
  });

  useEffect(() => {
    handleTextColor();
    handlesetSecondayColor();
  }, [data.metadata.theme.primary]);

  return (
    <>
      <div className="px-5 py-20 bg-white">
        {generatingResume && (
          <div
            className="fixed w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center top-0 left-0"
            style={{
              zIndex: 9999,
            }}
          >
            <NewResumeLoader />
          </div>
        )}
        {/* Basics Information  */}
        <div className="lg:px-10 px-5">
          <div className="flex justify-between py-3 rounded-md">
            <div className="group">
              <Label className="text-2xl text-blue-900 font-bold">
                Basic Information
              </Label>
            </div>
          </div>
          {ImageTemplates.includes(data.metadata.template) && (
            <div className="w-full mt-5">
              <ImageUpload />
            </div>
          )}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
            <div className="space-y-2 my-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                name="name"
                onChange={(e) => setResumeData("basics.name", e.target.value)}
                value={data?.basics?.name}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="jobtitle">Job Title</Label>
              <Input
                id="jobtitle"
                placeholder="Enter Job Title"
                name="jobtitle"
                type="text"
                onChange={(e) =>
                  setResumeData("basics.jobtitle", e.target.value)
                }
                value={data?.basics?.jobtitle}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
            <div className="space-y-2 my-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                type="email"
                name="email"
                onChange={(e) => setResumeData("basics.email", e.target.value)}
                value={data?.basics?.email}
              />
            </div>
            <div className="space-y-2 my-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                name="phone"
                value={data?.basics?.phone}
                onChange={(e) => setResumeData("basics.phone", e.target.value)}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Enter Country Name"
                value={data?.basics?.country}
                name="country"
                onChange={(e) =>
                  setResumeData("basics.country", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter City Name"
                name="city"
                onChange={(e) => setResumeData("basics.city", e.target.value)}
                value={data?.basics?.city}
              />
            </div>
          </div>
        </div>

        {/* profile section */}
        <div className="py-5 my-5 lg:px-10 px-5">
          <div className="space-y-2">
            <div className=" flex justify-between items-center py-3">
              <div className="group">
                <Label
                  htmlFor="Profile"
                  className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2"
                >
                  {data?.sections?.summary?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={data?.sections?.summary?.name}
                  onChange={(e) =>
                    setResumeData("sections.summary.name", e.target.value)
                  }
                />
              </div>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              >
                <DialogTrigger asChild>
                  <button
                    className="generate-ai flex items-center"
                    onClick={handleOpenAIDialog}
                  >
                    Generate with AI
                    <BsStars className=" text-yellow-500 ml-2" />
                  </button>
                </DialogTrigger>
                <MultiStepForm
                  handleCloseAIDialog={handleCloseAIDialog}
                  formData={formData}
                  setFormData={setFormData}
                  steps={steps}
                  setSteps={setSteps}
                  isLoading={isLoading}
                  handleGenerateProfileSummary={handleGenerateProfileSummary}
                />
              </Dialog>
            </div>
            <div>
              <p className=" text-gray-400 text-sm">
                A short summary of your professional experiences, skills,
                education, and achievements to interest the readers in your CV
                will appear at the beginning of your CV. You can write the
                summary on your own or Use the Generate with AI option to get
                the summary written by the Genie to create a better impression!
              </p>
            </div>
            <div className="no-scrollbar">
              <Editor
                className="no-scrollbar"
                style={{
                  height: "200px",
                  position: "relative",
                }}
                value={data?.sections?.summary.content}
                onTextChange={handleChangeProfileSummaryChange}
              />
            </div>
          </div>
        </div>

        {/* education section */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 lg:px-10 px-5">
            <div className="flex justify-between py-3">
              <div className="group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.education?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={data?.sections?.education?.name}
                  onChange={(e) =>
                    setResumeData("sections.education.name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.education?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.education.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.education.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Input the details of your educational experiences, learnings,
                institutions joined, and much more that you feel are relevant to
                your job profile.
              </p>
            </div>
          </div>
          <div className="my-5 h-auto ">
            {sections?.education?.items.length > 0 &&
              sections?.education?.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-center group my-5 relative"
                  >
                    <GoGrabber
                      className="mt-3 text-3xl
                      font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                      defaultChecked
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="group-hover:text-blue-900">
                          <div className="px-3 flex flex-col items-start">
                            {item?.degree || item?.institute ? (
                              <p>
                                <span>{item?.degree}</span>
                                <span>
                                  {item?.degree && item?.institute && " at "}
                                </span>
                                <span>{item?.institute}</span>
                              </p>
                            ) : (
                              <p>(Not Specified)</p>
                            )}
                            <p className="text-gray-500 text-sm mt-1">
                              {item?.startDate && `${item.startDate} - `}
                              {item?.endDate}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full pt-5 pb-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                              <div className="space-y-2">
                                <Label htmlFor="institute">Institute</Label>
                                <Input
                                  id="institute"
                                  placeholder="Institute Name"
                                  value={item.institute}
                                  onChange={(e) =>
                                    handleEducationChange(e, index)
                                  }
                                  name="institute"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="degree">Degree</Label>
                                <Input
                                  id="degree"
                                  placeholder="Degree Name"
                                  type="text"
                                  value={item.degree}
                                  name="degree"
                                  onChange={(e) =>
                                    handleEducationChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5 ">
                              <div className="flex flex-col md:flex-row">
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 pr-2">
                                  <Label htmlFor="start_date" className="block">
                                    Start Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleEducationStartDateChange(e, index)
                                      }
                                      maxDate={dayjs()}
                                      name="startDate"
                                      className="w-full h-10"
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col w-full md:w-1/2 space-y-2   lg:pl-2 pl-0 lg:py-0 py-5">
                                  <Label for="end_date" className="block">
                                    End Date
                                  </Label>
                                  <div className="w-full">
                                    {item.endDate === "present" ? (
                                      <div className=" h-10 rounded-md flex items-center pl-2">
                                        <p className="text-xl text-gray-500">
                                          Present
                                        </p>
                                      </div>
                                    ) : (
                                      <DatePicker
                                        picker="month"
                                        onChange={(e) =>
                                          handleEducationEndDateChange(e, index)
                                        }
                                        disabled={!item?.startDate}
                                        disabledDate={(e) =>
                                          disabledEducationEndDate(e, item)
                                        }
                                        name="endDate"
                                        maxDate={dayjs()}
                                        className="w-full h-10"
                                      />
                                    )}
                                  </div>
                                  <div className="flex items-center ">
                                    <Checkbox
                                      className="mr-2 font-thin"
                                      checked={item.endDate === "present"}
                                      onCheckedChange={(e) =>
                                        handleEducationCheckChange(e, index)
                                      }
                                    />
                                    <p className=" font-mono italic text-gray-500">
                                      Present
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 flex flex-col">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  placeholder="Enter city name"
                                  type="text"
                                  value={item.city}
                                  name="city"
                                  onChange={(e) =>
                                    handleEducationChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2 my-5 px-2">
                              <Label htmlFor="city">Description</Label>
                              <Editor
                                placeholder="eg. Graduated from the University "
                                value={item.description}
                                onTextChange={(e) =>
                                  handleEducationDescriptionChange(
                                    e.htmlValue,
                                    index
                                  )
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="mt-3 text-2xl
                      font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteEducationSection(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-10 ">
            <Button
              className="w-full bg-transparent text-blue-900 p-2 font-semibold hover:bg-blue-100 hover:p-2 h-8 flex justify-start rounded-none item-center"
              onClick={handleAddNewEducation}
            >
              <IoIosAddCircleOutline className="text-xl mr-2" />
              Add one more {`${data?.sections?.education?.name}`.toLowerCase()}
            </Button>
          </div>
        </div>

        {/* experience section */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 lg:px-10 px-5">
            <div className="flex justify-between py-3">
              <div className="group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.experience?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={data?.sections?.experience?.name}
                  onChange={(e) =>
                    setResumeData("sections.experience.name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.experience?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.experience.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.experience.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Enter your experiences and professional endeavours and add
                specific details to add to the value of your profile by
                reflecting the necessary knowledge base.
              </p>
            </div>
          </div>

          <div className=" my-5 h-auto">
            {sections?.experience?.items.length > 0 &&
              sections?.experience?.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-between group my-5 "
                  >
                    <GoGrabber
                      className="mt-3 text-3xl
               font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>
                          <div className=" px-3 flex flex-col items-start">
                            {item?.jobtitle || item?.employer ? (
                              <p>
                                {item?.jobtitle &&
                                  `${item?.jobtitle}${
                                    item?.employer && ` at `
                                  } `}
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
                          <div className="w-full pt-5 pb-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1  gap-4 px-2 py-5">
                              <div className="space-y-2">
                                <Label htmlFor="institute">Job Title</Label>
                                <Input
                                  id="institute"
                                  placeholder="Enter Job title"
                                  value={item.jobtitle}
                                  name="jobtitle"
                                  onChange={(e) =>
                                    handleExperienceChange(e, index)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="degree">Employer</Label>
                                <Input
                                  id="degree"
                                  placeholder="Employer name"
                                  type="text"
                                  value={item.employer}
                                  name="employer"
                                  onChange={(e) =>
                                    handleExperienceChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                              <div className="flex flex-col md:flex-row ">
                                <div className="flex flex-col w-full md:w-1/2 space-y-2  pr-2 lg:py-0 py-5">
                                  <Label for="start_date" className="block">
                                    Start Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleExperienceStartDateChange(
                                          e,
                                          index
                                        )
                                      }
                                      className="w-full h-10"
                                      maxDate={dayjs()}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col w-full md:w-1/2 space-y-2   lg:pl-2 pl-0">
                                  <Label for="end_date" className="block">
                                    End Date
                                  </Label>
                                  <div className="w-full">
                                    {item.endDate === "present" ? (
                                      <div className=" h-10 rounded-md flex items-center pl-2">
                                        <p className="text-xl text-gray-500">
                                          Present
                                        </p>
                                      </div>
                                    ) : (
                                      <DatePicker
                                        picker="month"
                                        onChange={(e) =>
                                          handleExperienceEndDateChange(
                                            e,
                                            index
                                          )
                                        }
                                        className="w-full h-10"
                                        maxDate={dayjs()}
                                        disabled={!item.startDate}
                                        disabledDate={(e) =>
                                          handledisableExperienceDate(e, item)
                                        }
                                      />
                                    )}
                                  </div>
                                  <div className="flex items-center ">
                                    <Checkbox
                                      className="mr-2 font-thin"
                                      checked={item.endDate === "present"}
                                      onCheckedChange={(e) =>
                                        handleExperienceCheckChange(e, index)
                                      }
                                    />
                                    <p className=" font-mono italic text-gray-500">
                                      Present
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 flex flex-col">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  placeholder="Enter city name"
                                  type="text"
                                  value={item.city}
                                  name="city"
                                  onChange={(e) =>
                                    handleExperienceChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2 mt-5 mb-12 px-2">
                              <Label>Description</Label>
                              <Editor
                                placeholder="e.g.  Created and implemented lesson plans based on child-led interests and curiosities."
                                value={item.description}
                                onTextChange={(e) =>
                                  handleExperienceDescriptionChange(
                                    e.htmlValue,
                                    index
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2  mt-9 px-2">
                              <Label>Achievements</Label>
                              <Textarea
                                value={item?.highlights?.join("\n") || []}
                                className="text-10px h-[150px] no-scrollbar"
                                onChange={(e) =>
                                  handleExperienceHighlightsChange(index, e)
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="mt-3 text-2xl
               font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteExperienceSection(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-10 ">
            <Button
              className="w-full bg-transparent p-2 text-blue-900 font-semibold hover:bg-blue-100 hover:p-2 h-8 flex justify-start rounded-none item-center"
              onClick={handleAddNewExperience}
            >
              <IoIosAddCircleOutline className="text-xl mr-2" />
              Add one more {`${data?.sections?.experience?.name}`.toLowerCase()}
            </Button>
          </div>
        </div>

        {/* Projects */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 lg:px-10 px-5">
            <div className="flex justify-between py-3">
              <div className="group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.projects?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={data?.sections?.projects?.name}
                  onChange={(e) =>
                    setResumeData("sections.projects.name", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.projects?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.projects.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.projects.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                If you have pursued any independent or relative projects
                relevant to your job profile, mention them to create an
                impression of thorough practical experience.{" "}
              </p>
            </div>
          </div>

          <div className=" my-5 h-auto">
            {sections?.projects?.items.length > 0 &&
              sections?.projects?.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-between group my-5 "
                  >
                    <GoGrabber
                      className="mt-3 text-3xl
                      font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>
                          <div className=" px-3 flex flex-col items-start">
                            <p>
                              {item?.title
                                ? `${item?.title}`
                                : "(Not Specified  )"}
                            </p>
                            <p>{item?.subtitle}</p>
                            <p className="text-gray-500 text-sm">
                              {item?.startDate && `${item.startDate} - `}
                              {item?.endDate}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full pt-5 pb-10">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2 py-5">
                              <div className="space-y-2">
                                <Label htmlFor="institute">Title</Label>
                                <Input
                                  id="institute"
                                  placeholder="Enter Project title"
                                  value={item.title}
                                  name="title"
                                  onChange={(e) =>
                                    handleProjectChange(e, index)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="degree">Subtitle</Label>
                                <Input
                                  id="degree"
                                  placeholder="Enter project subtitle"
                                  type="text"
                                  value={item.subtitle}
                                  name="subtitle"
                                  onChange={(e) =>
                                    handleProjectChange(e, index)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 px-2">
                              <div className="flex flex-col md:flex-row ">
                                <div className="flex flex-col w-full md:w-1/2 space-y-2 pr-2">
                                  <Label htmlFor="start_date" className="block">
                                    Start Date
                                  </Label>
                                  <div className="w-full">
                                    <DatePicker
                                      picker="month"
                                      onChange={(e) =>
                                        handleProjectStartDateChange(e, index)
                                      }
                                      className="w-full h-10"
                                      maxDate={dayjs()}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col w-full md:w-1/2 space-y-2  lg:pl-2 pl-0 lg:py-0 py-5">
                                  <Label for="end_date" className="block">
                                    End Date
                                  </Label>
                                  <div className="w-full">
                                    {item.endDate === "present" ? (
                                      <div className=" h-10 rounded-md flex items-center pl-2">
                                        <p className="text-xl text-gray-500">
                                          Present
                                        </p>
                                      </div>
                                    ) : (
                                      <DatePicker
                                        picker="month"
                                        onChange={(e) =>
                                          handleProjectEndDateChange(e, index)
                                        }
                                        disabled={!item.startDate}
                                        disabledDate={(e) =>
                                          handleDisableProjectEndDate(e, item)
                                        }
                                        className="w-full h-10"
                                        maxDate={dayjs()}
                                      />
                                    )}
                                  </div>
                                  <div className="flex items-center ">
                                    <Checkbox
                                      className="mr-2 font-thin"
                                      checked={item.endDate === "present"}
                                      onCheckedChange={(e) =>
                                        handleProjectCheckChange(e, index)
                                      }
                                    />
                                    <p className=" font-mono italic text-gray-500">
                                      Present
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 my-5 px-2">
                              <Label htmlFor="city">Description</Label>
                              <Editor
                                placeholder="e.g.Created and implemented lesson plans based on child-led interests and curiosities."
                                value={item?.description}
                                onTextChange={(e) =>
                                  handleProjectDescriptionChange(
                                    e.htmlValue,
                                    index
                                  )
                                }
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="mt-3 text-2xl
                      font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteProjectSection(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="px-10 ">
            <Button
              className="w-full bg-transparent p-2 font-semibold text-blue-900 hover:bg-blue-100 hover:p-2 h-8 flex justify-start rounded-none item-center"
              onClick={handleAddNewProject}
            >
              <IoIosAddCircleOutline className="text-xl mr-2" />
              Add one more {`${data?.sections?.projects?.name}`.toLowerCase()}
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 lg:px-10 px-5">
            <div className="flex justify-between py-3">
              <div className="group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.skills?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={sections?.skills?.name}
                  onChange={handleSkillsLabelChange}
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.skills?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.skills.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.skills.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Choose 5 important skills that show you fit the position. Make
                sure they match the key skills mentioned in the job listing
                (especially when applying via an online system).
              </p>
            </div>
          </div>
          <div>
            {sections.skills.items.length > 0 &&
              sections.skills.items.map((skills, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-center group my-5 relative"
                  >
                    <GoGrabber
                      className=" text-3xl
                       font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                      defaultChecked
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="group-hover:text-blue-900">
                          <div className=" px-3 flex flex-col items-start ">
                            <p>{skills.name || "(Not Specified)"}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className=" grid-cols-2 gap-2 flex px-2">
                            <div className=" w-1/2">
                              <Label htmlFor={`skills-${index}`}>Name</Label>
                              <Input
                                value={skills?.name}
                                onChange={(e) =>
                                  handleSkillNameChange(e.target.value, index)
                                }
                              />
                            </div>
                            <div className=" w-1/2 flex flex-col items-start justify-center">
                              <Label
                                htmlFor={`skills-${index}`}
                                className="mb-1"
                              >
                                Level
                              </Label>
                              <SkillsSelect
                                className="w-full"
                                onSelectChange={handleSkillLevelChange}
                                index={index}
                                value={skills?.level}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="absolute top-2 right-1 text-2xl
                        font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeleteSkills(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="mt-5 px-10">
            <div>
              <Button
                className="w-full bg-transparent p-2 font-semibold text-blue-900 hover:bg-blue-100 hover:p-2 h-8 flex justify-start rounded-none item-center"
                onClick={handleAddNewSkills}
              >
                <IoIosAddCircleOutline className="text-xl mr-2" />
                Add Skills
              </Button>
            </div>
          </div>
        </div>

        {/* Hobbies  */}
        <div className=" lg:px-10 px-5">
          <div className="my-5 flex justify-between w-full items-center ">
            <div className="group">
              <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                {sections?.hobbies?.name}
                <MdEdit className="text-xl" />
              </Label>
              <CustomLabelInput
                className="hidden group-hover:block "
                value={sections?.hobbies?.name}
                onChange={handlehobbieslevelChange}
              />
            </div>
            <div className="flex items-center justify-center text-blue-900 text-lg">
              {!sections?.hobbies?.visible ? (
                <GoEyeClosed
                  className=" cursor-pointer text-blue-900"
                  onClick={() =>
                    setResumeData("sections.hobbies.visible", true)
                  }
                />
              ) : (
                <GoEye
                  className="cursor-pointer text-blue-900"
                  onClick={() =>
                    setResumeData("sections.hobbies.visible", false)
                  }
                />
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 pl-2">
              List your hobbies, interests, and passions.
            </p>
          </div>
          <div className="my-4">
            <div className=" flex w-full flex-wrap py-4">
              {sections?.hobbies?.items.length > 0 &&
                sections.hobbies.items.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className=" bg-white border  py-2 px-6 items-center justify-center flex rounded-3xl my-2 mr-3"
                    >
                      <span className="mr-4">{item}</span>
                      <span
                        className=" cursor-pointer"
                        onClick={() => handleDeleteHobbies(index)}
                      >
                        <RxCross2 className="text-red-600" />
                      </span>
                    </p>
                  );
                })}
            </div>
            <div className="flex justify-between">
              <Input
                onChange={handleChangeHobbies}
                ref={hobbiesRef}
                className="w-[80%]"
              />
              <Button
                className="flex justify-center"
                onClick={handleAddNewHobbies}
              >
                <IoIosAddCircleOutline className="mr-2 text-xl" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="py-5 mt-0 mb-10">
          <div className="lg:px-10 p-5 rounded-md">
            <div className="my-5 flex justify-between w-full items-center">
              <div className="group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.awards?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={sections?.awards?.name}
                  onChange={handleawardslevelChange}
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.awards?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.awards.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.awards.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Awards like student competitions or industry accolades belong
                here.
              </p>
            </div>
          </div>
          <div>
            <div className="w-full">
              {sections?.awards?.items?.length > 0 &&
                sections?.awards?.items.map((award, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-start justify-center group my-5 relative w-full"
                    >
                      <GoGrabber
                        className=" text-3xl
                       font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"
                      />
                      <Accordion
                        type="single"
                        collapsible
                        className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                        defaultValue={`item-${index}`}
                        defaultChecked
                      >
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="group-hover:text-blue-900">
                            <div className=" px-3 flex flex-col items-start ">
                              <p>{award.name || "(Not Specified)"}</p>
                              <p>{award.date}</p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-5 pb-10 flex justify-between items-baseline w-full flex-col">
                              <div className="w-full flex items-end justify-between px-4">
                                <div className="w-[80%]">
                                  <Label htmlFor={`skills-${index} my-2`}>
                                    Name
                                  </Label>
                                  <Input
                                    value={award?.name}
                                    onChange={(e) =>
                                      handleAwardNameChange(
                                        e.target.value,
                                        index
                                      )
                                    }
                                    className="w-full mt-2"
                                  />
                                </div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="bg-blue-900 hover:bg-blue-700 text-white hover:text-white"
                                    >
                                      <FiLink />
                                      Link
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 space-y-4 p-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-lg font-medium">
                                        Enter Link
                                      </h4>
                                    </div>
                                    <Input
                                      placeholder="Enter url"
                                      value={stripProtocol(award?.url)}
                                      onChange={(e) =>
                                        handleAwardurlChange(e, index)
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="w-full my-3 px-4 flex items-end justify-between">
                                <div className="w-[48%]">
                                  <Label>Issuer</Label>
                                  <Input
                                    placeholder="Enter Issuer"
                                    value={award?.issuer}
                                    onChange={(e) =>
                                      handleAwardInfoChange(e, index)
                                    }
                                    name="issuer"
                                    className="mt-2"
                                  />
                                </div>
                                <div className="w-[48%]  flex flex-col">
                                  <Label>Date</Label>
                                  <DatePicker
                                    picker="month"
                                    className="h-10 mt-2"
                                    onChange={(e) =>
                                      handleAwardDateChange(e, index)
                                    }
                                    maxDate={dayjs()}
                                  />
                                </div>
                              </div>
                              <div className="px-4 py-2 w-full">
                                <Label>Description</Label>
                                <Editor
                                  value={award?.description}
                                  onTextChange={(e) =>
                                    handleAwardDescription(e.htmlValue, index)
                                  }
                                  name="description"
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <MdDeleteOutline
                        className="absolute top-2 right-1 text-2xl
                        font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                        onClick={() => handleDeleteAward(index)}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mt-5 px-10">
              <div>
                <Button
                  className="w-full bg-transparent text-blue-950 font-bold hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
                  onClick={handleAddNewAwards}
                >
                  <IoIosAddCircleOutline className="text-xl mr-2" />
                  Add new award
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reference */}
        <div className="py-5 mt-0 mb-10">
          <div className="lg:px-10 p-5 rounded-md">
            <div className="my-5 flex justify-between w-full items-center">
              <div className="group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.reference?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block "
                  value={sections?.reference?.name}
                  onChange={handlereferencelevelChange}
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.reference?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.reference.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.reference.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                If you have former colleagues or bosses that vouch for you, list
                them.
              </p>
            </div>
          </div>
          <div>
            <div className="w-full">
              {sections?.reference?.items?.length > 0 &&
                sections?.reference?.items.map((reference, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-start justify-center group my-5 relative w-full"
                    >
                      <GoGrabber
                        className=" text-3xl
                       font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"
                      />
                      <Accordion
                        type="single"
                        collapsible
                        className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                        defaultValue={`item-${index}`}
                        defaultChecked
                      >
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="group-hover:text-blue-900">
                            <div className=" px-3 flex flex-col items-start ">
                              <p>{reference?.name || "(Not Specified)"}</p>
                              <p>{reference?.date}</p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-5 pb-10 flex justify-between items-baseline w-full flex-col">
                              <div className="w-full flex items-end justify-between px-4">
                                <div className="w-[80%]">
                                  <Label htmlFor={`skills-${index}`}>
                                    Name
                                  </Label>
                                  <Input
                                    value={reference?.name}
                                    onChange={(e) =>
                                      handleReferenceInfoChange(e, index)
                                    }
                                    name="name"
                                    className="w-full mt-2"
                                  />
                                </div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="bg-blue-900 hover:bg-blue-700 text-white hover:text-white"
                                    >
                                      <FiLink />
                                      Link
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 space-y-4 p-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-lg font-medium">
                                        Enter Link
                                      </h4>
                                    </div>
                                    <Input
                                      placeholder="Enter url"
                                      value={stripProtocol(reference?.url)}
                                      onChange={(e) =>
                                        handleReferenceUrlChange(e, index)
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="w-full my-3 px-4 flex items-end justify-between">
                                <div className="w-[48%]">
                                  <Label>JobTitle</Label>
                                  <Input
                                    placeholder="Enter Issuer"
                                    value={reference?.jobTitle}
                                    onChange={(e) =>
                                      handleReferenceInfoChange(e, index)
                                    }
                                    name="jobTitle"
                                    className="mt-2"
                                  />
                                </div>
                                <div className="w-[48%]  flex flex-col">
                                  <Label>Organization</Label>
                                  <Input
                                    placeholder="Enter Organization"
                                    value={reference?.organization}
                                    onChange={(e) =>
                                      handleReferenceInfoChange(e, index)
                                    }
                                    name="organization"
                                    className="mt-2"
                                  />
                                </div>
                              </div>
                              <div className="w-full my-3 px-4 flex items-end justify-between">
                                <div className="w-[48%]">
                                  <Label>Email</Label>
                                  <Input
                                    placeholder="Enter email"
                                    value={reference?.email}
                                    onChange={(e) =>
                                      handleReferenceInfoChange(e, index)
                                    }
                                    name="email"
                                    className="mt-2"
                                  />
                                </div>
                                <div className="w-[48%]  flex flex-col">
                                  <Label>Phone</Label>
                                  <Input
                                    placeholder="Enter a phone number"
                                    value={reference?.phone}
                                    onChange={(e) =>
                                      handleReferenceInfoChange(e, index)
                                    }
                                    name="phone"
                                    className="mt-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <MdDeleteOutline
                        className="absolute top-2 right-1 text-2xl
                        font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                        onClick={() => handleDeleteReference(index)}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mt-5 px-10">
              <div>
                <Button
                  className="w-full bg-transparent text-blue-900 font-bold hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
                  onClick={handleAddNewreference}
                >
                  <IoIosAddCircleOutline className="text-xl mr-2" />
                  Add new reference
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* certificates */}
        <div className="py-5 mt-0 mb-10">
          <div className="lg:px-10 p-5 rounded-md">
            <div className="my-5 flex justify-between w-full items-center">
              <div className=" w-[40%] group">
                <Label className="text-2xl group-hover:hidden text-blue-900 font-bold flex items-center gap-2">
                  {sections?.certificates?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={sections?.certificates?.name}
                  onChange={handlecertificatesLabelChange}
                />
              </div>
              <div className="flex items-center justify-center text-gray-400 text-lg">
                {!sections?.certificates?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.certificates.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.certificates.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Add Industry-relevant certifications and accreditations that you
                have.
              </p>
            </div>
          </div>
          <div>
            <div className="w-full">
              {sections?.certificates?.items?.length > 0 &&
                sections?.certificates?.items.map((certificate, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-start justify-center group my-5 relative w-full"
                    >
                      <GoGrabber
                        className=" text-3xl
                       font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"
                      />
                      <Accordion
                        type="single"
                        collapsible
                        className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                        defaultValue={`item-${index}`}
                        defaultChecked
                      >
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="group-hover:text-blue-900">
                            <div className=" px-3 flex flex-col items-start ">
                              <p>{certificate.name || "(Not Specified)"}</p>
                              <p>{certificate.date}</p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pt-5 pb-10 flex justify-between items-baseline w-full flex-col">
                              <div className="w-full flex items-end justify-between px-4">
                                <div className="w-[80%]">
                                  <Label htmlFor={`skills-${index}`}>
                                    Name
                                  </Label>
                                  <Input
                                    value={certificate?.name}
                                    onChange={(e) =>
                                      handlecertificateInfoChange(e, index)
                                    }
                                    name="name"
                                    className="w-full mt-2"
                                  />
                                </div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="bg-blue-900 hover:bg-blue-700 text-white hover:text-white"
                                    >
                                      <FiLink />
                                      Link
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80 space-y-4 p-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-lg font-medium">
                                        Enter Link
                                      </h4>
                                    </div>
                                    <Input
                                      placeholder="Enter url"
                                      value={stripProtocol(certificate.url)}
                                      onChange={(e) =>
                                        handlecertificateurlChange(e, index)
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="px-4 py-6 w-full">
                                <Editor
                                  value={certificate?.description}
                                  onTextChange={(e) =>
                                    handlecertificateDescription(
                                      e.htmlValue,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <MdDeleteOutline
                        className="absolute top-2 right-1 text-2xl
                        font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                        onClick={() => handleDeletecertificate(index)}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mt-5 px-10">
              <div>
                <Button
                  className="w-full bg-transparent text-blue-900 font-bold hover:bg-blue-100 h-8 flex justify-start rounded-none item-center"
                  onClick={handleAddNewcertificate}
                >
                  <IoIosAddCircleOutline className="text-xl mr-2" />
                  Add new certificate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* languages */}
        <div className="py-5 mt-0 mb-10">
          <div className="space-y-2 lg:px-10 px-5">
            <div className="flex justify-between">
              <div className=" w-[40%] group">
                <Label className="text-2xl flex group-hover:hidden text-blue-900 font-bold items-center gap-2">
                  {sections?.language?.name}
                  <MdEdit className="text-xl" />
                </Label>
                <CustomLabelInput
                  className="hidden group-hover:block"
                  value={sections?.language?.name}
                  onChange={handlelanguageLabelChange}
                />
              </div>
              <div className="flex items-center justify-center text-blue-900 text-lg">
                {!sections?.language?.visible ? (
                  <GoEyeClosed
                    className=" cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.language.visible", true)
                    }
                  />
                ) : (
                  <GoEye
                    className="cursor-pointer"
                    onClick={() =>
                      setResumeData("sections.language.visible", false)
                    }
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Select languages</p>
            </div>
          </div>
          <div>
            {sections?.language?.items?.length > 0 &&
              sections.language.items.map((language, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start justify-center group my-5 relative"
                  >
                    <GoGrabber
                      className=" text-3xl
                       font-extrabold text-gray-800 cursor-grab invisible group-hover:visible transition delay-150 duration-100 ease-in-out absolute top-2 left-1"
                    />
                    <Accordion
                      type="single"
                      collapsible
                      className="w-[90%] group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border border-gray-200 p-2 bg-white"
                      defaultValue={`item-${index}`}
                      defaultChecked
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="group-hover:text-blue-900">
                          <div className=" px-3 flex flex-col items-start ">
                            <p>{language.name || "(Not Specified)"}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className=" grid-cols-2 gap-2 flex px-2">
                            <div className=" w-1/2">
                              <Label htmlFor={`language-${index}`}>Name</Label>
                              <Input
                                value={language?.name}
                                onChange={(e) =>
                                  handlelanguageNameChange(
                                    e.target.value,
                                    index
                                  )
                                }
                                className="mt-2"
                              />
                            </div>
                            <div className=" w-1/2 flex flex-col items-start justify-center">
                              <Label
                                htmlFor={`skills-${index}`}
                                className="mb-1"
                              >
                                Level
                              </Label>
                              <LanguageSelect
                                className="w-full mt-2"
                                onSelectChange={handlelanguageLevelChange}
                                index={index}
                                value={language?.level}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <MdDeleteOutline
                      className="absolute top-2 right-1 text-2xl
                        font-extrabold  cursor-pointer invisible group-hover:visible text-red-600 transition delay-150 duration-300 ease-in-out"
                      onClick={() => handleDeletelanguage(index)}
                    />
                  </div>
                );
              })}
          </div>
          <div className="mt-5 px-10">
            <div>
              <Button
                className="w-full bg-transparent p-2 font-semibold text-blue-900 hover:bg-blue-100 hover:p-2 h-8 flex justify-start rounded-none item-center"
                onClick={handleAddNewLanguage}
              >
                <IoIosAddCircleOutline className="text-xl mr-2" />
                Add new language
              </Button>
            </div>
          </div>
        </div>

        {/* theme */}
        <div className="lg:px-10 px-5 rounded-md ">
          <div className="my-5 flex justify-between w-full items-center">
            <Label className="text-2xl text-blue-900 font-bold">Theme</Label>
            <div className="flex rounded-md items-center space-x-4 my-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className="rounded-full cursor-pointer ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: data.metadata.theme.primary,
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                  <HexColorPicker
                    color={data.metadata.theme.primary}
                    onChange={handleTemplateThemeChange}
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="theme.primary"
                value={data.metadata.theme.primary}
                className="pl-2 w-36 rounded-md"
                onChange={(event) => {
                  setResumeData("metadata.theme.primary", event.target.value);
                }}
              />
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full group-hover:shadow-lg rounded transition delay-150 duration-300 ease-in-out border-none bg-white"
          >
            <AccordionItem value="color">
              <AccordionTrigger className="group-hover:text-blue-900">
                <div className="grid grid-cols-6 flex-wrap justify-items-center gap-y-4 @xs/right:grid-cols-9 w-full">
                  {AccordianColor.map((color, index) => (
                    <div
                      key={color}
                      onClick={() => {
                        setResumeData("metadata.theme.primary", color);
                      }}
                      className={cn(
                        "flex size-8 rounded-full cursor-pointer items-center justify-center ring-primary ring-offset-4 ring-offset-background transition-shadow hover:ring-1",
                        data?.metadata?.theme?.primary === color && "ring-1"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-2 grid grid-cols-6 flex-wrap justify-items-center gap-y-4 @xs/right:grid-cols-9  pr-4 py-2">
                  {colors.map((color, index) => (
                    <div
                      key={color}
                      onClick={() => {
                        setResumeData("metadata.theme.primary", color);
                      }}
                      className={cn(
                        "flex size-8 rounded-full cursor-pointer items-center justify-center ring-primary ring-offset-4 ring-offset-background transition-shadow hover:ring-1",
                        data?.metadata?.theme?.primary === color && "ring-1"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div></div>
        </div>
      </div>
    </>
  );
}
