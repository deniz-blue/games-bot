import { createContext, PropsWithChildren, ReactNode, use, useContext, useEffect, useState } from "react";
import { Auth, Client } from 'osu-web.js';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OSU_CLIENT_ID?: string;
            OSU_CLIENT_SECRET?: string;
        }
    }
}

export const createOsuAPI = async () => {
    const auth = new Auth(
        parseInt(process.env.OSU_CLIENT_ID as string),
        process.env.OSU_CLIENT_SECRET as string,
        "http://localhost:300"
    );
    const token = await auth.clientCredentialsGrant(["public", "identify"]);
    return new Client(token.access_token);
};

export const getOsuAPIPromise = createOsuAPI();

export const OsuAPIContext = createContext<Client | null>(null);

export const OsuAPIProvider = ({
    children,
}: PropsWithChildren) => {
    const api = use(getOsuAPIPromise);

    return (
        <OsuAPIContext value={api}>
            {children}
        </OsuAPIContext>
    );
};

export const useOsuAPI = () => {
    const api = useContext(OsuAPIContext);
    if(!api) throw new Error("API not initialized");
    return api;
};

