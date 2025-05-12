import { Suspense } from "react";
import { Outlet } from "react-router";
import { OsuAPIProvider } from "./OsuAPIContext";

export const OsuWebLayout = () => {
    return (
        <message v2 ephemeral>
            <Suspense fallback={(
                <container>
                    <text>
                        Loading...
                    </text>
                </container>
            )}>
                <OsuAPIProvider>
                    <Outlet />
                </OsuAPIProvider>
            </Suspense>
        </message>
    );
};
