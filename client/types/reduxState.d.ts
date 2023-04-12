import { PlayerType } from "./player";
import { TeamType } from "./team";
import { UserType } from "./user";

// 유저 redux state
export type UserState = UserType & {
    isLogged: boolean;
}

// 공통 redux state
export type CommonState = {
    validateMode: boolean;
}

// 팀목록 redux state
export type TeamState = {
    teams: TeamType[];
    detail: TeamType | null;
    stadium: any[];
    stats: any[];
}

// 선수목록 redux state
export type SquadState = {
    squad: SquadType[];
}

// 경기일정 redux state
export type FixtureState = {
    fixture: any[];
    detailFixture: FixtureType | null;
    result: any[];
    detailResult: FixtureType | null;
}

// 선수 redux state
export type PlayerState = PlayerType & {
    isRegistered: boolean;
}

// 선수 스탯 redux state
export type PlayerStatState = {
    detail: any[];
}