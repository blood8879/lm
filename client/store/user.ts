import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user";

// 초기 상태
const initialState: UserState = {
    _id: "",
    user: "",
    email: "",
    name: "",
    role: 1,
    profileImage: "",
    isLogged: false,
    playerId: null
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoggedUser(state, action: PayloadAction<UserType>) {
            state = { ...action.payload, isLogged: true };
            return state;
        },
        setRegisteredPlayer(state, action: PayloadAction<UserType>) {
            const playerid = state._id;
            state = { ...action.payload, isLogged: true, playerId: playerid };
            return state;
        },
        // 유저 초기화
        initUser(state) {
            state = initialState;
            return state;
        }
    }
})

export const userActions = { ...user.actions };

export default user;