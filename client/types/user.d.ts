// 저장된 유저 타입
export type StoredUserType = {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: number;
    profileImage: string;
}

// 유저 타입
export type UserType = {
    user: any;
    _id: string;
    email: string;
    name: string;
    role: number;
    profileImage: string;
}