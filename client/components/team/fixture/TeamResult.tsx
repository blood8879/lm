import Link from "next/link";
import React from "react";
import { useSelector } from "../../../store";
import TeamDetail from "../TeamDetail";
import moment from "moment";
import 'moment/locale/ko';

const TeamResult: React.FC = () => {
    const results = useSelector((state) => state.fixture.result);
    const team = useSelector((state) => state.team.detail);

    return (
        <TeamDetail>
            <div>
                {results.map((result, key) => (
                    <ul key={result._id}>
                        <h2 className="text-xl bold">{moment(result.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                        <Link href={`/team/${team}/result/${result._id}`}>
                            <li className="center space-x-2 hover:bg-gray-300">
                                <span className="text-bold text-red-500">{result.homeTeam.name}</span> 
                                <span className="border-2">{result.home_goals}</span>
                                <span className="border-2">{result.away_goals}</span>
                                <span className="text-bold text-blue-500">{result.awayTeam.name}</span>
                                <span>{result.venue}</span>
                            </li>
                        </Link>
                        {/* <span>{fixture.venue}</span> */}
                    </ul>
                    // <div key={fixture._id}>
                    //     <Link href={`/team/${team}/fixture/${fixture._id}`}>
                    //         <h2 className="w-4 center">{fixture.homeTeam.name}</h2>
                    //         <p>vs</p>
                    //         <h2 className="w-4 center text-blue-500">{fixture.awayTeam.name}</h2>
                    //     </Link>
                    //     {/* <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/emblem/${team.emblem}`} alt="emblem" /> */}
                    // </div>
                ))}
            </div>
        </TeamDetail>
    )
}

export default TeamResult;