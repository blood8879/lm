import axios from "axios";

interface registerPlayerAPIBody {
    name: string;
    height: number;
    weight: number;
    phone: string;
    foot: string;
    preferPosition: string[];
    birth: string
}

// 로그인 유지하기 api
export const playerAPI = () => axios.get("/api/auth/player");

// 선수등록 api
export const registerPlayerAPI = (body: registerPlayerAPIBody) =>
    axios.post("/api/player/registerPlayer", body);

// 선수정보 가져오기
export const getPlayerInfoAPI = (id: string) =>
    axios.get(`/api/player/${id}`);

export const getPlayerDetailAPI = (id: string, playerId: string) =>
    axios.get(`/api/player/${id}/detail`, {
        params: { playerId }
    });