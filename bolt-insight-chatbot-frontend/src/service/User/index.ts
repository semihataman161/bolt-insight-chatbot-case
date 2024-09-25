import Api from "@/service/Api";
import { apiUrl } from "@/constants";
import type { TLoginRequest, TRegisterRequest } from "@/types/api";

export async function register(data: TRegisterRequest) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/user/register`,
        data,
    });
    return response;
};

export async function login(data: TLoginRequest) {
    const response = await Api({
        method: "POST",
        url: `${apiUrl}/api/user/login`,
        data,
    });
    return response;
};