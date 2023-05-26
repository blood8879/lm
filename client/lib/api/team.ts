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
    backNo: number | null;
    position: string[];
}

// 팀 정보 가져오기 api
export const getTeamListAPI = () => 
    axios.get("/api/team/");

// 팀명 검색 api
export const getTeamListByNameAPI = (body: any) =>
    axios.post("/api/team/search", body);

// 팀 세부정보 가져오기 api
export const getTeamDetailAPI = (id: string) =>
    axios.get<TeamType>(`/api/team/${id}`);

// 팀 등록 api
export const registerTeamAPI = (body: registerTeamAPIBody) =>
    axios.post("/api/team/registerTeam", body);

// 선수 => 팀 가입 api
export const joinTeamAPI = (id: any, body: joinTeamAPIBody) =>
    axios.post(`/api/team/${id}/join`, body)

// 선수단정보 가져오기 api(홈)
export const getTeamSquadAPI = (id: string) => 
    axios.get(`/api/team/${id}/homeSquad`);

// 선수단정보 가져오기 api(어웨이)
export const getAwayTeamSquadAPI = (body: any) =>
    axios.post("/api/team/awaySquad", body);

// 가입승인 api
// export const givePermissionToPlayerAPI = (id: string, body: any) => {
//     console.log("bbb=", body);
//     axios.put("/api/team/updatePermissions", { 
//         id: id,
//         teamId: body.teamId,
//         userId: body.userId,
//         confirmed: body.confirmed,
//         backNo: body.backNo
//     });
// }

export const givePermissionToPlayerAPI = (id: string, body: any) => {
    console.log("bbb=", body);
    return axios.put("/api/team/updatePermissions", body);
}

// 홈구장 등록 api
export const registerStadiumAPI = (body: any) =>
    axios.post("/api/team/registerStadium", body);

// 홈구장 가져오기 api
export const getStadiumAPI = (id: any) =>
    axios.get(`/api/team/${id}/getStadium`, id);

// 선수단스탯 가져오기 api
export const getStatsAPI = (id: any) =>
    axios.get(`/api/team/${id}/stats`, id);