export const metadata = {
  metadataBase: new URL("https://www.geniescareerhub.com"),
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
