import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import auth from "./auth";
import common from "./common";
import user from "./user";
import registerTeam from "./team/registerTeam";
import team from "./team/teams";
import player from "./player/players";
import squad from "./squad/squad";
import fixture from "./fixture/fixture";
import stat from "./player/stat";

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer,
    common: common.reducer,
    registerTeam: registerTeam.reducer,
    team: team.reducer,
    player: player.reducer,
    squad: squad.reducer,
    fixture: fixture.reducer,
    stat: stat.reducer,
});

// 스토어 타입 설정
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if(action.type === HYDRATE) {
        if(state === initialRootState) {
            return {
                ...state,
                ...action.payload
            };
        }
        return state;
    }
    return rootReducer(state, action);
};

// 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);