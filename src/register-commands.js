require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
    name: "ping",
    description: "Pong!",
  },
  {
    name: "add",
    description: "Add two numbers.",
    options: [
      {
        name: "first-number",
        description: "The first number",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
          {
            name: "three",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "sends an embed.",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.token);

(async () => {
  try {
    console.log("Registering commands");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.client_id,
        process.env.guild_id
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully");
  } catch (error) {
    console.log(error);
  }
})();
