// 팀 타입
export type TeamType = {
    _id: string;
    name: string;
    emblem: string;
    description: string;
    publishedAt: string;
    owner: string;
}

export type PlayerType = {
    teamId: string;
    playerId: string;
    backNo: number;
    position: string[];
}