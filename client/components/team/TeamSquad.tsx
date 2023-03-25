import Link from "next/link";
import { useSelector } from "../../store";
import TeamDetail from "./TeamDetail"

const TeamSquad: React.FC = () => {
    const squads = useSelector((state) => state.squad.squad).filter((squad) => squad.confirmed === true);
    const user = useSelector((state) => state.user);
    const team = useSelector((state) => state.team.detail);
    console.log("squad==", squads);

    return (
        <TeamDetail>
            {squads.length > 0 ? squads.map((squad:any) => (
                <div key={squad._id}>
                    <ul>
                        <Link href={`/team/${team?._id}/squad/${squad.userId._id}`}><li>{squad.userId['name']}</li></Link>
                    </ul>
                    {/* <h2 className="center flex">{squad.userId['name']}</h2> */}
                </div>
            )) : (<div>
                등록된 선수가 없습니다.
            </div>)}
        </TeamDetail>
    )
}

export default TeamSquad;