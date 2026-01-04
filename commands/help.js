// Help Command - Shows available commands
// This command demonstrates how to access the bot's command collection

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all available commands and how to use them"),

  async execute(interaction) {
    // Create an embed to display help information
    const helpEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("== Bot Commands ==")
      .setDescription("Here are all the available commands:")
      .setTimestamp()
      .setFooter({
        text: "Discord Bot Event",
        iconURL: interaction.client.user.displayAvatarURL(),
      });

    // Get all commands from the client
    const commands = interaction.client.commands;

    if (commands.size === 0) {
      helpEmbed.addFields({
        name: "No Commands",
        value: "No commands are currently loaded.",
        inline: false,
      });
    } else {
      // Add each command to the embed
      commands.forEach((command) => {
        helpEmbed.addFields({
          name: `/${command.data.name}`,
          value: command.data.description || "No description available",
          inline: true,
        });
      });
    }

    await interaction.reply({ embeds: [helpEmbed] });
  },
};
