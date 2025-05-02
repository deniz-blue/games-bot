import { Outlet } from "react-router";

export const OsuWebLayout = () => {
    return (
        <message v2 ephemeral>
            <Outlet />
        </message>
    );
};
