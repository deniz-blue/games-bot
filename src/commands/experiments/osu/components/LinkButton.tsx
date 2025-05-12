import { DefaultButtonProps } from "discord-jsx-renderer/dist/intrinsics/elements/button";
import { PropsWithChildren } from "react";
import { To, useNavigate } from "react-router";

export const LinkButton = ({
    to,
    children,
    ...props
}: PropsWithChildren<{
    to: To;
} & Omit<DefaultButtonProps, "onClick" | "customId">>) => {
    const navigate = useNavigate();

    return (
        <button
            {...props}
            onClick={() => navigate(to)}
        >
            {children}
        </button>
    );
};
