import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerResultAPI } from "../../../lib/api/fixture";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import Input from "../../common/Input";

const RegisterResult: React.FC = () => {
    const router = useRouter();
    const matchInfo = useSelector((state) => state.fixture.detailFixture);
    const squad = useSelector((state) => state.squad.squad);

    const [homeScore, setHomeScore] = useState<number>(0);
    const [awayScore, setAwayScore] = useState<number>(0);
    const [homePlayerGoals, setHomePlayerGoals] = useState<{ [key: string]: number }>({});
    // const [homePlayerGoals, setHomePlayerGoals] = useState<number>(0);

    const onChangeHomeScore = (event: any) => {
        setHomeScore(event.target.value);
    }

    const onChangeAwayScore = (event: any) => {
        setAwayScore(event.target.value);
    }

    const onChangePlayerGoals = (event: any, matchingPlayer: any) => {
        const newGoalValue = Number(event.target.value);
        const oldGoalValue = homePlayerGoals[matchingPlayer.userId._id] || 0;
        const newHomeScore = Number(homeScore) - oldGoalValue + newGoalValue
        setHomePlayerGoals({
            ...homePlayerGoals,
            [matchingPlayer.userId._id]: newGoalValue,
        });
        setHomeScore(newHomeScore);
    }
    
    const onSubmitMatchResult = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const registerResultBody = {
                fixtureId: matchInfo._id,
                isFinish: true,
                home_goals: Number(homeScore),
                away_goals: Number(awayScore)
            }
            
            console.log("registerResultBody===", registerResultBody);
            await registerResultAPI(registerResultBody);
            router.push("/");
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="flex space-x-2">            
                <form onSubmit={onSubmitMatchResult}>
                    <h2>{matchInfo.homeTeam.name}</h2>
                    <h2>{homeScore}</h2>vs
                    <h2>{matchInfo.awayTeam.name}</h2>
                    <h2>{awayScore}</h2>
                    <h2>{matchInfo.venue}</h2>
                    <div>
                        <Button type="submit">결과등록</Button>
                    </div>
                </form>
            </div>
            <div>
            <h2>참석인원(홈)</h2>
            {matchInfo.homeSquad.map((player:any) => {
                const matchingPlayer = squad.find((p:any) => p.userId._id === player);
                // console.log("ma===", matchingPlayer);
                // 만약 squad 변수에 player와 동일한 값이 있다면 <h2>로 squad.name을 출력
                if(matchingPlayer) {
                    return (
                        <div className="flex space-x-2">
                            <h2>{matchingPlayer.backNo}</h2>
                            <h2>{matchingPlayer.position}</h2>
                            <h2>{matchingPlayer.userId.name}</h2>
                            <div>
                                <input className="border-2" type="number" name="goal" defaultValue={0} onChange={(event) => onChangePlayerGoals(event, matchingPlayer)} />골
                            </div>
                            <div>
                                <input className="border-2" type="number" name="assist"/>도움
                            </div>
                        </div>
                    )
                }
            })}
            </div>
        </>
    )
}

export default RegisterResult;