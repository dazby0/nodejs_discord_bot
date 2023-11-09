const fs = require("node:fs");
const path = require("node:path");

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`No command matching ${interaction.commandName} was found`);
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);

    if (interaction.replied || interaction.deffered) {
      await interaction.followUp({
        content: "There was an error executing this command",
        ephermal: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error executing this command",
        ephermal: true,
      });
    }
  }
});

// client.once(Events.ClientReady, (c) => {
//   console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.login(token);
