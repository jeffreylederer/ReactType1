import Header from "./Header.tsx"
import Footer from "./Footer.tsx"
import { ReactNode } from "react";

const Layout = ({ children }: { children?: ReactNode }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;