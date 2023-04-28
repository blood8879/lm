import Link from "next/link";
import React from "react";
import { useSelector } from "../../../store";
import TeamDetail from "../TeamDetail";
import moment from "moment";
import 'moment/locale/ko';
import Image from "next/image";

const TeamResult: React.FC = () => {
    const results = useSelector((state) => state.fixture.result);
    const team = useSelector((state) => state.team.detail);
    
    return (
        <TeamDetail>
            <div className="h-64 bg-gradient-to-r from-gray-900 to-gray-100">
                <div className="mx-auto flex py-24 px-4 container">
                    <h1 className="text-white text-6xl font-bold">Results</h1>
                </div>
            </div>
            <div className="container mx-auto px-4">
                {results.map((result, key) => {
                    // const opponent = if(team?._id === result._id) {
                    //     return 
                    // }
                    return (
                        (
                            <ul key={result._id}>
                                <h2 className="text-xl font-bold mt-4">{moment(result.matchDay).add(-9, 'h').format('yyyy-MM-DD')}</h2>
                                <Link href={{
                                    pathname: `/team/${team?._id}/result/${result._id}`,
                                    query: { opponent: result.awayTeam._id}
                                }}>
                                    <li className="flex items-center space-x-1 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white border-t border-b border-y-gray-300 h-14">
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
                                        <span className="text-right ml-auto">{result.venue}</span>
                                    </li>
                                </Link>
                            </ul>
                        ))}
                    )
                } 
            </div>
        </TeamDetail>
    )
}

export default TeamResult;