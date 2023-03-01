import ko from "date-fns/locale/ko";
import React, { useState } from "react";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import Selector from "../common/Selector";

const HomeAway = [
    "Home",
    "Away"
]

const RegisterFixture: React.FC = () => {
    const [matchDay, setMatchDay] = useState<Date | null | undefined>();
    const [opponent, setOpponent] = useState("");
    const [homeAway, setHomeAway] = useState("Home");
    const [venue, setVenue] = useState("해누리체육공원");
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");

    const onChangeMatchDay = (date: Date | null) => {
        const matchDate = date ? new Date(date) : null;
        // datepicker 시간 클릭후 GMT+9로 선택한 시간에 +9시간 강제 변환되어 출력되어 9시간 빼줌.
        matchDate?.setHours(matchDate.getHours() - 9);
        setMatchDay(matchDate);
    }

    const onChangeHomeAway = (event: any) => {
        setHomeAway(event.target.value);
    }

    const onChangeOpponent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpponent(event.target.value);
    }

    const onSubmitFixture = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const registerFixtureBody = {
                matchDay,
                opponent,
                homeAway,
                venue
            }
            console.log("registerFixtureBody==", registerFixtureBody);
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <div>
            <h2>경기 일정 등록</h2>
            <form onSubmit={onSubmitFixture}>
                <p>경기 날짜/시간을 알려주세요.</p>
                <div>
                    <DatePicker 
                        selected={matchDay}
                        onChange={onChangeMatchDay}
                        showTimeSelect
                    />
                </div>
                <h2>홈/어웨이 여부를 선택해 주세요.</h2>
                <div>
                    <Selector 
                        options={HomeAway}
                        onChange={onChangeHomeAway}
                    />
                </div>
                <h2>상대팀을 알려주세요.</h2>
                <div>
                    <Input type="text" name="opponentTeam" value={opponent} onChange={onChangeOpponent} />
                </div>
                {homeAway === "Home" && (
                    <>
                    <h2>구장을 선택해 주세요.</h2>
                    <div>
                        <h1>해누리체육공원</h1>
                        {/* <Selector 
                            options={}
                            onChange={}
                        /> */}
                    </div>
                    </>
                )}
                <div>
                    <Button type="submit">등록</Button>
                    <Button>취소</Button>
                </div>
            </form>
            
        </div>
    )
}

export default RegisterFixture;