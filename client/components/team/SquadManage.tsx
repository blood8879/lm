import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { squadActions } from "../../store/squad/squad";
import Button from "../common/Button";

const SquadManage: React.FC = () => {
    const squads = useSelector((state) => state.squad.squad);
    const dispatch = useDispatch();

    const approvedSquad = squads.filter((squad) => squad.confirmed === true);
    const unApprovedSquad = squads.filter((squad) => squad.confirmed === false);

    const onSubmitPlayerApprove = async (id: string) => {
        unApprovedSquad.map((squad: any) => {
            if(squad._id === id) {
                console.log("squadId==", squad._id);
                console.log("id===", id);
                console.log("squad===1", squad);
                // squad.confirmed = true;
                // return { ...squad, squad.confirmed = true };
                return {
                    ...squad,
                    confirmed: true
                }
            }
            console.log("squad===2", squad);
            return squad;
        })
        // dispatch(squadActions.setUpdateSquad(updatedSquad));
        
        console.log("Approved");
    }

    const onSubmitPlayerReject = () => {
        console.log("Rejected");
    }

    return (
        <>
            <div>선수단</div>
            {approvedSquad.map((squad: any, index) => (
                <ul key={squad._id}>
                    <li className="flex">
                        <Link href={`/`}>
                            <div className="flex space-x-2">
                                {squad.backNo}
                                {squad.userId.name}
                                {squad.position}
                            </div>
                        </Link>
                    </li>
                </ul>
            ))}
            <div>가입대기</div>
            {unApprovedSquad.map((squad: any, index) => (
                <ul>
                    <li>
                        <Link href={`/`}>
                            <div>
                                {squad.userId.name}
                                {squad.position}
                                {squad.confirmed}
                            </div>
                        </Link>
                        <Button onClick={() => onSubmitPlayerApprove(squad._id)}>
                            승인
                        </Button>
                        <Button onClick={onSubmitPlayerReject}>
                            거절
                        </Button>
                    </li>
                </ul>
            ))}
        </>
    )
}

export default SquadManage;