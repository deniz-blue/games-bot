import "dotenv/config";
import "./devtools";
import { Client, Collection, Events } from "discord.js";
import { djsx } from "./djsx";
import { TicTacToe } from "./commands/games/TicTacToe";
import { ReactRouterExperiment } from "./commands/experiments/ReactRouterExperiment";
import { PaginatedSelectExperiment } from "./commands/experiments/PaginatedSelectExperiment";
import { OsuWeb } from "./commands/experiments/osu/OsuWeb";
import { traverseAllFiles } from "./utils/filesystem";
import { Counter } from "./commands/demos/Counter";

const client = new Client({
    intents: [],
});

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag} !`);
});

client.on(Events.InteractionCreate, (interaction) => {
    djsx.dispatchInteraction(interaction);
});

client.login(process.env.TOKEN);

const beforeExit = () => {
    djsx.disable()
        .catch((e: Error) => console.log(e))
        .finally(() => process.exit(0));
};

process.on("SIGTERM", beforeExit);
process.on("SIGINT", beforeExit);

// Command handling

client.on(Events.InteractionCreate, (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName == "counter") {
        djsx.create(interaction, <Counter />);
        return;
    };

    if(interaction.commandName == "tictactoe") {
        djsx.create(interaction, <TicTacToe interaction={interaction} />);
        return;
    };

    if(interaction.commandName == "react-router") {
        djsx.create(interaction, <ReactRouterExperiment />);
        return;
    };

    if(interaction.commandName == "paginated-select") {
        djsx.create(interaction, <PaginatedSelectExperiment />);
        return;
    };

    if(interaction.commandName == "osu") {
        djsx.create(interaction, <OsuWeb />);
        return;
    };
});



