import axios from "axios";
import { useRouter } from "next/router"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerTeamAPI } from "../../lib/api/team";
import { useSelector } from "../../store";
import { registerTeamActions } from "../../store/team/registerTeam";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";

const RegisterTeam: React.FC = () => {
    const router = useRouter();

    const published = useSelector((state) => state.registerTeam.publishedAt);
    const owner = useSelector((state) => state.user._id);

    const [name, setName] = useState("");
    const [emblem, setEmblem] = useState("");
    const [description, setDescription] = useState("");
    const [preview, setPreview] = useState<string>();
    
    const datePublished = published ? new Date(published) : null;

    const dispatch = useDispatch();

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        dispatch(registerTeamActions.setTeamName(event.target.value));
    }

    const onChangeEmblem = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmblem(event.target.value);
        dispatch(registerTeamActions.setTeamEmblem(event.target.value));
    }

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        dispatch(registerTeamActions.setTeamDescription(event.target.value));
    }

    const onChangePublishedDate = (date: Date | null) => {
        dispatch(registerTeamActions.setTeamPublished(date ? date.toISOString() : null))
    }

    const uploadEmblem = async(event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files === null) return;

        const file = event.target.files[0];

        const readAndPreview = (file: any) => {
            if(file) {
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
            }
        }

        if(file) {
            readAndPreview(file);
        }

        const formData = new FormData();
        formData.append("file", file);
        setEmblem(`${Date.now()}_${file.name}`);

        try {
            await axios.post(`/api/team/registerTeam/emblemUpload`, formData, {
                headers: { "Context-Type": "multipart/form-data" }
            });
        } catch(e) {
            console.log(e);
        }
    }

    const onSubmitRegisterTeam = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const publishedAt = String(datePublished);
            const registerTeamBody = {
                name,
                emblem,
                description,
                publishedAt,
                owner
            }
            console.log("registerTeamBody==", registerTeamBody);
            const { data } = await registerTeamAPI(registerTeamBody);
            dispatch(registerTeamActions.setInitState());
            router.push("/");
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>??? ?????? ?????????</h2>
            <form onSubmit={onSubmitRegisterTeam}>
                <div>
                    <Input placeholder="??? ????????? ????????? ?????????." type="text" name="name" value={name} onChange={onChangeName} isValid={!!name} />
                </div>
                <div>
                    <Input placeholder="???????????? ????????? ?????????." type="text" name="description" value={description} onChange={onChangeDescription} isValid={!!description} />
                </div>
                <h3>???????????? ????????? ?????????.</h3>
                <div>
                    {!emblem ? (
                        <div>
                            <input type="file" accept="image/*" onChange={uploadEmblem} />
                            <Button>
                                ?????????
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <img src={preview} alt="preview-img" />
                            <input type="file" accept="image/*" onChange={uploadEmblem} />
                            <Button>
                                ????????? ??????
                            </Button>
                        </div>
                    )}
                </div>
                <h3>??? ???????????? ???????????????</h3>
                <div>
                    <DatePicker
                        selected={datePublished}
                        onChange={onChangePublishedDate}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div>
                    <Button type="submit">??? ??????</Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterTeam;