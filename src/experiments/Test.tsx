import { ChatInputCommandInteraction } from "discord.js";

export const Test = ({ interaction }: { interaction: ChatInputCommandInteraction }) => {
    return (
      <message v2>
        <text>
            Test!
        </text>
      </message>
    );
};
