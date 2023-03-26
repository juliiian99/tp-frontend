export interface JwtResponse {
    playerData: {
        id: number,
        username: string,
        password: string,
        accessToken: string,
        expiresIn: string,
    }
}