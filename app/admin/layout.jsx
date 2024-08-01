import Header from "./(AdminSidebar)/header"
import HeaderMobile from "./(AdminSidebar)/header-mobile"
import SideNav from "./(AdminSidebar)/Sidebar"




const Layout = ({ children }) => {
    return (
        <main className="resume_dashboard" >
            <div className="resume_dashboard_container">
                <div className="wrapper">
                    <SideNav/>
                    <Header/>
                    <HeaderMobile/>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default Layout