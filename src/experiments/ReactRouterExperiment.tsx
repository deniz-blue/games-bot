import { PropsWithChildren } from "react";
import { MemoryRouter, Outlet, Route, Routes, To, useLocation, useNavigate, useParams } from "react-router";

export const ReactRouterExperiment = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="blogs" element={<BlogsIndex />} />
                    <Route path="blogs/:id" element={<BlogPage />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

export const Layout = () => {
    const location = useLocation();

    return (
        <message v2 ephemeral>
            <text>
                path: `{location.pathname}`
            </text>
            <Outlet />
        </message>
    );
};

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            style="secondary"
            onClick={() => navigate(-1)}
        >
            Back
        </button>
    );
};

export const NavigateButton = ({
    to,
    children,
}: PropsWithChildren<{
    to: To
}>) => {
    const navigate = useNavigate();

    return (
        <button
            style="secondary"
            onClick={() => navigate(to)}
        >
            {children}
        </button>
    );
};

export const Homepage = () => {
    return (
        <container>
            <text>This is the homepage</text>

            <row>
                <NavigateButton to="/blogs">
                    Blogs
                </NavigateButton>
            </row>
        </container>
    );
};

export const BlogsIndex = () => {
    const navigate = useNavigate();

    return (
        <container>
            <row>
                <BackButton />
            </row>

            <text>
                Please select a post :3
            </text>

            <row>
                <select
                    type="string"
                    placeholder="Posts"
                    onSelect={([id]) => navigate(`/blogs/${id}`)}
                >
                    <option value="0" label="0" />
                    <option value="1" label="1" />
                    <option value="2" label="2" />
                    <option value="3" label="3" />
                    <option value="4" label="4" />
                </select>
            </row>
        </container>
    );
};

export const BlogPage = () => {
    const { id = "unknown" } = useParams();

    return (
        <container>
            <row>
                <BackButton />
            </row>

            <text>
                Blog page for `{id}`
            </text>
        </container>
    );
};
