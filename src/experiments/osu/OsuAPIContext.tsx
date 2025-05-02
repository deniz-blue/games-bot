import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";
import { Auth, Client } from 'osu-web.js';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OSU_CLIENT_ID?: string;
            OSU_CLIENT_SECRET?: string;
        }
    }
}

export const OsuAPIContext = createContext<Client | null>(null);

export const OsuAPIProvider = ({
    children,
    fallback,
}: PropsWithChildren<{
    fallback: React.ReactNode;
}>) => {
    const [api, setApi] = useState<Client | null>(null);

    useEffect(() => {
        (async () => {
            const auth = new Auth(
                parseInt(process.env.OSU_CLIENT_ID as string),
                process.env.OSU_CLIENT_SECRET as string,
                "http://localhost:300"
            );
            const token = await auth.clientCredentialsGrant(["public", "identify"]);
            const api = new Client(token.access_token);
            setApi(api);
        })();
    }, []);

    return (
        <OsuAPIContext value={api}>
            {api ? children : fallback}
        </OsuAPIContext>
    );
};

export const useOsuAPI = () => {
    const api = useContext(OsuAPIContext);
    if(!api) throw new Error("API not initialized");
    return api;
};

