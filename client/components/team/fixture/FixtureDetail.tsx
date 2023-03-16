import moment from "moment";
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
                fixtureId: thisMatch._id,
                teamId: currentTeam?._id,
                playerId: user._id
            }

            // redux-store 전달용 type 선언
            // let updatedFixtureBody : FixtureType;
            if(thisMatch.homeTeam._id === currentTeam?._id) {
                updatedFixtureBody = {
                    ...thisMatch,
                    homeSquad: [ ...thisMatch.homeSquad, user._id ],
                }
            } else if(thisMatch.awayTeam._id === currentTeam?._id) {
                updatedFixtureBody = {
                    ...thisMatch,
                    awaySquad: [ ...thisMatch.awaySquad, user._id ]
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

    const noAttendMatch = () => {
        console.log("NoAttendence.");
    }

    return (
        <>
            <div>
                <Link href="/team/registerResult"><Button>결과등록</Button></Link>
                {confirmedPlayer && (
                    <div className="flex space-x-2">
                        <Button type="submit" width="50" onClick={onAttendMatch}>참석</Button>
                        <Button type="submit" width="50" onClick={noAttendMatch}>불참석</Button>
                    </div>
                )}
            </div>
            <div>
                <h2>Head-to-Head</h2>
                <div className="flex space-x-4">
                    <div>
                        <h2>{thisMatch.homeTeam.name}</h2>
                        <div className="flex space-x-2">
                            {homeTeamWonAtHome+homeTeamWonAtAway}
                            <p>Total Wins</p>
                        </div>
                        <div className="flex space-x-2">
                            {homeTeamWonAtHome}
                            <p>Home</p>
                        </div>
                        <div className="flex space-x-2">
                            {homeTeamWonAtAway}
                            <p>Away</p>
                        </div>
                    </div>
                    <div>
                        <p>played</p>
                        <h2 className="text-pink-500 text-2xl text-bold">{totalPlayed}</h2>
                        
                        <p>draws</p>
                        <h2>{drawMatches.length}</h2>
                    </div>
                    <div>
                        <h2>{thisMatch.awayTeam.name}</h2>
                        <div className="flex space-x-2">
                            <p>Total Wins</p>
                            {awayTeamWonAtHome+awayTeamWonAtAway}
                        </div>
                        <div className="flex space-x-2">
                            <p>Home</p>
                            {awayTeamWonAtHome}
                        </div>
                        <div className="flex space-x-2">
                            <p>Away</p>
                            {awayTeamWonAtAway}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>Recent Meetings(최근상대전적)</h2>
                <div>
                    {HeadToHeadData.map((result, key) => (
                    <ul key={result._id}>
                        <h2 className="text-xl bold">{moment(result.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                        <Link href={`/team/${currentTeam?._id}/result/${result._id}`}>
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
            </div>
            {/* <div>
                <h2>Season So Far(시즌기록)</h2>
            </div> */}
        </>
    )
}

export default FixtureDetail