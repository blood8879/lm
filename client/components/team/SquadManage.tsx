import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { givePermissionToPlayerAPI } from "../../lib/api/team";
import { useSelector } from "../../store";
import squad, { squadActions } from "../../store/squad/squad";
import Button from "../common/Button";
import Input from "../common/Input";

const SquadManage: React.FC = () => {
    const squads = useSelector((state) => state.squad.squad);
    const dispatch = useDispatch();
    const [backNo, setBackNo] = useState<number>(0);

    const approvedSquad = squads.filter((squad) => squad.confirmed === true);
    const unApprovedSquad = squads.filter((squad) => squad.confirmed === false);

    const onChangeBackNo = (event: any) => {
        setBackNo(Number(event.target.value));
    }

    const onSubmitPlayerApprove = async (id: string) => {
        const updatedSquad = unApprovedSquad.map((squad) => {
            if(squad._id === id) {
                return {
                    _id: squad._id,
                    teamId: squad.teamId,
                    userId: squad.userId,
                    backNo: backNo,
                    position: squad.position,
                    confirmed: true
                }
            }
            return squad;
        });
        console.log("updatedSquad===", updatedSquad);

        const dispatchJoinTeamBody = {
            backNo: backNo,
            confirmed: true
        }

        const promises = [
            givePermissionToPlayerAPI(id, dispatchJoinTeamBody),
            dispatch(squadActions.setToApprovePermissions(updatedSquad))
        ];
        
        await Promise.all(promises);
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
                                이름: {squad.userId.name}
                                선호포지션: {squad.position}
                                {/* 선호등번호: {squad.backNo} */}
                            </div>
                        </Link>
                        <Input type="number" value={backNo} onChange={onChangeBackNo} />
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