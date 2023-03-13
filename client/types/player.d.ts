import { UserType } from "./user";

export type PlayerType = {
    _id: string;
    teamId: string;
    // userId: string | string[];
    userId: UserType
    backNo: number | null;
    position: string[];
    confirmed: boolean;
}