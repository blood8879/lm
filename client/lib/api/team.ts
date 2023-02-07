import axios from "axios";

interface registerTeamAPIBody {
    name: string;
    emblem: string;
    description: string;
    publishedAt: string | null;
    owner: string;
}

export const getTeamListAPI = () => 
    axios.get("/api/team/")

export const registerTeamAPI = (body: registerTeamAPIBody) =>
    axios.post("/api/team/registerTeam", body);