export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
  title: "Sign In To Your Genies Career Hub Account",
  description:
    "Revamping your CV or optimizing it as per ATS has become easy with the Genies Career Hub interface. Sign in with Genies Career Hub Account in easy steps",
  alternates: {
    canonical: "https://www.geniescareerhub.com/login",
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
