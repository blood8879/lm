import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { givePermissionToPlayerAPI } from "../../lib/api/team";
import { useSelector } from "../../store";
import squad, { squadActions } from "../../store/squad/squad";
import Button from "../common/Button";
import Input from "../common/Input";

interface BackNoState {
    id: string;
    backNo: number;
}

const SquadManage: React.FC = () => {
    const squads = useSelector((state) => state.squad.squad);
    const dispatch = useDispatch();
    const [backNo, setBackNo] = useState<number>(0);
    const [backNos, setBackNos] = useState<BackNoState[]>([]);

    const approvedSquad = squads.filter((squad) => squad.confirmed === true);
    const unApprovedSquad = squads.filter((squad) => squad.confirmed === false);

    // const approvedSquad = Object.values(squads).filter((squad) => squad.confirmed === true);
    // const unApprovedSquad = Object.values(squads).filter((squad) => squad.confirmed === false);

    // const onChangeBackNo = (event: any) => {
    //     setBackNo(Number(event.target.value));
    // }

    const onChangeBackNo = (event: any, id: string) => {
        const value = Number(event.target.value);
        setBackNos((prevBackNos) => {
            // console.log("prevBackNos111===", prevBackNos)
            const index = prevBackNos.findIndex((backNo) => backNo.id === id);
            if(index === -1) {
                return [...prevBackNos, { id, backNo: value }];
            } else {
                return [
                    ...prevBackNos.slice(0, index),
                    { id, backNo: value },
                    ...prevBackNos.slice(index+1),
                ]
            }
        })

        // console.log("prevBackNos222===", backNos);
        // setBackNo(Number(event.target.value));
    }

    const onSubmitPlayerApprove = async (id: string) => {
        const backNoObj = backNos.find((backNo) => backNo.id === id);
        
        if(!backNoObj) {
            return;
        }
        
        const updatedSquad = squads.map((squad: any) => {
            if(squad._id === id) {
                return {
                    _id: squad._id,
                    teamId: squad.teamId,
                    userId: squad.userId,
                    backNo: backNoObj.backNo,
                    position: squad.position,
                    confirmed: true
                }
            }
            return squad;
        });
        console.log("updatedSquad===", updatedSquad);
        // console.log("updatedSquad===", updateItem);

        const dispatchJoinTeamBody = {
            backNo: backNoObj.backNo,
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
                <ul key={squad._id}>
                    <li>
                        <Link href={`/`}>
                            <div>
                                이름: {squad.userId.name}
                                선호포지션: {squad.position}
                                {/* 선호등번호: {squad.backNo} */}
                            </div>
                        </Link>
                        {/* <Input type="number" value={backNo} onChange={onChangeBackNo} /> */}
                        <Input type="number" value={backNos.find((backNo) => backNo.id === squad._id)?.backNo || 0} onChange={(event) => onChangeBackNo(event, squad._id)} />
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