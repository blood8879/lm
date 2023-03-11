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
    userId: string;
    backNo: number;
    position: string[];
}

// 팀 정보 가져오기 api
export const getTeamListAPI = () => 
    axios.get("/api/team/")

// 팀 세부정보 가져오기 api
export const getTeamDetailAPI = (id: string) =>
    axios.get<TeamType>(`/api/team/${id}`);

// 팀 등록 api
export const registerTeamAPI = (body: registerTeamAPIBody) =>
    axios.post("/api/team/registerTeam", body);

// 선수 => 팀 가입 api
export const joinTeamAPI = (id: any, body: joinTeamAPIBody) =>
    axios.post(`/api/team/${id}/join`, body)

// 선수단정보 가져오기 api
export const getTeamSquadAPI = (id: string, searchType: string) => 
    axios.get(`/api/team/${id}/squad`, {
        params: { searchType }
    });