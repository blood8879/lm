import React from "react";
import { useSelector } from "../../../store";

const PlayerDetail: React.FC = () => {
    const team = useSelector((state) => state.team.detail);
    const user = useSelector((state) => state.user);
    
    return (
        <div>디테일</div>
    )
}

export default PlayerDetail;