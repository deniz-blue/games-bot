import { MemoryRouter, Route, Routes } from "react-router";
import { OsuAPIProvider } from "./OsuAPIContext";
import { OsuWebLayout } from "./OsuWebLayout";
import { OsuHomepage } from "./pages/Homepage";
import { OsuChangelogs } from "./pages/Changelogs";

export const OsuWeb = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route element={<OsuWebLayout />}>
                    <Route index element={<OsuHomepage />} />
                    <Route path="changelogs" element={<OsuChangelogs />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};
