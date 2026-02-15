// Ping Command - Basic example command
// This command demonstrates the basic structure of a Discord slash command

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Command data - defines the command name, description, and options
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong! and shows bot latency"),

  async execute(interaction) {
    await interaction.reply({ content: "Pinging..." });
    const sent = await interaction.fetchReply();
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);
    await interaction.editReply(
      `Pon!\nBot Latency: ${latency}ms\nAPI Latency: ${apiLatency}ms`,
    );
  },
};
