import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { joinTeamAPI } from "../../lib/api/team";
import { useSelector } from "../../store"
import { squadActions } from "../../store/squad/squad";
import Button from "../common/Button";
import { useRouter } from "next/router";
import TeamSquad from "./TeamSquad";

const TeamDetailHeader = () => {
    const user = useSelector((state) => state.user);
    const team = useSelector((state) => state.team.detail);
    const squads = useSelector((state) => state.squad.squad);
    const dispatch = useDispatch();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["개요", "스쿼드", "일정", "결과", "팀관리"];

    const [isRegisteredPlayer, setIsRegisteredPlayer] = useState<boolean>(false);
    const [isConfirmedPlayer, setIsConfirmedPlayer] = useState<boolean>(false);

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

    const findPlayerInTeam = (id: string) => {
        let findResult = false;
        squads.forEach((squad) => {
            if (squad.userId._id === id) {
                findResult = true;
            }
        });
        setIsRegisteredPlayer(findResult);
    }

    const findConfirmedPlayer = (id: string) => {
        let confirmed = false;
        squads.forEach((squad) => {
            if (squad.userId._id === id && squad.confirmed === true) {
                confirmed = true;
            }
        });
        setIsConfirmedPlayer(confirmed);
    }

    const handleTabClick = (index: number) => {
        console.log("index===", index);
        console.log("ActiveTab====1", activeTab);
        setActiveTab(index);
        console.log("ActiveTab====2", activeTab);
    };

    useEffect(() => {
        findPlayerInTeam(user._id);
        findConfirmedPlayer(user._id);
        handleTabClick(activeTab);
    }, [activeTab]);

    return (
        <div className="flex">
            <div>
                <ul className="flex justify-center items-center my-4">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            onClick={() => handleTabClick(index)}
                            className={`cursor-pointer py-3 px-4 rounded transtion ${
                                activeTab === index ? 'bg-green-500 text-white' : 'text-gray-500'
                            }`}
                            
                        >
                            {/* {tab} */}
                            {/* {activeTab === index ? (
                                <>
                                    {activeTab === 0 && (
                                        <Link href={`/team/${team?._id}/`}>
                                            {tab}
                                        </Link>
                                    )}
                                    {activeTab === 1 && (
                                        <Link href={`/team/${team?._id}/squad`}>
                                            {tab}
                                        </Link>
                                    )}
                                    {activeTab === 2 && (
                                        <Link href={`/team/${team?._id}/fixture`}>
                                            {tab}
                                        </Link>
                                    )}
                                    {activeTab === 3 && (
                                        <Link href={`/team/${team?._id}/result`}>
                                            {tab}
                                        </Link>
                                    )}
                                    {activeTab === 4 && (
                                        <Link href={`/team/${team?._id}/teamManage`}>
                                            {tab}
                                        </Link>
                                    )}
                                </>
                            ) : (
                                tab
                            )} */}
                            {activeTab === 0 && (
                                <Link href={`/team/${team?._id}/`}>
                                    {tab}
                                </Link>
                            )}
                            {activeTab === 1 && (
                                <Link href={`/team/${team?._id}/squad`}>
                                    {tab}
                                </Link>
                            )}
                            {activeTab === 2 && (
                                <Link href={`/team/${team?._id}/fixture`}>
                                    {tab}
                                </Link>
                            )}
                            {activeTab === 3 && (
                                <Link href={`/team/${team?._id}/result`}>
                                    {tab}
                                </Link>
                            )}
                            {activeTab === 4 && (
                                <Link href={`/team/${team?._id}/teamManage`}>
                                    {tab}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        // <div className="h-64 bg-gray-100">
        //     <div className="">
        //         <Image 
        //             src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team?.emblem}`}
        //             width={200}
        //             height={200}
        //             alt="img"
        //         />
        //         {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team?.emblem}`} alt="emblem" /> */}
        //     </div>
        //     {/* {squads.map((squad) => {
        //         const matchingPlayer = squads.find((squad) => !user.playerId && squad.userId._id !== user._id);
        //         const notRegisteredPlayer = !user.playerId;
        //         return (
        //             <div>
        //                 {notRegisteredPlayer ? (
        //                     <Button disabled disabledMessage="선수등록을 완료해주세요.">입단신청</Button>
        //                 ) : null}
        //             </div>
        //         )
        //         if(!user.playerId && squad.userId._id !== user._id) {
        //             return (
        //                 <div>
        //                     <Button disabled disabledMessage="선수등록을 완료해주세요.">입단신청</Button>
        //                 </div>
        //             )
        //         }
        //     })} */}
        //     {!isRegisteredPlayer && !user.playerId ? (
        //         <div>
        //             <Button disabled disabledMessage="선수등록을 완료해주세요.">입단신청</Button>
        //         </div>
        //     ) : !isRegisteredPlayer && user.playerId ? (
        //         <div>
        //             <Button onClick={requestPermission}>입단신청</Button>
        //         </div>
        //     ) : isRegisteredPlayer && isConfirmedPlayer ? (
        //         <div>
        //             가입된 팀
        //         </div>
        //     ) : isRegisteredPlayer && !isConfirmedPlayer ? (
        //         <div>
        //             가입승인을 기다리고 있습니다.
        //         </div>
        //     ) : <div>
        //         </div>
        //     }
        //     <div className="flex space-x-2">
        //         <div className="py-2 hover:cursor-pointer hover:text-red-300">
        //             <Link href={`/team/${team?._id}/`}>
        //                 <h2>개요</h2>
        //             </Link>
        //         </div>
        //         <div className="py-2 hover:cursor-pointer hover:text-red-300">
        //             <Link href={`/team/${team?._id}/squad`}>
        //                 <h2>스쿼드</h2>
        //             </Link>
        //         </div>
        //         <div className="py-2 hover:cursor-pointer hover:text-red-300">
        //             <Link href={`/team/${team?._id}/fixture`}>
        //                 <h2>일정</h2>
        //             </Link>
        //         </div>
        //         <div className="py-2 hover:cursor-pointer hover:text-red-300">
        //             <Link href={`/team/${team?._id}/result`}>
        //                 <h2>결과</h2>
        //             </Link>
        //         </div>
        //         {/* <div className="py-2 hover:cursor-pointer hover:text-red-300">
        //             <Link href={`/team/${team?._id}/history`}>
        //                 <h2>시즌역사</h2>
        //             </Link>
        //         </div> */}
        //         {team?.owner === user._id && (
        //             <div className="py-2 hover:cursor-pointer hover:text-red-300">
        //                 <Link href={`/team/${team?._id}/teamManage`}>
        //                     <h2>팀관리</h2>
        //                 </Link>
        //             </div>
        //         )}
        //     </div>
        // </div>
    )
}

export default TeamDetailHeader;