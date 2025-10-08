export interface UserPublic {
    id: number;
    name: string;
    firstname: string;
    email: string;
    phone: string;
    role: string;
}

export interface UserCreate {
    name: string;
    firstname: string;
    email: string;
    phone: string;
    password: string;
}