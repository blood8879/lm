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
}

// 선수목록 redux state
export type PlayerState = {
    squad: PlayerType[];
}