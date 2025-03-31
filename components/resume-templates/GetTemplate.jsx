import Template1 from "./Template1";
import Template4 from "./Template4";
import Template7 from "./Template7";
import Template10 from "./Template10";
import Template20 from "./Template20";

export const GetTemplate = ({ name }) => {
  switch (name) {
    case "Template1":
      return <Template1 />;
    case "Template4":
      return <Template4 />;
    case "Template7":
      return <Template7 />;
    case "Template10":
      return <Template10 />;
    case "Template20":
      return <Template20 />;
    default:
      return <Template1 />;
  }
};
