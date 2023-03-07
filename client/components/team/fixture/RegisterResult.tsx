import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerResultAPI } from "../../../lib/api/fixture";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import Input from "../../common/Input";

const RegisterResult: React.FC = () => {
    const router = useRouter();
    const matchInfo = useSelector((state) => state.fixture.detailFixture);

    const [homeScore, setHomeScore] = useState<number>(0);
    const [awayScore, setAwayScore] = useState<number>(0);

    const onChangeHomeScore = (event: any) => {
        setHomeScore(event.target.value);
    }

    const onChangeAwayScore = (event: any) => {
        setAwayScore(event.target.value);
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
        <div className="flex space-x-2">            
            <form onSubmit={onSubmitMatchResult}>
                <h2>{matchInfo.homeTeam.name}</h2>
                <h2><Input type="number" name="home_scored" value={homeScore} onChange={onChangeHomeScore} /></h2>vs
                <h2>{matchInfo.awayTeam.name}</h2>
                <h2><Input type="number" name="away_scored" value={awayScore} onChange={onChangeAwayScore} /></h2>
                <h2>{matchInfo.venue}</h2>
                <div>
                    <Button type="submit">결과등록</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterResult;