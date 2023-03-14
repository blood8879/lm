import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SquadType } from "../../types/player";
import { SquadState } from "../../types/reduxState";

const initialState : SquadState = {
    squad: []
}

const squad = createSlice({
    name: "squad",
    initialState,
    reducers: {
        setSquad(state, action: PayloadAction<SquadType[]>) {
            state.squad = action.payload;
        },
        setToApprovePermissions(state, action: PayloadAction<SquadType[]>) {
            const updatedSquad = action.payload.map(player => {
                if(player.confirmed) {
                    return player;
                } else {
                    return {
                        ...player,
                        confirmed: true,
                        backNo: action.payload
                    };
                }
            });
            return {
                ...state,
                squad: updatedSquad
            }
        },
        setUpdateSquad(state, action: PayloadAction<SquadType>) {
            return {
                ...state,
                squad: [...state.squad, action.payload]
            }
        }
    },
});

export const squadActions = { ...squad.actions };

export default squad;