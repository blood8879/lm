import axios from "axios";
import { FixtureType } from "../../types/fixture";

interface registerFixterAPIBody {
    matchDay: Date | null;
    homeTeam: string | undefined | null;
    awayTeam: string | undefined | null;
    venue: string;
    competition: string | null;
    round: number | null;
}

interface registerResultAPIBody {
    fixtureId: string | null;
    home_goals: number | null;
    away_goals: number | null;
    isFinish: boolean;
}

interface attendToMatchAPIBody {
    fixtureId: string | null;
    teamId: string | undefined;
    playerId: string | null;
}

// 일정/결과 가져오기 api
export const getFixtureAPI = (id: string, searchType: string, limit: number | null) =>
    axios.get(`/api/fixture/${id}`, {
        params: { searchType, limit }
    });

// 일정등록 api
export const registerFixtureAPI = (body: registerFixterAPIBody) =>
    axios.post("/api/fixture/registerFixture", body);

// 일정상세정보 api
export const getDetailFixtureAPI = (id: string) =>
    axios.get<FixtureType>(`/api/fixture/${id}/detail`);

// 결과등록 api
export const registerResultAPI = (body: registerResultAPIBody) =>
    axios.put("/api/fixture/registerResult", body);

// 참석 api
export const attendMatchAPI = (body: attendToMatchAPIBody) => 
    axios.put("/api/fixture/attendToMatch", body);