import { useSelector } from "../../store"
import TeamDetailHeader from "./TeamDetailHeader";

const TeamDetail: React.FC = () => {
    const team = useSelector((state) => state.team.detail);

    return (
        <TeamDetailHeader />
    )
}

export default TeamDetail;