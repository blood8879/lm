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
                        <ul className="h-full border-2 border-gray-200 border-opacity-50 rounded-lg float-left my-4 mx-1 hover:cursor-pointer">
                            <div className="flex">
                                <div className="w-[80%]">
                                    <span>{squad.userId['name']}</span>
                                </div>
                                <div>
                                    <img className="lg:h-36 object-cover object-center" src="https://picsum.photos/id/188/720/400/" alt="test_image" />    
                                </div>
                                {/* <span className="w-[80%]">{squad.userId['name']}</span> */}
                                
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
                                <li>골: {goals ? goals.totalGoals: 0}</li>
                                <li>도움: {assists ? assists.totalAssists: 0}</li>
                            </div>
                            
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