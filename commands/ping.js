// Ping Command - Basic example command
// This command demonstrates the basic structure of a Discord slash command

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Command data - defines the command name, description, and options
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong! and shows bot latency"),

  // Execute function - runs when the command is used
  async execute(interaction) {
    // Calculate bot latency
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });

    // Calculate the time difference
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    // Edit the reply with the actual ping information
    await interaction.editReply({
      content:
        `Pong!\n` +
        `ot Latency: ${latency}ms\n` +
        `API Latency: ${apiLatency}ms`,
    });
  },
};
