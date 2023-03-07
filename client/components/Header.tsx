import Link from "next/link";
import React from "react";
import { useSelector } from "../store";
import HeaderAuths from "./HeaderAuths";
import HeaderProfile from "./HeaderProfile";


const Header: React.FC = () => {
    const isLogged = useSelector((state) => state.user.isLogged);

    return (
        <div className="flex">
            <div className="px-8 pt-4 h-16 w-[80%] justify-space-between item-center position:sticky flex">
                <div className="flex">
                    <Link href="/">
                        Match Archive
                    </Link>
                    <div className="w-11" />
                    <Link href="/team">
                        List
                    </Link>
                </div>
            </div>
            <div className="h-16 px-8 pt-4">
                {!isLogged && <HeaderAuths />}
                {isLogged && <HeaderProfile />}
            </div>
        </div>
        

    )
}

export default React.memo(Header, () => false);