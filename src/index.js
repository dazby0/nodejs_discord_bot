require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const cron = require("node-cron");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online!`);
});

client.on("messageCreate", (message) => {
  // console.log(message.content);

  if (message.author.bot) return;

  if (message.content === "hello") {
    message.reply("hey, how r u?");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("YO!");
  }
  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }

  if (interaction.commandName === "add") {
    const n1 = interaction.options.get("first-number").value;
    const n2 = interaction.options.get("second-number").value;

    console.log(n1, n2);

    interaction.reply(`The sum is ${n1 + n2}.`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an embed descrition")
      .setColor("Random")
      .addFields({ name: "Field title", value: "Random value", inline: true })
      .addFields({
        name: "Second field title",
        value: "Random value",
        inline: true,
      })
      .addFields({ name: "Thirdtitle", value: "Random value", inline: true });

    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.token);
