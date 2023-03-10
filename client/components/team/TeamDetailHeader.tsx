import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { joinTeamAPI } from "../../lib/api/team";
import { useSelector } from "../../store"
import { squadActions } from "../../store/squad/squad";
import Button from "../common/Button";

const TeamDetailHeader = () => {
    const user = useSelector((state) => state.user);
    const team = useSelector((state) => state.team.detail);
    const dispatch = useDispatch();

    const requestPermission = async() => {
        // console.log("클릭이벤트");
        const userId = user._id;
        const teamId = team!._id;
        const backNo = null;
        const position = ["GK"];
        const userInfo = user;
        
        try {
            const joinTeamBody = {
                userId,
                teamId,
                backNo,
                position
            }

            const dispatchJoinTeamBody = {
                _id: userId,
                teamId: teamId,
                userId: userInfo,
                backNo: null,
                position: position,
                confirmed: false
            }
            console.log("joinTeamBody===", joinTeamBody);
            await joinTeamAPI(teamId, joinTeamBody);
            dispatch(squadActions.setUpdateSquad(dispatchJoinTeamBody));
            alert('가입되었습니다.');
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="h-64 bg-gray-100">
            <div className="">
                <Image 
                    src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team?.emblem}`}
                    width={200}
                    height={200}
                    alt="img"
                />
                {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team?.emblem}`} alt="emblem" /> */}
            </div>
            {!user.playerId ? (
                <div>
                    <Button disabled disabledMessage="선수등록을 완료해주세요.">입단신청</Button>
                </div>
            ) : (
                <div>
                    <Button onClick={requestPermission}>입단신청</Button>
                </div>
            )}
            
            <div className="flex space-x-2">
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/`}>
                        <h2>개요</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/squad`}>
                        <h2>스쿼드</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/fixture`}>
                        <h2>일정</h2>
                    </Link>
                </div>
                <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/result`}>
                        <h2>결과</h2>
                    </Link>
                </div>
                {/* <div className="py-2 hover:cursor-pointer hover:text-red-300">
                    <Link href={`/team/${team?._id}/history`}>
                        <h2>시즌역사</h2>
                    </Link>
                </div> */}
                {team?.owner === user._id && (
                    <div className="py-2 hover:cursor-pointer hover:text-red-300">
                        <Link href={`/team/${team?._id}/teamManage`}>
                            <h2>팀관리</h2>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamDetailHeader;