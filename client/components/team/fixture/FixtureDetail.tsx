import moment from "moment";
import Link from "next/link";
import React from "react";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import TeamDetail from "../TeamDetail";

const FixtureDetail: React.FC = () => {
    const currentTeam = useSelector((state) => state.team.detail);
    const thisMatch = useSelector((state) => state.fixture.detailFixture);
    const result = useSelector((state) => state.fixture.result);
    
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

    return (
        <>
            <div>
                <Link href="/team/registerResult"><Button>????????????</Button></Link>
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
                <h2>Recent Meetings(??????????????????)</h2>
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
                <h2>Form Guide(????????????)</h2>
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
                <h2>Season So Far(????????????)</h2>
            </div> */}
        </>
    )
}

export default FixtureDetail