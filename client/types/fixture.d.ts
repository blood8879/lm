// 일정 타입
export type FixtureType = {
    _id: string;
    matchDay: string;
    homeTeam: string[];
    awayTeam: string[];
    competition: string | null;
    round: number | null;
    venue: string;
}