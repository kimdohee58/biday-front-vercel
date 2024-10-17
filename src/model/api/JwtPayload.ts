//src/model/api/JwtPayload.ts
export interface JwtPayload {
    id:string,
    role:string,
    name:string,
    expiredMs:number, // 토큰 만료시간
    category: string;
}