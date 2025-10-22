export interface IRegisterDTO {
    name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    role: "admin" | "seller";
}

export interface ILoginDTO {
    email: string;
    password: string;
}