import { useState } from "react";
import { PaginatedSelect } from "../../components/PaginatedSelect";
import { inlineCode } from "discord.js";

export const PaginatedSelectExperiment = () => {
    const [value, setValue] = useState(null);

    return (
        <message v2 ephemeral>
            <container>
                <text>
                    You picked: {value === null ? "nothing" : inlineCode(value)}
                </text>

                <row>
                    <PaginatedSelect
                        onSelect={(v) => setValue(v)}
                        nextProps={{
                            emoji: { name: "➡️" },
                            label: "Next Page",
                            description: "Go to the next page",
                        }}
                        prevProps={{
                            emoji: { name: "⬅️" },
                            label: "Previous Page",
                            description: "Go to the previous page",
                        }}
                    >
                        {Array(200).fill(0).map((_, i) => (
                            <option
                                label={i.toString()}
                                value={i.toString()}
                            />
                        ))}
                    </PaginatedSelect>
                </row>
            </container>
        </message>
    );
};
