import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FixtureType } from "../../types/fixture";
import { PlayerType } from "../../types/player";
import { FixtureState, PlayerState } from "../../types/reduxState";

const initialState : FixtureState = {
    fixture: [],
    detailFixture: null,
}

const fixture = createSlice({
    name: "fixture",
    initialState,
    reducers: {
        setFixture(state, action: PayloadAction<string[]>) {
            state.fixture = action.payload;
        },
        setDetailFixture(state, action:PayloadAction<FixtureType>) {
            state.detailFixture = action.payload;
        }
    },
});

export const fixtureActions = { ...fixture.actions };

export default fixture;