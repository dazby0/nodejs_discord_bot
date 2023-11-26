const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returs an embed."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("This is an EMBED")
      .setDescription("This is a description.")
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://github.com/dazby0`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconUrl: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://github.com/dazby0`)
      .addFields([
        {
          name: "Field 1",
          value: "Field value 1",
          inline: true,
        },
        {
          name: "Field 2",
          value: "Field value 2",
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
