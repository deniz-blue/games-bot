import { Fragment, useEffect, useState } from "react";
import { useOsuAPI } from "../OsuAPIContext";
import { Changelog, ChangelogEntry, GithubUser, UpdateStream } from "osu-web.js";
import { PaginatedSelect } from "../../../../components/PaginatedSelect";
import { LinkButton } from "../components/LinkButton";

export const OsuChangelogs = () => {
    const [stream, setStream] = useState<string | null>(null);
    const [availableStreams, setAvailableStreams] = useState<UpdateStream[]>([]);

    const [data, setData] = useState<Awaited<ReturnType<Changelog["getChangelogListing"]>> | null>(null);
    const [buildId, setBuildId] = useState<string | null>(null);

    const api = useOsuAPI();

    useEffect(() => {
        api.changelog.getChangelogListing({
            query: {
                message_formats: ["markdown"],
                stream: stream as any,
            }
        })
            .then((value) => {
                setAvailableStreams(value.streams);
                if (stream) setData(value);
            });
    }, [stream]);

    const changelog = data?.builds?.find(x => (
        x.update_stream?.name == stream && x.display_version == buildId
    ));

    return (
        <>
            <container>
                <row>
                    <LinkButton
                        to="/"
                    >
                        Home
                    </LinkButton>

                    {!!changelog && (
                        <button
                            url={`https://osu.ppy.sh/home/changelog/${changelog.update_stream?.name}/${changelog.display_version}`}
                        >
                            View on osu.ppy.sh
                        </button>
                    )}
                </row>
                <row>
                    <select
                        type="string"
                        disabled={!availableStreams.length}
                        placeholder="Select an update stream"
                        defaultValues={stream ? [stream] : []}
                        onSelect={([s]) => setStream(s)}
                    >
                        {!availableStreams.length && (
                            <option value="." label="." />
                        )}

                        {availableStreams.map(stream => (
                            <option
                                key={stream.name}
                                value={stream.name}
                                label={stream.display_name || stream.name}
                            />
                        ))}
                    </select>
                </row>
                {!!data?.builds.length && (
                    <row>
                        <PaginatedSelect
                            onSelect={(v) => setBuildId(v)}
                            placeholder="Select a build"
                            value={buildId}
                        >
                            {data?.builds.map((build) => (
                                <option
                                    label={build.display_version || build.version || "Unknown"}
                                    value={build.display_version}
                                    description={`Released at: ${build.created_at}`}
                                />
                            ))}
                        </PaginatedSelect>
                    </row>
                )}

                {!!changelog && (
                    <text>
                        -# {changelog.created_at}{"\n"}
                        ## {changelog.update_stream?.display_name || changelog.update_stream?.name} - {changelog.version || changelog.display_version}{"\n"}
                        {"\n"}
                        {buildChangelogMarkdown(changelog.changelog_entries)}
                    </text>
                )}
            </container>
        </>
    );
};

type DetailedChangelogEntry = ChangelogEntry & {
    github_user: GithubUser;
    message: string | null;
    message_html: string | null;
};

const buildChangelogMarkdown = (entries: DetailedChangelogEntry[]) => {
    let lines: string[] = [];

    let categories = new Set(entries.map(e => e.category));

    for (let category of categories) {
        lines.push(`### ${category}`);
        let inCategory = entries.filter(x => x.category == category);

        for (let e of inCategory) {
            lines.push(`- ${e.title} ${(
                e.github_url ? `[${e.repository}#${e.github_pull_request_id}](<${e.github_url}>)` : ""
            )} *by [${e.github_user.osu_username || e.github_user.display_name}](<${e.github_user.user_url || e.github_user.github_url}>)*`);
            if (e.message) lines.push(`-# ${e.message}`);
        }

        lines.push("");
    }

    return lines.join("\n");
};
