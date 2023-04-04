import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "../../../store";

const PlayerDetail: React.FC = () => {
    const router = useRouter();

    const team = useSelector((state) => state.team.detail);
    const user = useSelector((state) => state.user);
    const playerstat = useSelector((state) => state.stat.detail);
    const squad = useSelector((state) => state.squad.squad);
    const { userId } = router.query;
    
    return (
        <div>
            {playerstat.length > 0 ? (
                <>
                    {squad.find((p) => p.userId._id === userId)?.backNo}  {squad.find((p) => p.userId._id === userId)?.userId.name}
                    <h2>totalCaps: {playerstat[0]?.totalCaps || 0}</h2>
                    <h2>totalGoals: {playerstat[0]?.totalGoals || 0}</h2>
                    <h2>totalAssists: {playerstat[0]?.totalAssists || 0}</h2>    
                </>
            ) : (
                <>
                    {squad.find((p) => p.userId._id === userId)?.backNo}  {squad.find((p) => p.userId._id === userId)?.userId.name}
                    <h2>totalCaps: 0</h2>
                    <h2>totalGoals: 0</h2>
                    <h2>totalAssists: 0</h2>
                </>
            )}
            
        </div>
    )
}

export default PlayerDetail;