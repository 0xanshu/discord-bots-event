# Discord Bots Event

Welcome to the Discord Bots Event! This repository provides a clean, professional starting point for building creative Discord bots using JavaScript and Discord.js v14.

## 🚀 Quick Start

Follow these steps to get your bot up and running:

### 1. Fork and Clone the Repository

1. **Fork this repository** to your GitHub account
2. **Clone your forked repository** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/discord-bots-event.git
   cd discord-bots-event
   ```

### 2. Install Dependencies

Make sure you have Node.js 16.0.0 or higher installed, then run:

```bash
npm install
```

### 3. Set Up Your Discord Bot

#### Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the sidebar
4. Click "Add Bot" and confirm
5. Copy your bot token (keep this secret!)

#### Get Your Application ID

1. In your Discord application, go to "General Information"
2. Copy your "Application ID" (also called Client ID)

#### Invite Your Bot to a Server

1. Go to the "OAuth2" > "URL Generator" section
2. Select "bot" and "applications.commands" scopes
3. Select the permissions your bot needs (at minimum: "Send Messages", "Use Slash Commands")
4. Copy the generated URL and open it in your browser
5. Select a server and authorize your bot

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your values:

   ```env
   BOT_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   ```

   **Note:** `GUILD_ID` is optional but recommended for development. It makes slash commands update instantly in your test server instead of taking up to 1 hour globally.

### 5. Start Your Bot

```bash
npm start
```

If everything is set up correctly, you should see:

```
🤖 Bot is ready! Logged in as YourBot#1234
📊 Serving 1 servers
✅ Successfully reloaded 2 guild application (/) commands.
```

### 6. Test Your Bot

In your Discord server, try these commands:

- `/ping` - Test basic functionality and see bot latency
- `/help` - See all available commands

## 📁 Project Structure

```
discord-bots-event/
├── commands/           # Slash commands
│   ├── ping.js        # Basic ping command
│   └── help.js        # Help command
├── utils/             # Utility functions
│   └── helpers.js     # Common helper functions
├── index.js           # Main bot file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore        # Git ignore patterns
└── README.md         # This file
```

## 🛠️ Adding New Commands

To add a new slash command:

1. Create a new file in the `commands/` directory (e.g., `mycommand.js`)
2. Use this template:

```javascript
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mycommand")
    .setDescription("Description of what your command does"),

  async execute(interaction) {
    // Your command logic here
    await interaction.reply("Hello from my command!");
  },
};
```

3. Restart your bot to load the new command
4. The command will be automatically registered with Discord

### Command Options

You can add options to your commands:

```javascript
data: new SlashCommandBuilder()
    .setName('greet')
    .setDescription('Greet a user')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to greet')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Custom greeting message')
            .setRequired(false)),
```

## 🔧 Using Utility Functions

The `utils/helpers.js` file contains useful functions you can import and use:

```javascript
const {
  validateInput,
  formatResponse,
  capitalize,
} = require("../utils/helpers");

// In your command
const validation = validateInput(userInput, "string", {
  minLength: 3,
  maxLength: 50,
});
if (!validation.isValid) {
  return await interaction.reply(validation.error);
}
```

## 🌐 Adding External APIs

You can integrate external APIs to make your bot more interesting:

1. **Install additional packages** if needed:

   ```bash
   npm install axios  # for HTTP requests
   ```

2. **Create API functions** in your utils or commands:

   ```javascript
   const axios = require("axios");

   async function fetchWeather(city) {
     try {
       const response = await axios.get(
         `https://api.example.com/weather?city=${city}`
       );
       return response.data;
     } catch (error) {
       console.error("API Error:", error);
       return null;
     }
   }
   ```

3. **Use in your commands**:
   ```javascript
   const weather = await fetchWeather(city);
   if (weather) {
     await interaction.reply(`Weather in ${city}: ${weather.description}`);
   } else {
     await interaction.reply("Sorry, I couldn't fetch the weather data.");
   }
   ```

## 🎨 Creative Ideas

Here are some ideas to make your bot unique:

- **Games**: Rock-paper-scissors, trivia, word games
- **Utilities**: Reminders, polls, random generators
- **Fun**: Jokes, memes, random facts
- **Information**: Weather, news, Wikipedia lookups
- **Moderation**: Auto-moderation, logging, welcome messages
- **Music**: Play music from YouTube or Spotify
- **AI Integration**: ChatGPT, image generation, sentiment analysis

## 🐛 Troubleshooting

### Common Issues

**Bot doesn't respond to commands:**

- Make sure your bot is online (check the Discord server)
- Verify your bot has the necessary permissions
- Check the console for error messages
- Ensure slash commands are registered (restart the bot)

**"Missing Access" error:**

- Your bot needs the "Send Messages" and "Use Slash Commands" permissions
- Re-invite your bot with the correct permissions

**Commands not updating:**

- If using `GUILD_ID`: Commands update instantly
- If not using `GUILD_ID`: Global commands take up to 1 hour to update

**Environment variables not working:**

- Make sure your `.env` file is in the root directory
- Check that variable names match exactly (case-sensitive)
- Restart your bot after changing `.env`

### Getting Help

If you encounter issues:

1. Check the console output for error messages
2. Verify your Discord bot setup in the Developer Portal
3. Make sure all dependencies are installed (`npm install`)
4. Check that your `.env` file is configured correctly

## 📚 Resources

- [Discord.js Documentation](https://discord.js.org/#/docs)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📝 Event Guidelines

- **Be Creative**: Build something unique and interesting!
- **External APIs**: You're encouraged to use external APIs to enhance your bot
- **Code Quality**: Write clean, well-commented code
- **Documentation**: Document your bot's features and how to use them
- **Have Fun**: This is about learning and creativity!

---

**Good luck with your Discord bot! 🤖✨**
