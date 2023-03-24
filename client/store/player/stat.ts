import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerStatState } from "../../types/reduxState";
import { TeamType } from "../../types/team";

const initialState: PlayerStatState = {
    detail: []
}

const stat = createSlice({
    name: "stat",
    initialState,
    reducers: {
        setDetailStat(state, action: PayloadAction<string[]>) {
            state.detail = action.payload;
        }
    },
});

export const statActions = { ...stat.actions };

export default stat;