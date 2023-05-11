import Link from "next/link";
import { useSelector } from "../../store";
import TeamDetail from "./TeamDetail"

const TeamSquad: React.FC = () => {
    const squads = useSelector((state) => state.squad.squad).filter((squad) => squad.confirmed === true);
    const user = useSelector((state) => state.user);
    const team = useSelector((state) => state.team.detail);
    const stats = useSelector((state) => state.team.stats[0]);
    // console.log("squad==", squads);
    // console.log("stats==", stats);

    return (
        <TeamDetail>
            <div className="h-64 bg-gradient-to-r from-gray-900 to-gray-100">
                <div className="mx-auto flex py-24 px-4 container">
                    <h1 className="text-white text-6xl font-bold">Squads</h1>
                </div>
            </div>
            {squads.length > 0 ? squads.map((squad:any) => {
                const caps = stats.totalCaps.find((obj: any) => obj._id === squad.userId._id);
                const goals = stats.totalGoals.find((obj: any) => obj._id === squad.userId._id);
                const assists = stats.totalAssists.find((obj: any) => obj._id === squad.userId._id);
                const cleanSheets = stats.cleanSheets.find((obj: any) => obj.id === squad.userId._id);

                return (
                    <div key={squad._id} className="container px-4 my-2 mx-auto">
                        <ul className="h-full border-2 border-gray-200 border-opacity-50 rounded-lg float-left my-4 mx-1 hover:cursor-pointer w-1/5">
                            <Link href={{
                                pathname: `/team/${team?._id}/squad/${squad.userId._id}`,
                                query: { userId: squad.userId._id }
                            }}>
                            <div className="flex">
                                <div className="w-[80%]">
                                    <div className="px-4 py-4">
                                        <span className="text-gray-500 text-xs"># </span>
                                        <span className="text-blue-500 font-bold text-lg">{squad.backNo}</span>
                                    </div>
                                    <div className="px-4">
                                        <span className="text-xl font-bold">{squad.userId['name']}</span>
                                    </div>
                                    <div className="px-4">
                                        {squad.position.length > 1 ? (
                                            <span className="text-gray-500 text-xs">{squad.position.join(", ")}</span>
                                        ) : (
                                            <span className="text-gray-500 text-xs">{squad.position}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-2 pr-2">
                                    <img className="lg:h-24 object-cover object-center rounded-2xl" src="https://www.gravatar.com/avatar/0000?d=mp&f=y" alt="test_image" />    
                                </div>
                            </div>
                            <div className="mx-2 my-2 border-blue-300 border-t-2">
                                <div className="flex py-2">
                                    <span className="w-5/6 text-gray-500 mx-2">Appearances:</span>
                                    <span className="w-1/5 text-end font-bold mx-2">{caps ? caps.totalCaps: 0}</span>
                                </div>
                                <div className="flex py-2 border-t">
                                    <span className="w-5/6 text-gray-500 mx-2">Goals:</span>
                                    <span className="w-1/5 text-end font-bold mx-2">{goals ? goals.totalGoals: 0}</span>
                                </div>
                                <div className="flex py-2 border-t">
                                    <span className="w-5/6 text-gray-500 mx-2">Assists:</span>
                                    <span className="w-1/5 text-end font-bold mx-2">{assists ? assists.totalAssists: 0}</span>
                                </div>
                                <div className="flex border-t w-full px-2 pt-8 pb-2 justify-end">
                                    <span className="font-bold text-sm hover:text-pink-500 hover:underline">View Player →</span>
                                </div>
                            </div>
                            </Link>
                        </ul>
                    </div>
                    // <div key={squad._id}>
                    //     <ul className="float-left">
                    //         {/* <Link href={`/team/${team?._id}/squad/${squad.userId._id}`}><li>{squad.userId['name']}</li></Link> */}
                    //         <Link href={{
                    //             pathname: `/team/${team?._id}/squad/${squad.userId._id}`,
                    //             query: { userId: squad.userId._id }
                    //         }}>
                    //             <li>{squad.userId['name']}</li>&nbsp;
                    //             <li>출장: {caps ? caps.totalCaps : 0}</li>&nbsp;
                    //             <li>골: {goals ? goals.totalGoals: 0}</li>&nbsp;
                    //             <li>도움:{assists ? assists.totalAssists: 0}</li>
                    //         </Link>
                    //     </ul>
                    //     {/* <h2 className="center flex">{squad.userId['name']}</h2> */}
                    // </div>
                )
            }) : (<div>
                등록된 선수가 없습니다.
            </div>)}
        </TeamDetail>
    )
}

export default TeamSquad;