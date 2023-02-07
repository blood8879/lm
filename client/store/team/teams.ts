import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamState } from "../../types/reduxState";
import { TeamType } from "../../types/team";

const initialState: TeamState = {
    teams: []
}

const team = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeams(state, action: PayloadAction<TeamType[]>) {
            state.teams = action.payload;
        },
    },
});

export const teamActions = { ...team.actions };

export default team;