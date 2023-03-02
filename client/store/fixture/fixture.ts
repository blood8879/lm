import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/player";
import { FixtureState, PlayerState } from "../../types/reduxState";

const initialState : FixtureState = {
    fixture: []
}

const fixture = createSlice({
    name: "fixture",
    initialState,
    reducers: {
        setFixture(state, action: PayloadAction<string[]>) {
            state.fixture = action.payload;
        }
    },
});

export const fixtureActions = { ...fixture.actions };

export default fixture;