// import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "Professional CV Templates for Perfect CVs on Genies CV Maker",
  description:
    "Find best Curriculum Vitae Template and Career Assistance on top CV Maker and CV Library Website, Genies Career Hub and create your CV best fit for Job Role.",
};

const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
      </body>
    </html>
  );
}
