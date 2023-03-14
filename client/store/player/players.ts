import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/player";

const initialState : PlayerType = {
    _id: "",
    userId: [],
    name: "",
    height: null,
    weight: null,
    phone: "",
    foot: "",
    preferPosition: [],
    birth: null
}

const player = createSlice({
    name: "player",
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<PlayerType>) {
            state = action.payload;
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