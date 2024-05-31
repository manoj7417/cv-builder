import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";

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
    case "Template6":
      return <Template6 resumeData={resumeData} />;
      case "Template7":
      return <Template7 resumeData={resumeData} />;
      case "Template8":
        return <Template8 resumeData={resumeData} />;
        case "Template9":
        return <Template9 resumeData={resumeData} />;
    default:
      return <Template1 resumeData={resumeData} />;
  }
};
