import { APISelectMenuOption, StringSelectMenuInteraction } from "discord.js";
import { Fragment, PropsWithChildren, useState } from "react";

export const PaginatedSelect = ({
    children: _children,
    onSelect,
    prevProps,
    nextProps,
    predicate,
    disabled,
    value,
    placeholder,
}: PropsWithChildren<{
    onSelect?: (value: string, interaction: StringSelectMenuInteraction) => void;
    prevProps?: Omit<APISelectMenuOption, "default" | "value">;
    nextProps?: Omit<APISelectMenuOption, "default" | "value">;
    predicate?: (interaction: StringSelectMenuInteraction) => boolean;
    disabled?: boolean;
    value?: string | null;
    placeholder?: string;
}>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 23;

    // console.log(_children);

    const children = Array.isArray(_children) ? _children : [_children];
    const pageCount = Math.ceil(children.length / PageSize);

    const startIndex = (currentPage - 1) * PageSize;
    const endIndex = startIndex + PageSize;
    const options = children.slice(startIndex, endIndex);

    const customIdPrev = "$$prev";
    const customIdNext = "$$next";

    return (
        <select
            type="string"
            disabled={disabled}
            defaultValues={value ? [value] : undefined}
            placeholder={placeholder}
            onSelect={([value], interaction) => {
                if(predicate && !predicate(interaction)) return;
                if(value == customIdPrev) return setCurrentPage(p => p-1);
                if(value == customIdNext) return setCurrentPage(p => p+1);
                onSelect?.(value, interaction);
            }}
        >
            {currentPage !== 1 && (
                <option
                    value={customIdPrev}
                    label="Previous Page"
                    {...prevProps}
                />
            )}
            {options.map((option, i) => (
                <Fragment key={i}>
                    {option}
                </Fragment>
            ))}
            {pageCount !== currentPage && (
                <option
                    value={customIdNext}
                    label="Next Page"
                    {...nextProps}
                />
            )}
        </select>
    );
};
