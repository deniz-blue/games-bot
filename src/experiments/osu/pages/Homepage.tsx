import { LinkButton } from "../components/LinkButton";

export const OsuHomepage = () => {
    return (
        <container>
            <text>
                osu!discord explorer
            </text>

            <separator divider />

            <row>
                <LinkButton to="/users">
                    Users
                </LinkButton>
                <LinkButton to="/beatmaps">
                    Beatmaps
                </LinkButton>
                <LinkButton to="/changelogs">
                    Changelogs
                </LinkButton>
            </row>
        </container>
    );
};
