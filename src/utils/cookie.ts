"use server"
import { cookies } from "next/headers";

const SHIFT = 3;
const encryptData = (data: string): string => JSON.stringify(data).split('').map(char => String.fromCharCode(char.charCodeAt(0) + SHIFT)).join('');
const decryptData = (encryptedData: string): string => encryptedData.split('').map(char => String.fromCharCode(char.charCodeAt(0) - SHIFT)).join('');

export const setCookie = async (cookieKey: string, data: object, tokenKey: string | undefined, maxAge: number = 23 * 60 * 60 * 1000): Promise<void> => {
    const cookieStore = await cookies();
    const stringifiedData = JSON?.stringify((data as Record<string, unknown>)[tokenKey ?? '']) ?? '';
    const encryptedData = encryptData(stringifiedData);
    cookieStore.set(cookieKey, encryptedData, { httpOnly: true, secure: true, sameSite: 'none', maxAge });
};

export const getCookie = async (cookieKey: string): Promise<any | null> => {
    const cookieStore = await cookies();
    const encryptedData = cookieStore?.get(cookieKey)?.value;
    if (!encryptedData) return null;
    return await JSON?.parse(JSON?.parse(decryptData(encryptedData)));
};

export const handleClearCookies = async () => {
    const cookieStore = await cookies();
    const excludedCookies = ["OD"];

    cookieStore?.getAll()?.forEach((cookie) => {
        if (!excludedCookies.includes(cookie?.name))
            cookieStore?.delete(cookie?.name);
    });
};