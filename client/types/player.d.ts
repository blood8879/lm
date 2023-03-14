import { UserType } from "./user";

export type SquadType = {
    _id: string;
    teamId: string;
    // userId: string | string[];
    userId: UserType
    backNo: number | null | any;
    position: string[];
    confirmed: boolean;
}

export type PlayerType = {
    _id: string;
    // userId: UserType;
    userId: string;
    name: string;
    height: number | null;
    weight: number | null;
    phone: string | null | undefined;
    foot: string;
    preferPosition: string[];
    birth: string | null;
}