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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="61LbG4ASq8urm_ZEHIr2jlNt13kGnN8n921g2EJF5po"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HVD8Y7BEDE"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HVD8Y7BEDE');
          `,
          }}
        />
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
        {/*  Hotjar Tracking Code for https://www.geniescareerhub.com/ */}
        <script
          dangerouslySetInnerHTML={{
            __html: ` (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5279200,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`,
          }}
        ></script>
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WJL6BJT6"
              height="0"
              width="0"
            ></iframe>
          </noscript>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
