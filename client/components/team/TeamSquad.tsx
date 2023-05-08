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
            {squads.length > 0 ? squads.map((squad:any) => {
                const caps = stats.totalCaps.find((obj: any) => obj._id === squad.userId._id);
                const goals = stats.totalGoals.find((obj: any) => obj._id === squad.userId._id);
                const assists = stats.totalAssists.find((obj: any) => obj._id === squad.userId._id);
                const cleanSheets = stats.cleanSheets.find((obj: any) => obj.id === squad.userId._id);

                return (
                    <div key={squad._id} className="container px-4 my-2 mx-auto">
                        <ul className="h-full border-2 border-gray-200 border-opacity-50 rounded-lg float-left my-4 mx-1 hover:bg-indigo-600 hover:text-white transition duration-100 ease-in">
                            <img className="lg:h-48 w-full object-cover object-center" src="https://picsum.photos/id/188/720/400/" alt="test_image" />
                            <div className="mx-2 my-2 ">
                                <li>{squad.userId['name']}</li>
                                <li>출장: {caps ? caps.totalCaps : 0}</li>
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