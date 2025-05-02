import "dotenv/config";
import { Client, Collection, Events } from "discord.js";
import { djsx } from "./djsx";
import { TicTacToe } from "./games/TicTacToe";
import { ReactRouterExperiment } from "./experiments/ReactRouterExperiment";
import { PaginatedSelectExperiment } from "./experiments/PaginatedSelectExperiment";
import { OsuWeb } from "./experiments/osu/OsuWeb";

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
        .catch(e => console.log(e))
        .finally(() => process.exit(0));
};

process.on("SIGTERM", beforeExit);
process.on("SIGINT", beforeExit);



// Command handling

client.on(Events.InteractionCreate, (interaction) => {
    if(!interaction.isChatInputCommand()) return;

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



