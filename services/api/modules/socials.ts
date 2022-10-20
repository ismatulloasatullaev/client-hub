import { request } from "../config"

export const SOCIALS = {
    GOOGLE: {
        login(code: string) {
            return request.post("/social/google", {
                auth_token: code
            })
        }
    }
}
