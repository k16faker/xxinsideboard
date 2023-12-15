

import { Outlet } from "react-router-dom";
import MainNav from "../components/header/MainNav";


const RootPage = () => {
    return (
        <div>
            <MainNav />
            <Outlet />
        </div>
    );
}

export default RootPage;