import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/player";
import { PlayerState } from "../../types/reduxState";

const initialState : PlayerState = {
    _id: "",
    userId: "",
    name: "",
    height: null,
    weight: null,
    phone: "",
    foot: "",
    preferPosition: [],
    birth: null,
    isRegistered: false
}

const player = createSlice({
    name: "player",
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<PlayerType>) {
            state = { ...action.payload, isRegistered: true };
            return state;
        },
        // 플레이어 초기화
        initPlayer(state) {
            state = initialState;
            return state;
        }
    },
});

export const playerActions = { ...player.actions };

export default player;