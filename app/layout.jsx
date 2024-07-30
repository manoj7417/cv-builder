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
// import VerifyUser from "@/components/component/VerifyUser";

// export const metadata = {
//   title: "Professional CV Templates for Perfect CVs on Genies CV Maker",
//   description:
//     "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
// };

const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "700"] });



export default function RootLayout({ children }) {

  return (
    <html lang="en" >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3864YFJZRV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
               window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3864YFJZRV');
            `,
          }} />
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WSQGHKPJ');`}} />
        <meta name="google-site-verification" content="61LbG4ASq8urm_ZEHIr2jlNt13kGnN8n921g2EJF5po" />
        <script dangerouslySetInnerHTML={{
          __html: ` !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '452806670914263');
          fbq('track', 'PageView');`}} />
        <noscript><img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=452806670914263&ev=PageView&noscript=1"
        /></noscript>
        <title>{"Professional CV Templates for Perfect CVs on Genies CV Maker"}</title>
        <meta name="description" content={"Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role."} />
        <link rel="canonical" href="https://geniescareerhub.com" />
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSQGHKPJ"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
      </head>
      <body className={inter.className}>
        <ToastContainer />
        {/* <VerifyUser /> */}
        {children}
      </body>
    </html>
  );
}
