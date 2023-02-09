import { useSelector } from "../../store"

const TeamDetail: React.FC = () => {
    const team = useSelector((state) => state.team.detail);

    return (
        <div>
            <p>{team?.emblem}</p>
        </div>
    )
}

export default TeamDetail;