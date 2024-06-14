import Template1 from "./Template1";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template13 from "./Template13";
import Template15 from "./Template15";
import Template12 from "./Template12";
import Template14 from "./Template14";
import Template16 from "./Template16";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import Template7 from "./Template7";
import Template8 from "./Template8";
import Template9 from "./Template9";
import Template18 from "./Template18";
import Template17 from "./Template17";
import Template19 from "./Template19";
import Template20 from "./Template20";
import Template22 from "./Template22";
import Template19 from "./Template19";

export const GetTemplate = ({ name }) => {
  switch (name) {
    case "Template1":
      return <Template1 />;
    case "Template2":
      return <Template2 />;
    case "Template3":
      return <Template3 />;
    case "Template4":
      return <Template4 />;
    case "Template5":
      return <Template5 />;
    case "Template6":
      return <Template6 />;
    case "Template7":
      return <Template7 />;
    case "Template8":
      return <Template8 />;
    case "Template9":
      return <Template9 />;
    case "Template10":
      return <Template10 />;
    case "Template11":
      return <Template11 />;
    case "Template13":
      return <Template13 />;
    case "Template15":
      return <Template15 />;
    case "Template12":
      return <Template12 />;
    case "Template14":
      return <Template14 />;
    case "Template16":
      return <Template16 />;
    case "Template18":
      return <Template18 />;
    case "Template17":
      return <Template17 />;
    case "Template19":
      return <Template19 />;
    case "Template20":
      return <Template20 />;
    case "Template22":
      return <Template22 />;
    default:
      return <Template1 />;
  }
};
