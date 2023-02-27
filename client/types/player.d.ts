export type PlayerType = {
    _id: string;
    teamId: string;
    userId: string;
    backNo: number | null;
    position: string[];
    confirmed: boolean;
}