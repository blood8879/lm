import { useRouter } from "next/router"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { registerTeamActions } from "../../store/team/registerTeam";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";

const RegisterTeam: React.FC = () => {
    const router = useRouter();

    const published = useSelector((state) => state.registerTeam.publishedAt);

    const [name, setName] = useState("");
    const [emblem, setEmblem] = useState("");
    const [description, setDescription] = useState("");
    
    const datePublished = published ? new Date(published) : null;

    const dispatch = useDispatch();

    const onChangeName = (value: any) => {
        setName(value);
        dispatch(registerTeamActions.setTeamName(value));
    }

    const onChangeEmblem = (value: any) => {
        setEmblem(value);
        dispatch(registerTeamActions.setTeamEmblem(value));
    }

    const onChangeDescription = (value: any) => {
        setDescription(value);
        dispatch(registerTeamActions.setTeamDescription(value));
    }

    const onChangePublishedDate = (date: Date | null) => {
        dispatch(registerTeamActions.setTeamPublished(date ? date.toISOString() : null))
    }

    const uploadEmblem = async(event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files === null) return;
    }

    const onSubmitRegisterTeam = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>팀 등록 페이지</h2>
            <form onSubmit={onSubmitRegisterTeam}>
                <div>
                    <Input placeholder="팀 이름을 입력해 주세요." type="text" name="name" value={name} onChange={onChangeName} isValid={!!name} />
                </div>
                <div>
                    <Input placeholder="우리팀을 소개해 주세요." type="text" name="description" value={description} onChange={onChangeDescription} isValid={!!description} />
                </div>
                <h3>엠블럼을 등록해 주세요.</h3>
                <div>
                    {!emblem ? (
                        <div>
                            <input type="file" accept="image/*" onChange={uploadEmblem} />
                            <Button>
                                업로드
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <input type="file" accept="image/*" onChange={uploadEmblem} />
                            <Button>
                                엠블럼 변경
                            </Button>
                        </div>
                    )}
                </div>
                <h3>팀 창단일을 알려주세요</h3>
                <div>
                    <DatePicker
                        selected={datePublished}
                        onChange={onChangePublishedDate}
                    />
                </div>
            </form>
        </div>
    )
}

export default RegisterTeam;