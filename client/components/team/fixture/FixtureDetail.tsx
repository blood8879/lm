import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { attendMatchAPI } from "../../../lib/api/fixture";
import { useSelector } from "../../../store";
import { fixtureActions } from "../../../store/fixture/fixture";
import { FixtureType } from "../../../types/fixture";
import Button from "../../common/Button";

const FixtureDetail: React.FC = () => {
    const currentTeam = useSelector((state) => state.team.detail);
    const thisMatch = useSelector((state) => state.fixture.detailFixture);
    const result = useSelector((state) => state.fixture.result);
    const squads = useSelector((state) => state.squad.squad);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [confirmedPlayer, setIsConfirmedPlayer] = useState(false);
    
    const HeadToHeadData = result.filter(match => {
        const homeTeamName = match.homeTeam.name;
        const awayTeamName = match.awayTeam.name;

        return (homeTeamName === thisMatch.homeTeam.name && awayTeamName === thisMatch.awayTeam.name) ||
            (homeTeamName === thisMatch.awayTeam.name && awayTeamName === thisMatch.homeTeam.name) 
    })

    const HomeTeamData = result.filter(match => {
        return match.homeTeam.name === thisMatch.homeTeam.name || match.awayTeam.name === thisMatch.homeTeam.name
    })

    const AwayTeamData = result.filter(match => {
        return match.homeTeam.name === thisMatch.awayTeam.name || match.awayTeam.name === thisMatch.awayTeam.name
    })
    // console.log("match===", filterData);
    const drawMatches = HeadToHeadData.filter(match => match.home_goals === match.away_goals);
    const totalPlayed = HeadToHeadData.length;
    const homeTeamWonAtHome = HeadToHeadData.filter(match => (match.homeTeam._id === thisMatch.homeTeam._id) && match.home_goals > match.away_goals).length;
    const homeTeamWonAtAway = HeadToHeadData.filter(match => (match.awayTeam._id === thisMatch.homeTeam._id) && match.away_goals > match.home_goals).length;
    const awayTeamWonAtHome = HeadToHeadData.filter(match => (match.homeTeam._id === thisMatch.awayTeam._id) && match.home_goals > match.away_goals).length;
    const awayTeamWonAtAway = HeadToHeadData.filter(match => (match.awayTeam._id === thisMatch.awayTeam._id) && match.away_goals > match.home_goals).length;

    // 사용자가 해당 팀 소속인지 확인
    const findConfirmedPlayer = (id: string) => {
        let confirmed = false;
        squads.forEach((squad) => {
            if (squad.userId._id === id && squad.confirmed === true) {
                confirmed = true;
            }
        });
        setIsConfirmedPlayer(confirmed);
    }

    useEffect(() => {
        findConfirmedPlayer(user._id);
    }, [])

    // redux-store 전달용 type 선언
    let updatedFixtureBody : FixtureType;

    const onAttendMatch = async() => {
        try {
            const body = {
                type: "Attend",
                fixtureId: thisMatch._id,
                teamId: currentTeam?._id,
                playerId: user._id
            }

            // redux-store 전달용 type 선언
            // let updatedFixtureBody : FixtureType;
            if(thisMatch.homeTeam._id === currentTeam?._id) {
                const updatedHomeAbsent = thisMatch.homeAbsent.filter((id: any) => id !== user._id);
                updatedFixtureBody = {
                    ...thisMatch,
                    homeSquad: [ ...thisMatch.homeSquad, user._id ],
                    homeAbsent: updatedHomeAbsent
                }
            } else if(thisMatch.awayTeam._id === currentTeam?._id) {
                const updatedAwayAbsent = thisMatch.awayAbsent.filter((id: any) => id !== user._id);
                updatedFixtureBody = {
                    ...thisMatch,
                    awaySquad: [ ...thisMatch.awaySquad, user._id ],
                    awayAbsent: updatedAwayAbsent
                }
            }
            
            console.log("AttendenceBody===", body);
            console.log("updatedFixture===", updatedFixtureBody);
            const promises = [
                dispatch(fixtureActions.updateDetailFixture(updatedFixtureBody)),
                await attendMatchAPI(body)
            ];

            await Promise.all(promises);
        } catch(e) {
            console.log(e);
        }
    }

    const noAttendMatch = async() => {
        try {
            const body = {
                type: "noAttend",
                fixtureId: thisMatch._id,
                teamId: currentTeam?._id,
                playerId: user._id
            }

            // redux-store 전달용 type 선언
            // let updatedFixtureBody : FixtureType;
            if(thisMatch.homeTeam._id === currentTeam?._id) {
                const updatedHomeSquad = thisMatch.homeSquad.filter((id: any) => id !== user._id);
                updatedFixtureBody = {
                    ...thisMatch,
                    homeSquad: updatedHomeSquad,
                    homeAbsent: [ ...thisMatch.homeAbsent, user._id ]
                }
            } else if(thisMatch.awayTeam._id === currentTeam?._id) {
                const updatedAwaySquad = thisMatch.awaySquad.filter((id:any) => id !== user._id);
                updatedFixtureBody = {
                    ...thisMatch,
                    awaySquad: updatedAwaySquad,
                    awayAbsent: [ ...thisMatch.awayAbsent, user._id ]
                }
            }
            
            console.log("AttendenceBody===", body);
            console.log("updatedFixture===", updatedFixtureBody);
            const promises = [
                dispatch(fixtureActions.updateDetailFixture(updatedFixtureBody)),
                await attendMatchAPI(body)
            ];

            await Promise.all(promises);
        } catch(e) {
            console.log(e);
        }
        console.log("NoAttendence.");
    }

    return (
        <>
            <div>
                <Link href="/team/registerResult"><Button>결과등록</Button></Link>
                {confirmedPlayer && (
                    <div className="flex space-x-2">
                        {thisMatch.homeSquad.includes(user._id) || thisMatch.awaySquad.includes(user._id) ? (
                            <>
                                <Button type="submit" width="50" disabled>참석</Button>
                                <Button type="submit" width="50" onClick={noAttendMatch}>불참석</Button>
                            </>
                        ) : thisMatch.homeAbsent.includes(user._id) || thisMatch.awayAbsent.includes(user._id) ? (
                            <>
                                <Button type="submit" width="50" onClick={onAttendMatch}>참석</Button>
                                <Button type="submit" width="50" disabled>불참석</Button>
                            </>
                        ) : (
                            <>
                                <Button type="submit" width="50" onClick={onAttendMatch}>참석</Button>
                                <Button type="submit" width="50" onClick={noAttendMatch}>불참석</Button>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="container mx-auto px-4">
                <h2 className="font-bold text-2xl text-center">Head-to-Head</h2>
                <div className="container flex mx-auto">
                    <div className="w-[50%]">
                        <div className="flex justify-end my-8">
                            <span className="flex justify-end font-bold mt-2">{thisMatch.homeTeam.name}</span>
                            <span><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${thisMatch.homeTeam.emblem}`} width={50} height={50} alt="img" /></span>
                        </div>
                        <div className="flex justify-end">
                            <p className="mr-2 font-bold">{homeTeamWonAtHome+homeTeamWonAtAway}</p>
                            <p className="text-xs mt-1 w-16 justify-end flex">Total Wins</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="mr-2 font-bold">{homeTeamWonAtHome}</p>
                            <p className="text-xs mt-1 w-16 justify-end flex">Home</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="mr-2 font-bold">{homeTeamWonAtAway}</p>
                            <p className="text-xs mt-1 w-16 justify-end flex">Away</p>
                        </div>
                    </div>
                    <div className="py-16 px-24">
                        <p className="text-xs">played</p>
                        <p className="justify-center text-7xl font-bold flex text-pink-500">{totalPlayed}</p>
                        {/* <p className="text-xs">draws</p> */}
                        <div className="flex justify-center">
                            <p className="text-xs">draws</p>
                            <p className="text-xs font-bold">&nbsp;{drawMatches.length}</p>
                        </div>
                        {/* <p className="justify-center flex text-sm">{drawMatches.length}</p> */}
                    </div>
                    <div className="w-[50%]">
                        <div className="flex justify-start my-8">
                            <span><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${thisMatch.awayTeam.emblem}`} width={50} height={50} alt="img" /></span>
                            <span className="flex justify-start font-bold mt-2">{thisMatch.awayTeam.name}</span>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs mt-1 w-16 justify-start flex">Total Wins</p>
                            <p className="ml-2 font-bold">{awayTeamWonAtHome+awayTeamWonAtAway}</p>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs mt-1 w-16 justify-start flex">Home</p>
                            <p className="ml-2 font-bold">{awayTeamWonAtHome}</p>
                        </div>
                        <div className="flex justify-start">
                            <p className="text-xs mt-1 w-16 justify-start flex">Away</p>
                            <p className="ml-2 font-bold">{awayTeamWonAtAway}</p>
                        </div>
                    </div>
                </div>
                <div className="border-b-4 mt-2"></div>
                <div className="container mx-auto">
                    <h2 className="font-bold text-2xl justify-center flex my-6">Recent Meetings</h2>
                    <div>
                        {HeadToHeadData.slice(0, 5).map((result, key) => (
                        <ul key={result._id}>
                            <h2 className="font-light justify-center flex">{moment(result.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                            <h2 className="text-xs font-light text-gray-500 justify-center flex">{result.venue}</h2>
                            <Link href={`/team/${currentTeam?._id}/result/${result._id}`}>
                                <li className="flex justify-center space-x-1 ">
                                    <div className="w-[35%] flex">
                                        <div className="w-[50%] flex justify-end">
                                            <span className="font-bold my-2 py-2">{result.homeTeam.name}</span>
                                            <span className="mr-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${result.homeTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                        </div>
                                        <div className="flex">
                                            <span className="grid place-items-center my-3 w-8 h-8 bg-[#37003c] text-white font-bold">{result.home_goals}</span>
                                            <div className="w-[1px]"></div>
                                            <span className="grid place-items-center my-3 w-8 h-8 bg-[#37003c] text-white font-bold">{result.away_goals}</span>
                                        </div>
                                        <div className="w-[50%] flex">
                                            <span className="ml-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${result.awayTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                            <span className="font-bold my-2 pl-2 py-2">{result.awayTeam.name}</span>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                        ))}
                    </div>
                </div>
                <div className="border-b-4 mt-4"></div>
                <div className="container mx-auto">
                    <h2 className="font-bold text-2xl justify-center flex my-6">Form Guide</h2>
                    <div>
                        <div className="flex">
                            <div className="w-[50%] justify-end">
                                <div className="flex justify-end">
                                    <span className="font-bold my-2 py-2">{thisMatch.homeTeam.name}</span> 
                                    <span className="mr-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${thisMatch.homeTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                </div>
                                <div>
                                    {HomeTeamData.slice(0, 5).map((result, key) => (
                                        <ul key={result._id}>
                                            <Link href={`/team/${thisMatch.homeTeam?._id}/result/${result._id}`}>
                                                <li className="center space-x-2 hover:text-red-500 flex justify-end">
                                                    {result.homeTeam.name === thisMatch.homeTeam.name ? (
                                                        <>
                                                            <span><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${result.awayTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                                            <span>{result.home_goals}-{result.away_goals}&nbsp;v&nbsp;{result.awayTeam.name}</span>
                                                        </>
                                                    ) : result.awayTeam.name === thisMatch.homeTeam.name ? (
                                                        <>
                                                            <span><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${result.homeTeam.emblem}`} width={50} height={50} alt="img" /></span>
                                                            <span>{result.home_goals}-{result.away_goals}&nbsp;v&nbsp;{result.homeTeam.name}</span>
                                                        </>
                                                    ) : (
                                                        <h2></h2>
                                                    )}
                                                    {/* {result.homeTeam.name === thisMatch.homeTeam.name ? (

                                                    )} */}
                                                    {result.homeTeam.name === thisMatch.homeTeam.name ? (
                                                        <span className="font-bold">H</span>
                                                    ) : (
                                                        <span className="font-bold">A</span>
                                                    )}
                                                    {/* <span className="text-bold text-red-500">{result.homeTeam.name}</span> 
                                                    <span className="border-2">{result.home_goals}</span>
                                                    <span className="border-2">{result.away_goals}</span>
                                                    <span className="text-bold text-blue-500">{result.awayTeam.name}</span> */}
                                                </li>
                                            </Link>
                                        </ul>
                                        ))}
                                    </div>
                            </div>
                            <div className="flex w-4">

                            </div>
                            <div className="w-[50%] flex justify-start">
                                <span className="font-bold my-2 py-2">{thisMatch.awayTeam.name}</span> 
                                <span className="mr-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${thisMatch.awayTeam.emblem}`} width={50} height={50} alt="img" /></span>
                            </div>
                        </div>
                        {/* <div className="w-[50%] justify-end">
                            <div className="flex justify-end">
                                <span className="font-bold my-2 py-2">{thisMatch.homeTeam.name}</span> 
                                <span className="mr-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${thisMatch.homeTeam.emblem}`} width={50} height={50} alt="img" /></span>
                            </div>
                        </div>
                        <div className="flex w-4">

                        </div>
                        <div className="w-[50%] flex justify-start">
                            <span className="font-bold my-2 py-2">{thisMatch.awayTeam.name}</span> 
                            <span className="mr-2 grid place-items-center"><Image className="rounded-full grid place-items-center w-10 h-10" src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${thisMatch.awayTeam.emblem}`} width={50} height={50} alt="img" /></span>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <div>
                <h2>Form Guide(최근전적)</h2>
                <div className="flex space-x-4">
                    <div>
                        <h2>{thisMatch.homeTeam.name}</h2>
                        <div>
                        {HomeTeamData.slice(0, 5).map((result, key) => (
                            <ul key={result._id}>
                                <h2 className="text-xl bold">{moment(result.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                                <Link href={`/team/${thisMatch.homeTeam?._id}/result/${result._id}`}>
                                    <li className="center space-x-2 hover:bg-gray-300">
                                        <span className="text-bold text-red-500">{result.homeTeam.name}</span> 
                                        <span className="border-2">{result.home_goals}</span>
                                        <span className="border-2">{result.away_goals}</span>
                                        <span className="text-bold text-blue-500">{result.awayTeam.name}</span>
                                        <span>{result.venue}</span>
                                    </li>
                                </Link>
                            </ul>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>{thisMatch.awayTeam.name}</h2>
                        <div>
                        {AwayTeamData.slice(0, 5).map((result, key) => (
                            <ul key={result._id}>
                                <h2 className="text-xl bold">{moment(result.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                                <Link href={`/team/${thisMatch.awayTeam?._id}/result/${result._id}`}>
                                    <li className="center space-x-2 hover:bg-gray-300">
                                        <span className="text-bold text-red-500">{result.homeTeam.name}</span> 
                                        <span className="border-2">{result.home_goals}</span>
                                        <span className="border-2">{result.away_goals}</span>
                                        <span className="text-bold text-blue-500">{result.awayTeam.name}</span>
                                        <span>{result.venue}</span>
                                    </li>
                                </Link>
                            </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div>
                <h2>Season So Far(시즌기록)</h2>
            </div> */}
        </>
    )
}

export default FixtureDetail