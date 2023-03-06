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

export const getFixtureAPI = (id: string) =>
    axios.get(`/api/fixture/${id}`);

export const registerFixtureAPI = (body: registerFixterAPIBody) =>
    axios.post("/api/fixture/registerFixture", body);

export const getDetailFixtureAPI = (id: string) =>
    axios.get<FixtureType>(`/api/fixture/${id}/detail`);

