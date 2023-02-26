import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/player";
import { PlayerState } from "../../types/reduxState";

const initialState : PlayerState = {
    profile: null
}

const player = createSlice({
    name: "player",
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<PlayerType>) {
            state.profile = action.payload;
        }
    },
});

export const playerActions = { ...player.actions };

export default player;