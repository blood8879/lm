import axios from "axios";
import { TeamType } from "../../types/team";

interface registerTeamAPIBody {
    name: string;
    emblem: string;
    description: string;
    publishedAt: string | null;
    owner: string;
}

interface joinTeamAPIBody {
    teamId: string | undefined;
    playerId: string;
    backNo: number;
    position: string[];
}

export const getTeamListAPI = () => 
    axios.get("/api/team/")

export const getTeamDetailAPI = (id: string) =>
    axios.get<TeamType>(`/api/team/${id}`);

export const registerTeamAPI = (body: registerTeamAPIBody) =>
    axios.post("/api/team/registerTeam", body);

export const joinTeamAPI = (id: any, body: joinTeamAPIBody) =>
    axios.post(`/api/team/${id}/join`, body)