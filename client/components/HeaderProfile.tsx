import { useState } from "react"
import { useDispatch } from "react-redux";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import { useSelector } from "../store";

const HeaderProfile: React.FC = () => {
    const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
    const userProfileImage = useSelector((state) => state.user.profileImage);
    const playerId = useSelector((state) => state.user.playerId);

    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await logoutAPI();
            dispatch(userActions.initUser());
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                if(isUsermenuOpened) {
                    setIsUsermenuOpened(false);
                }
            }}
        >
            <button
                className="flex h-10 border w-20 rounded-full hover:shadow-md"
                type="button"
                onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
            >
                {userProfileImage ? (
                    <img 
                        src={`http://localhost:4000/public/profileImages/${userProfileImage}`}
                        className="w-8 h-8 mx-4 my-1 rounded-full"
                        alt=""
                    />
                ) : (
                    <img 
                        src="https://www.gravatar.com/avatar/0000?d=mp&f=y"
                        className="w-8 h-8 mx-4 my-1 rounded-full"
                        alt=""
                    />
                )}
            </button>
            {isUsermenuOpened && (
                <ul>
                    <Link href="/">
                        <li>정보 수정</li>
                    </Link>
                    <Link href="/team/registerTeam">
                        <li>팀 등록</li>
                    </Link>
                    {
                        !playerId && (
                            <Link href="/player/registerPlayer">
                                <li>선수 프로필 등록</li>
                            </Link>
                        )
                    }
                    <li className="cursor-pointer" role="presentation" onClick={logout}>
                        로그아웃
                    </li>
                </ul>
            )}
        </OutsideClickHandler>
    )
}

export default HeaderProfile;