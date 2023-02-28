import React, { useState } from "react";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Selector from "../common/Selector";

const HomeAway = [
    "Home",
    "Away"
]

const RegisterFixture: React.FC = () => {
    const [matchDay, setMatchDay] = useState<Date | null | undefined>();
    const [opponent, setOpponent] = useState("");
    const [homeAway, setHomeAway] = useState("Home");

    const onChangeMatchDay = (date: Date | null) => {
        const matchDate = date ? new Date(date) : null;
        setMatchDay(matchDate);
    }

    const onChangeHomeAway = (event: any) => {
        setHomeAway(event.target.value);
    }
    
    return (
        <div>
            <h2>경기 일정 등록</h2>
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
                <Button>등록</Button>
                <Button>취소</Button>
            </div>
        </div>
    )
}

export default RegisterFixture;