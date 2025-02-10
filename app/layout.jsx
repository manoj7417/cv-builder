/** @format */

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import { Slide } from "react-toastify";
import SessionProviderWrapper from "./components/SessionProviderWrapper/SessionProviderWrapper"; // Import the wrapper

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Professional CV Templates for Perfect CV on Genies CV Maker",
  description:
    "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
  verification: {
    google: "google7a709d33f5d56c51",
  },
  openGraph: {
    url: "/",
    type: "website",
    title: "Professional CV Templates for Perfect CV on Genies CV Maker",
    description:
      "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
    images: [
      {
        url: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
        alt: "Genies Career Hub Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    domain: "geniescareerhub.com",
    url: "/",
    title: "Professional CV Templates for Perfect CV on Genies CV Maker",
    description:
      "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
    image: "/_next/image?url=%2Fbeta-logo.png&w=128&q=75",
  },
  alternates: {
    canonical: "https://www.geniescareerhub.com",
  },
  headers: {
    'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KJ9G6JTK');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Remove duplicate GTM script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SCXB98QM5R');`,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "otnsy3oksi");
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1272392460689856');
fbq('track', 'PageView')`,
          }}></script>
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-KJ9G6JTK'
            height='0'
            width='0'
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: 'none' }}
            src='https://www.facebook.com/tr?id=1272392460689856&ev=PageView&noscript=1'
          />
        </noscript>

        <SessionProviderWrapper>
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            transition={Slide}
          />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

// Add this to prevent SSR issues
export const dynamic = "force-dynamic";
