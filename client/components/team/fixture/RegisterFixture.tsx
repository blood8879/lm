import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerFixtureAPI } from "../../../lib/api/fixture";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import DatePicker from "../../common/DatePicker";
import Input from "../../common/Input";
import Selector from "../../common/Selector";
import moment from "moment";

const HomeAway = [
    "Home",
    "Away"
]

const RegisterFixture: React.FC = () => {
    const router = useRouter();

    const team = useSelector((state) => state.team);

    const [matchDay, setMatchDay] = useState<Date | null>(null);
    // const [opponent, setOpponent] = useState("");
    const [homeAway, setHomeAway] = useState("Home");
    const [venue, setVenue] = useState("해누리체육공원");
    const [homeTeam, setHomeTeam] = useState(team.detail?._id);
    const [awayTeam, setAwayTeam] = useState("");
    const [competition, setCompetition] = useState(null);
    const [round, setRound] = useState(null);

    

    const onChangeMatchDay = (date: Date | null) => {
        const matchDate = date ? new Date(date) : null;
        // datepicker 시간 클릭후 GMT+9로 선택한 시간에 +9시간 강제 변환되어 출력되어 9시간 빼줌.
        matchDate?.setHours(matchDate.getHours() - 9);
        setMatchDay(matchDate);
    }

    const onChangeHomeAway = (event: any) => {
        const selectedValue = event.target.value;
        setHomeAway(selectedValue);
        if(selectedValue === "Home" && team.detail?._id) {
            setAwayTeam("");
            setHomeTeam(team.detail._id);
        } else if(selectedValue === "Away" && team.detail?._id) {
            setAwayTeam(team.detail._id);
            setHomeTeam("");
        }
    }

    const onChangeOpponent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(homeAway === "Home") {
            setAwayTeam(event.target.value);
        } else {
            setHomeTeam(event.target.value);
        }
    }

    const onSubmitFixture = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const matchDayInUTC9 = moment(matchDay?.setHours(matchDay.getHours() + 9)).toDate();
            const registerFixtureBody = {
                matchDay: matchDayInUTC9, // 화면 표기상의 문제로 앞라인에서 9시간 빼줘서 db로 보낼때 시간 다시 원복시켜줌
                homeTeam,
                awayTeam,
                venue,
                competition,
                round
            }
            console.log("registerFixtureBody==", registerFixtureBody);
            await registerFixtureAPI(registerFixtureBody);
            router.push(`/team/${team.detail?._id}/fixture`);
        } catch(e) {
            console.log(e);
        }
    }

    const onCancel = () => {
        router.back();
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
                        dateFormat="yyyy/MM/dd hh:mm a"
                    />
                </div>
                <h2>홈/어웨이 여부를 선택해 주세요.</h2>
                <div>
                    <Selector 
                        options={HomeAway}
                        onChange={onChangeHomeAway}
                    />
                </div>
                {homeAway === "Home" ? (
                    <>
                    <h2>상대팀을 알려주세요.</h2>
                    <div>
                        <Input type="text" name="opponentTeam" value={awayTeam} onChange={onChangeOpponent} />
                    </div>
                    <h2>구장을 선택해 주세요.</h2>
                    <div>
                        <h1>해누리체육공원</h1>
                        {/* <Selector 
                            options={}
                            onChange={}
                        /> */}
                    </div>
                    </>
                ) : (
                    <>
                    <h2>상대팀을 알려주세요.</h2>
                    <div>
                        <Input type="text" name="opponentTeam" value={homeTeam} onChange={onChangeOpponent} />
                    </div>
                    {/* <h2>구장을 선택해 주세요.</h2>
                    <div>
                        <h1>해누리체육공원</h1>
                        <Selector 
                            options={}
                            onChange={}
                        />
                    </div> */}
                    </>
                )}
                <div>
                    <Button type="submit">등록</Button>
                </div>
            </form>
            <div>
                <Button onClick={onCancel}>취소</Button>
            </div>
        </div>
    )
}

export default RegisterFixture;