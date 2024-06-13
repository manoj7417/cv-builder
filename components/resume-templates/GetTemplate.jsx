import Template1 from "./Template1";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";

export const GetTemplate = ({ name }) => {
  switch (name) {
    case "Template1":
      return <Template1  />;
    case "Template2":
      return <Template2  />;
    case "Template3":
      return <Template3  />;
    case "Template4":
      return <Template4  />;
    case "Template5":
      return <Template5  />;
    case "Template6":
      return <Template6  />;
    case "Template7":
      return <Template7  />;
    case "Template8":
      return <Template8  />;
    case "Template9":
      return <Template9  />;
    case "Template10":
      return <Template10  />;
      case "Template11":
      return <Template11 />;
    default:
      return <Template1  />;
  }
};
