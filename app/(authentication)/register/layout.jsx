export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Register Yourself With Genies Career Hub Account",
  description:
    " Create your professional CV online. Or, get your CV ATS optimized at a click. Register your account with the Genies Career Hub Account using simple steps.",
  alternates: {
    canonical: "https://www.geniescareerhub.com/register",
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <main>
        <div>{children}</div>
      </main>
    </>
  );
};

export default Layout;
