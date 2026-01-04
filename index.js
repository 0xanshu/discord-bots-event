const {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Load commands
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Register slash commands
async function registerCommands() {
  const commands = Array.from(client.commands.values()).map((cmd) =>
    cmd.data.toJSON(),
  );
  const rest = new REST().setToken(process.env.BOT_TOKEN);

  try {
    await rest.put(
      process.env.GUILD_ID
        ? Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID,
          )
        : Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );
    console.log("✅ Commands registered!");
  } catch (error) {
    console.error("❌ Error registering commands:", error);
  }
}

// Bot ready
client.once("clientReady", async () => {
  console.log(`${client.user.tag} is online!`);
  await registerCommands();
});

// Handle commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error!",
      ephemeral: true,
    });
  }
});

// Start bot
client.login(process.env.BOT_TOKEN);
