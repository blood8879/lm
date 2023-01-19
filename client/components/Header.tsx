import Link from "next/link";
import React from "react";
import { useSelector } from "../store";
import HeaderAuths from "./HeaderAuths";
import HeaderProfile from "./HeaderProfile";


const Header: React.FC = () => {
    const isLogged = useSelector((state) => state.user.isLogged);

    return (
        <div className="mx-auto px-8 pt-4 h-16 justify-space-between item-center position:sticky">
            <Link href="/">
                TEAM SG
            </Link>
            <div className="float-right">
                {!isLogged && <HeaderAuths />}
                {isLogged && <HeaderProfile />}
            </div>
            
        </div>
    )
}

export default React.memo(Header, () => false);