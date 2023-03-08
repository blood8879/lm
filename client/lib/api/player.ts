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

// 선수등록 api
export const registerPlayerAPI = (body: registerPlayerAPIBody) =>
    axios.post("/api/player/registerPlayer", body);

// 선수정보 가져오기
export const getPlayerInfoAPI = (id: string) =>
    axios.get(`/api/player/${id}`);