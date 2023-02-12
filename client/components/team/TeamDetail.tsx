import React from "react";
import { useSelector } from "../../store"
import TeamDetailHeader from "./TeamDetailHeader";

const TeamDetail = (props: any) => {
    const team = useSelector((state) => state.team.detail);

    return (
        <div>
            <TeamDetailHeader />
            {props.children}
        </div>
    )
}

export default TeamDetail;