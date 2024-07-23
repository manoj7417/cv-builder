// import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "Professional CV Templates for Perfect CVs on Genies CV Maker",
  description:
    "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
};

const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "700"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NWEWJM4JYM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'G-NWEWJM4JYM');
            `,
          }} />
        <meta name="google-site-verification" content="3rLr-hJyNEY32xTuNgCpZ615tYr0yriig4N3sfvNi_E" />

      </head>
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
