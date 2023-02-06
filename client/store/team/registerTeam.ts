import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RegisterTeamState = {
    name: string | null;
    description: string;
    emblem: string | null;
    publishedAt: string | null;
}

const initialState: RegisterTeamState = {
    name: "",
    description: "",
    emblem: null,
    publishedAt: null
}

const registerTeam = createSlice({
    name: "registerTeam",
    initialState,
    reducers: {
        // 팀명 등록
        setTeamName(state, action: PayloadAction<string>) {
            state.name = action.payload;
            return state;
        },
        // 팀소개 등록
        setTeamDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
        // 팀 엠블럼 등록
        setTeamEmblem(state, action:PayloadAction<string>) {
            state.emblem = action.payload;
        },
        // 팀 창단일
        setTeamPublished(state, action: PayloadAction<string | null>) {
            state.publishedAt = action.payload;
        }
    }
});

export const registerTeamActions = { ...registerTeam.actions };


export default registerTeam;