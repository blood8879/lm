// μΌμ  νμ
export type FixtureType = {
    _id: string;
    matchDay: string;
    homeTeam: string[];
    awayTeam: string[];
    competition: string | null;
    round: number | null;
    venue: string;
    home_goals: number;
    away_goals: number;
}