import Footer from "../Layout/Footer"
import NewResumeHeader from "../Layout/NewResumeHeader"
import { ResumeHeader } from "../Layout/ResumeHeader";
export const metadata = {
  title: "Cookies & Tracking Policy: Genies Career Hub",
  description:
    "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
    alternates: {
      canonical: "https://www.geniescareerhub.com/cookies-tracking-policy",
    },
    openGraph: {
      type: "website",
       url: "https://www.geniescareerhub.com/cookies-tracking-policy",
      title: "Cookies & Tracking Policy: Genies Career Hub",
      description:
        "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information",
        image:
      "https://opengraph.b-cdn.net/production/images/a1181088-686b-4d11-8ffd-3decd99e9945.png?token=_F1xTBzJUl7tUrIRWbl6BGStTqwGPla1WldItNpyX1E&height=273&width=354&expires=33263691977",
    },
    twitter: {
      card: "summary_large_image",
      domain: "geniescareerhub.com",
      url: "https://www.geniescareerhub.com/cookies-tracking-policy",
      title: "Cookies & Tracking Policy: Genies Career Hub",
      description:
        "Check out all the details about the Cookies and Trackers that the Genies Career Hub platform employs in order to process your personal data and information.",
      image:
        "https://opengraph.b-cdn.net/production/images/a1181088-686b-4d11-8ffd-3decd99e9945.png?token=_F1xTBzJUl7tUrIRWbl6BGStTqwGPla1WldItNpyX1E&height=273&width=354&expires=33263691977",
    },
};

const Layout = ({ children }) => {
    return (
      <main className="terms_condition" >
        <div className="terms_condition_container">
          <div className="wrapper">
            <ResumeHeader/>
            {children}
            <Footer/>
          </div>
        </div>
      </main>
    )
  }
  
  export default Layout