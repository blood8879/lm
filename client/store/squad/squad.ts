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
            console.log("payload===", action.payload);
            // action.payload._id와 state._id가 동일한 경우confirmed true로 변경
            const updatedSquad = action.payload.map(player => {
                console.log("player===", player)
                if(player.confirmed) {
                    return player;
                } else {
                    return {
                        ...player,
                        confirmed: true,
                        backNo: player.backNo
                    };
                }
            });
            return {
                ...state,
                squad: updatedSquad
                // squad: [...state.squad, updatedSquad]
            }
        },
        // setToApprovePermissions(state, action: PayloadAction<SquadType[]>) {
        //     console.log("payload===", action.payload);
        //     const updatedSquad = action.payload.map(player => {
        //         console.log("player===", player)
        //         if(player.confirmed) {
        //             return player;
        //         } else {
        //             return {
        //                 ...player,
        //                 confirmed: true,
        //                 backNo: player.backNo
        //             };
        //         }
        //     });
        //     return {
        //         ...state,
        //         squad: [...state.squad, updatedSquad]
        //     }
        //     const updateData = action.payload;
        //     console.log("updateData===", updateData);
        //     console.log("squad===", squad);
        // },
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