import Footer from "../Layout/Footer";
import NewResumeHeader from "../Layout/NewResumeHeader";
import { ResumeHeader } from "../Layout/ResumeHeader";
// export const metadata = {
//   title: "Returns Policy: Genies Career Hub",
//   description:
//     "Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase.",
//   alternates: {
//     canonical: "https://www.geniescareerhub.com/return-policy",
//   },
// };

const Layout = ({ children }) => {
  return (
    <>
      <head>
        <title>Returns Policy: Genies Career Hub</title>
        <meta
          name="description"
          content="Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase."
        />
        <link rel="canonical" href="https://www.geniescareerhub.com/return-policy" />
        <meta
          property="og:url"
          content="https://www.geniescareerhub.com/return-policy"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Returns Policy: Genies Career Hub" />
        <meta
          property="og:description"
          content="Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase."
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/a1181088-686b-4d11-8ffd-3decd99e9945.png?token=CXmRXb4fjjdJSWJ0a1_bO2FM5Ct9n6-yNpjBkX3CWRI&height=273&width=354&expires=33263755237"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="geniescareerhub.com" />
        <meta
          property="twitter:url"
          content="https://www.geniescareerhub.com/return-policy"
        />
        <meta
          name="twitter:title"
          content="Returns Policy: Genies Career Hub"
        />
        <meta
          name="twitter:description"
          content="Want to register a return or exchange an unwanted purchase? Check out terms, conditions, and policies for returns for complete details regarding your purchase."
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/a1181088-686b-4d11-8ffd-3decd99e9945.png?token=CXmRXb4fjjdJSWJ0a1_bO2FM5Ct9n6-yNpjBkX3CWRI&height=273&width=354&expires=33263755237"
        />
      </head>

      <main className="terms_condition">
        <div className="terms_condition_container">
          <div className="wrapper">
            <ResumeHeader />
            {children}
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
