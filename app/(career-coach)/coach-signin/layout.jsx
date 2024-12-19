/** @format */

export const metadata = {
  title: "Sign In on your Coach dashboard: Genies Career Hub",
  description:
    " Log In on your Career Coach profile through the Coach Sign-In page on the Genies Career Hub using the registration credentials and get started",
  alternates: {
    canonical: "https://www.geniescareerhub.com/coach-signin",
  },
};
const Layout = ({ children }) => {
  return (
    <main className='resume_dashboard'>
      <div className='resume_dashboard_container'>
        <div className='wrapper'>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
