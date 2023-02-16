import { useRouter } from "next/router";
import React, { useState } from "react";
import Input from "../common/Input";

const preferPosition = [
    "GK",
    "DL",
    "LCD",
    "RCD",
    "DR",
    "LCDM",
    "RCDM",
    "ML",
    "LCM",
    "RCM",
    "RM",
    "AML",
    "LCAM",
    "RCAM",
    "AMR",
    "ST",
]

const preferFoot = [
    "Left",
    "Right",
    "Both"
]

const RegisterPlayer: React.FC = () => {
    const router = useRouter();

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [phone, setPhone] = useState("");
    const [foot, setFoot] = useState("");
    const [position, setPosition] = useState([]);
    const [birth, setBirth] = useState("");


    const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);

    }

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
    }

    const onSubmitPlayerProfile = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("마우스클릭 이벤트(플레이어 등록)")
    }

    return (
        <div>
            <h2>선수 등록 페이지</h2>
            <form onSubmit={onSubmitPlayerProfile}>
                <p>신장을 입력해 주세요.</p>
                <div>
                    <Input type="number" name="height" value={height} onChange={onChangeHeight} />
                </div>
                <p>체중을 입력해 주세요.</p>
                <div>
                    <Input type="number" name="weight" value={weight} onChange={onChangeWeight} />
                </div>
            </form>
        </div>    
    )
}

export default RegisterPlayer;