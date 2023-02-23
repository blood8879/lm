import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerPlayerAPI } from "../../lib/api/player";
import { useSelector } from "../../store";
import Button from "../common/Button";
import CheckboxGroup from "../common/CheckboxGroup";
import Input from "../common/Input";
import Selector from "../common/Selector";

const Position = [
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

    const userId = useSelector((state) => state.user._id);
    const name = useSelector((state) => state.user.name);

    const [heightS, setHeight] = useState("");
    const [weightS, setWeight] = useState("");
    const [phone, setPhone] = useState("");
    const [foot, setFoot] = useState("Left");
    const [preferPosition, setPreferPosition] = useState<any>([]);
    const [birth, setBirth] = useState("");


    const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);

    }

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
    }

    const onChangePosition = (selected: string[]) => {
        // setPosition([]);
        console.log("selected==", selected);
        setPreferPosition(selected);
    }

    const onChangeFoot = (event: any) => {
        setFoot(event.target.value);
        console.log("setFoot==", event.target.value);
    }

    const onSubmitPlayerProfile = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const height = Number(heightS);
        const weight = Number(weightS);

        try {
            const registerPlayerBody = {
                userId,
                name,
                height,
                weight,
                phone,
                foot,
                preferPosition,
                birth
            }
            console.log("registerPlayerBody==", registerPlayerBody);
            const { data } = await registerPlayerAPI(registerPlayerBody);
            router.push("/");
            console.log("player Registered.")
        } catch(e) {
            console.log(e);
        }

        // console.log("마우스클릭 이벤트(플레이어 등록)");
        // console.log("position==", position);
        // console.log("foot==", foot);
    }

    return (
        <div>
            <h2>선수 등록 페이지</h2>
            <form onSubmit={onSubmitPlayerProfile}>
                <p>신장을 입력해 주세요.</p>
                <div>
                    <Input type="number" name="height" value={heightS} onChange={onChangeHeight} />
                </div>
                <p>체중을 입력해 주세요.</p>
                <div>
                    <Input type="number" name="weight" value={weightS} onChange={onChangeWeight} />
                </div>
                <p>선호 포지션을 선택해 주세요.</p>
                <div>
                    <CheckboxGroup 
                        value={preferPosition}
                        onChange={onChangePosition}
                        options={Position}
                    />
                </div>
                <p>어느 발을 사용하시나요?</p>
                <div>
                    <Selector 
                        options={preferFoot}
                        onChange={onChangeFoot}
                    />
                </div>
                <div>
                    <Button type="submit">선수 등록</Button>
                </div>
            </form>
        </div>    
    )
}

export default RegisterPlayer;