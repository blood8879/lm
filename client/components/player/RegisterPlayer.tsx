import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerPlayerAPI } from "../../lib/api/player";
import { generateNumbersArray } from "../../lib/utils";
import { useSelector } from "../../store";
import { userActions } from "../../store/user";
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

const backNoList = generateNumbersArray("player");

const RegisterPlayer: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user._id);
    const name = useSelector((state) => state.user.name);

    const [heightS, setHeight] = useState("");
    const [weightS, setWeight] = useState("");
    const [phone, setPhone] = useState("");
    const [foot, setFoot] = useState("Left");
    const [preferPosition, setPreferPosition] = useState<any>([]);
    const [birth, setBirth] = useState("");
    const [preferNumbers, setPreferNumbers] = useState<any>([]);

    const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
    }

    const onChangePreferNumbers = (selected: string[]) => {
        setPreferNumbers(selected);
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
        // console.log("setFoot==", event.target.value);
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
            dispatch(userActions.setRegisteredPlayer(user));
            router.push("/");
            console.log("player Registered.")
        } catch(e) {
            console.log(e);
        }

        // console.log("??????????????? ?????????(???????????? ??????)");
        // console.log("position==", position);
        // console.log("foot==", foot);
    }

    return (
        <div>
            <h2>?????? ?????? ?????????</h2>
            <form onSubmit={onSubmitPlayerProfile}>
                <p>????????? ????????? ?????????.</p>
                <div>
                    <Input type="number" name="height" value={heightS} onChange={onChangeHeight} />
                </div>
                <p>????????? ????????? ?????????.</p>
                <div>
                    <Input type="number" name="weight" value={weightS} onChange={onChangeWeight} />
                </div>
                <p>?????? ???????????? ????????? ?????????.</p>
                <div>
                    <CheckboxGroup 
                        value={preferPosition}
                        onChange={onChangePosition}
                        options={Position}
                    />
                </div>
                <p>???????????? ????????? ????????????????</p>
                <div>
                    <CheckboxGroup 
                        value={preferNumbers}
                        onChange={onChangePreferNumbers}
                        options={backNoList}
                    />
                </div>
                <p>?????? ?????? ???????????????????</p>
                <div>
                    <Selector 
                        options={preferFoot}
                        onChange={onChangeFoot}
                    />
                </div>
                <div>
                    <Button type="submit">?????? ??????</Button>
                </div>
            </form>
        </div>    
    )
}

export default RegisterPlayer;