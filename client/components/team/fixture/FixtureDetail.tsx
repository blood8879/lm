import Link from "next/link";
import React from "react";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import TeamDetail from "../TeamDetail";

const FixtureDetail: React.FC = () => {
    const currentTeam = useSelector((state) => state.team.detail);
    const thisMatch = useSelector((state) => state.fixture.detailFixture);
    const result = useSelector((state) => state.fixture.result);
    // console.log("match===", match);
    const drawMatches = result.filter(match => match.home_goals === match.away_goals);
    const homeTeamWonAtHome = result.filter(match => match.homeTeam._id === currentTeam!._id && match.home_goals > match.away_goals).length;
    const homeTeamWonAtAway = result.filter(match => match.awayTeam._id === currentTeam!._id && match.away_goals > match.home_goals).length;
    const awayTeamWonAtHome = result.filter(match => match.homeTeam._id !== currentTeam!._id && match.home_goals > match.away_goals).length;
    const awayTeamWonAtAway = result.filter(match => match.awayTeam._id !== currentTeam!._id && match.away_goals > match.home_goals).length;

    return (
        <>
            <div>
                <Link href="/team/registerResult"><Button>결과등록</Button></Link>
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
                        <h2 className="text-pink-500 text-2xl text-bold">{result.length}</h2>
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
                            {awayTeamWonAtHome}
                            <p>Home</p>
                        </div>
                        <div className="flex space-x-2">
                            {awayTeamWonAtAway}
                            <p>Away</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>Recent Meetings(최근상대전적)</h2>
            </div>
            <div>
                <h2>Form Guide(최근전적)</h2>
                <div className="flex space-x-4">
                    <div>
                        <h2>{thisMatch.homeTeam.name}</h2>
                    </div>
                    <div>
                        <h2>{thisMatch.awayTeam.name}</h2>
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