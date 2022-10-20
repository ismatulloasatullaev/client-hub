import axios, { AxiosResponse } from "axios"
import {
    applyAuthTokenInterceptor,
    IAuthTokens,
    setAuthTokens,
    TokenRefreshRequest
} from "axios-jwt"

export const BASE_URL = "https://api.smartcities.uz/v1"

export const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const requestRefresh: TokenRefreshRequest = async (
    refreshToken: string
): Promise<IAuthTokens | string> => {
    const response = await axios.post(
        `${BASE_URL}/token/refresh/`,
        {
            refresh: refreshToken
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    return {
        accessToken: response.data.access,
        refreshToken: response.data.refresh
    }
}

applyAuthTokenInterceptor(request, { requestRefresh })

export async function login(
    username: string,
    password: string,
    result: {
        successCb: () => void
        failureCb: () => void
    }
) {
    try {
        const res = await request.post("/login/", {
            username,
            password
        })

        setAuthTokens({
            accessToken: res.data.access,
            refreshToken: res.data.refresh
        })

        result.successCb()
    } catch (err) {
        result.failureCb()
    }
}

export type AxiosListResponse<T> = AxiosResponse<{
    results: T[]
    count: number
    next: string | null
    previous: string | null
}>
