import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";


export const GetTemplate = ({ name, resumeData }) => {
    switch (name) {
        case "Template1":
            return <Template1 resumeData={resumeData} />;
        case "Template2":
            return <Template2 resumeData={resumeData} />;
        case "Template3":
            return <Template3 resumeData={resumeData} />;
        case "Template4":
            return <Template4 resumeData={resumeData} />;
        case "Template5":
            return <Template5 resumeData={resumeData} />;
        default:
            return <Template1 resumeData={resumeData} />;
    }
}