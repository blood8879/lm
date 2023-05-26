import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { registerResultAPI } from "../../../lib/api/fixture";
import { getAwayTeamSquadAPI } from "../../../lib/api/team";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import Input from "../../common/Input";

interface PlayerGoals {
    goals: { [key: string]: number };
    assists: { [key: string]: number };
}

const RegisterResult: React.FC = () => {
    const router = useRouter();
    const matchInfo = useSelector((state) => state.fixture.detailFixture);
    const squad = useSelector((state) => state.squad.squad);
    const awaySquad = useSelector((state) => state.squad.awaysquad);

    const [homeScore, setHomeScore] = useState<number>(0);
    const [awayScore, setAwayScore] = useState<number>(0);
    const [homePlayerGoals, setHomePlayerGoals] = useState<{ [key: string]: number }>({});
    // const [homePlayerGoals, setHomePlayerGoals] = useState<PlayerGoals>({goals:{}, assists: {}});
    const [awayPlayerGoals, setAwayPlayerGoals] = useState<{ [key: string]: number }>({});
    const [homePlayerAssists, setHomePlayerAssists] = useState<{ [key: string]: number}>({});
    const [awayPlayerAssists, setAwayPlayerAssists] = useState<{ [key: string]: number}>({});

    const onChangeHomePlayerGoals = (event: any, matchingPlayer: any) => {
        const newGoalValue = Number(event.target.value);
        const oldGoalValue = homePlayerGoals[matchingPlayer.userId._id] || 0;
        const newHomeScore = Number(homeScore) - oldGoalValue + newGoalValue
        setHomePlayerGoals({
            ...homePlayerGoals,
            [matchingPlayer.userId._id]: newGoalValue,
        });
        setHomeScore(newHomeScore);
    }

    const onChangeAwayPlayerGoals = (event: any, matchingPlayer: any) => {
        const newGoalValue = Number(event.target.value);
        const oldGoalValue = awayPlayerGoals[matchingPlayer.userId._id] || 0;
        const newAwayScore = Number(awayScore) - oldGoalValue + newGoalValue
        setAwayPlayerGoals({
            ...awayPlayerGoals,
            [matchingPlayer.userId._id]: newGoalValue,
        });
        setAwayScore(newAwayScore);
    }

    const onChangeHomePlayerAssists = (event: any, matchingPlayer: any) => {
        const newAssistValue = Number(event.target.value);
        setHomePlayerAssists({
            [matchingPlayer.userId._id]: newAssistValue,
        })
    }
    
    const onChangeAwayPlayerAssists = (event: any, matchingPlayer: any) => {
        const newAssistValue = Number(event.target.value);
        setAwayPlayerAssists({
            [matchingPlayer.userId._id]: newAssistValue,
        })
    }

    const onSubmitMatchResult = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const registerResultBody = {
                fixtureId: matchInfo._id,
                isFinish: true,
                home_goals: Number(homeScore),
                away_goals: Number(awayScore),
                homeplayergoals: homePlayerGoals,
                awayplayergoals: awayPlayerGoals,
                homeplayerassists: homePlayerAssists,
                awayplayerassists: awayPlayerAssists,
            }
            
            console.log("registerResultBody===", registerResultBody);
            await registerResultAPI(registerResultBody);
            router.push("/");
        } catch(e) {
            console.log(e);
        }
    }

    const getAwaySquad = async() => {
        const { data } = await getAwayTeamSquadAPI(matchInfo.awayTeam._id);
        // console.log("data===", data);
    }

    useEffect(() => {
        getAwaySquad();
    })

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
                                <input className="border-2" type="number" name="goal" defaultValue={0} onChange={(event) => onChangeHomePlayerGoals(event, matchingPlayer)} />골
                            </div>
                            <div>
                                <input className="border-2" type="number" name="assist" defaultValue={0} onChange={(event) => onChangeHomePlayerAssists(event, matchingPlayer)} />도움
                            </div>
                        </div>
                    )
                }
            })}
            <h2>참석인원(어웨이)</h2>
            {matchInfo.awaySquad.map((player:any) => {
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
                                <input className="border-2" type="number" name="goal" defaultValue={0} onChange={(event) => onChangeAwayPlayerGoals(event, matchingPlayer)} />골
                            </div>
                            <div>
                                <input className="border-2" type="number" name="assist" defaultValue={0} onChange={(event) => onChangeAwayPlayerAssists(event, matchingPlayer)} />도움
                            </div>
                        </div>
                    )
                }
            })}
            </div>
            <div>
                <h2>불참</h2>
                {matchInfo.homeAbsent.map((player: any) => {
                    const matchingPlayer = squad.find((p:any) => p.userId._id === player);
                    if(matchingPlayer) {
                        return (
                            <h2>{matchingPlayer.userId.name}</h2>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default RegisterResult;