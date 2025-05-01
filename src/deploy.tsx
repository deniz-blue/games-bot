import "dotenv/config";
import { REST, SlashCommandBuilder, Routes } from "discord.js";
import { clientId, guildId } from "./config.json"

const rest = new REST().setToken(process.env.TOKEN);

const commands = [
    new SlashCommandBuilder()
        .setName("tictactoe")
        .setDescription("Play TicTacToe with someone"),
    new SlashCommandBuilder()
        .setName("react-router")
        .setDescription("react-router experiment"),
];

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${(data as any).length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

