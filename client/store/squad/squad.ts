import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/player";
import { PlayerState } from "../../types/reduxState";

const initialState : PlayerState = {
    squad: []
}

const squad = createSlice({
    name: "squad",
    initialState,
    reducers: {
        setSquad(state, action: PayloadAction<PlayerType[]>) {
            state.squad = action.payload;
        }
    },
});

export const squadActions = { ...squad.actions };

export default squad;