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

export const registerPlayerAPI = (body: registerPlayerAPIBody) =>
    axios.post("/api/player/registerPlayer", body);

export const getPlayerInfoAPI = (id: string) =>
    axios.get(`/api/player/${id}`);