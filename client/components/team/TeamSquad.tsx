import Link from "next/link";
import { useSelector } from "../../store";
import TeamDetail from "./TeamDetail"

const TeamSquad: React.FC = () => {
    const squads = useSelector((state) => state.squad.squad).filter((squad) => squad.confirmed === true);
    console.log("squad==", squads);

    return (
        <TeamDetail>
            {squads.length > 0 ? squads.map((squad:any) => (
                <div key={squad._id}>
                    <ul>
                        <li>{squad.userId['name']}</li>
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