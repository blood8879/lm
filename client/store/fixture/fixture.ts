import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FixtureType } from "../../types/fixture";
import { FixtureState } from "../../types/reduxState";

const initialState : FixtureState = {
    fixture: [],
    detailFixture: null,
    result: [],
    detailResult: null
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
        },
        setResult(state, action: PayloadAction<string[]>) {
            state.result = action.payload;
        },
        setDetailResult(state, action: PayloadAction<FixtureType>) {
            state.detailResult = action.payload;
        }
    },
});

export const fixtureActions = { ...fixture.actions };

export default fixture;