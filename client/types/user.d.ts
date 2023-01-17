// 저장된 유저 타입
export type StoredUserType = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: number;
    profileImage: string;
}

// 유저 타입
export type UserType = {
    user: any;
    id: string;
    email: string;
    name: string;
    role: number;
    profileImage: string;
}