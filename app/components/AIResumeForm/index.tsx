import { cx } from "@/app/lib/cx";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "@/app/lib/redux/hooks";
import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { ShowForm, selectFormsOrder } from "@/app/lib/redux/settingsSlice";
import { WorkExperiencesForm } from "./WorkExperiencesForm";
import { EducationsForm } from "./EducationsForm";
import { ProjectsForm } from "./ProjectsForm";
import { SkillsForm } from "./SkillsForm";
import { CustomForm } from "./CustomForm";
import { ThemeForm } from "./ThemeForm";
import { FaUserEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const AIResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const [isHover, setIsHover] = useState(false);

  const formsOrder = useAppSelector(selectFormsOrder);

  return (
    <>
      <div className="flex justify-between items-center px-8">
        <h2 className="text-gray-700 text-xl font-semibold">
          Edit Your Resume
        </h2>
        
      </div>
      <div
        className={cx(
          "flex justify-center scrollbar scrollbar-track-gray-100 scrollbar-w-3 rounded-2xl md:h-[calc(100vh)] md:justify-end md:overflow-y-scroll",
          isHover && "scrollbar-thumb-gray-200"
        )}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <section className="flex flex-col max-w-2xl gap-8 p-[var(--resume-padding)]">
          <ProfileForm />
          {formsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return <Component key={form} />;
          })}
          {/* <ThemeForm /> */}
        </section>
      </div>
    </>
  );
};
