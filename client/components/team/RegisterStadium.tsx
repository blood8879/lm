import { useRouter } from "next/router";
import React, { useState } from "react"
import { registerStadiumAPI } from "../../lib/api/team";
import { useSelector } from "../../store";
import Button from "../common/Button";
import Input from "../common/Input";

const RegisterStadium: React.FC = () => {
    const router = useRouter();

    const team = useSelector((state) => state.team);

    const [stadium, setStadium] = useState("");

    const onChangeStadiumName = (e: any) => {
        setStadium(e.target.value);
    }

    const onSumbitRegisterStadium = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const teamName = team.detail?._id;
        
        try {
            const registerStadiumBody = {
                team: teamName,
                name: stadium
            }
            console.log("registerStadiumBody===", registerStadiumBody);
            await registerStadiumAPI(registerStadiumBody);
            router.push(`/team/${team.detail?._id}`);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>홈구장 등록</h2>
            <form onSubmit={onSumbitRegisterStadium}>
                <div>
                    <Input placeholder="경기장 이름을 입력해 주세요." type="text" value={stadium} onChange={onChangeStadiumName} />
                </div>
                <div>
                    <Button type="submit">홈구장 등록</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterStadium;