# Discord Bots Event

Welcome to the Discord Bots Event! This repository provides a starting point for building Discord bots using JavaScript and Discord.js v14.

## Startup your repo!

Follow these steps to get your bot up and running:

### 1. Fork and Clone the Repository

1. **Fork this repository** to your GitHub account
2. **Clone your forked repository** to your local machine:

   ```bash
   git clone YOUR_GITHUB_FORK_URL
   cd discord-bots-event
   ```

### 2. Install Dependencies

Make sure you have [Node.js 16.0.0](https://nodejs.org/en/download) or higher installed already on your pc. You can check your Node.js version by running:,

```bash
node -v
```

then run any one to install all the Dependencies (stick to the one you prefer):

```bash
npm install

or

pnpm install

or

yarn install
```

### 3. Configure Environment Variables

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

   **Note:** `GUILD_ID` is used to update commands instantly during development.

### 4. Set Up Your Discord Bot

#### Creating a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the sidebar
4. Click "Add Bot" and confirm
5. Copy your bot token (keep this secret!)
6. Add this to your `.env` file as `BOT_TOKEN`
7. Under "Privileged Gateway Intents", enable "Message Content Intent"

#### Get Your Application ID

1. In your Discord application, go to "General Information"
2. Copy your "Application ID" (also called Client ID)
3. Add this to your `.env` file as `CLIENT_ID`

#### Invite Your Bot to a Server

1. Go to the "OAuth2" > "URL Generator" section
2. Select "bot" and "applications.commands" scopes
3. Select the permissions your bot needs (at minimum: "Send Messages", "Use Slash Commands")
4. Keep "Guild Install" selected
5. Copy the generated URL and open it in your browser
6. Select a server and authorize your bot
7. (Optional) For faster command updates during development, you can create a test server and get its ID:
   - Right-click your server icon in Discord
   - Click "Copy ID"
   - Add this to your `.env` file as `GUILD_ID`

### 5. Start Your Bot

now start your bot:

```bash
npm start

or

pnpm start

or

yarn start
```

If everything is set up correctly, you should see in your terminal:

```
<YOUR_BOT_NAME> is online!
✅ Commands registered!
```

### 6. Test Your Bot

In your Discord server, try these commands:

- `/ping` - Test basic functionality and see bot latency
- `/help` - See all available commands

## Project Structure

```
discord-bots-event/
├── commands/          # Slash commands
│   ├── ping.js        # Basic ping command
│   └── help.js        # Help command
├── utils/             # Utility functions
│   ├── core.js        # Core utility functions
│   └── helpers.js     # Common helper functions
├── bot.js             # Main bot file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore patterns
└── README.md          # This file
```

## Adding New Commands

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

3. Restart your bot to load the new command.
4. The command will be automatically registered with Discord.

**Note:**  
Just add your command file to the `commands/` directory and restart the bot.

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

## Using Utility Functions

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

## Adding External APIs

You can integrate external APIs to make your bot more interesting:

1. **Install additional packages** if needed:

   ```bash
   npm install axios      # or
   yarn add axios         # or
   pnpm add axios
   ```

2. **Create API functions** in your utils or commands:

   ```javascript
   const axios = require("axios");

   async function fetchWeather(city) {
     try {
       const response = await axios.get(
         `https://api.example.com/weather?city=${city}`,
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

## Creative Ideas

Here are some ideas to make your bot unique:

- **Games**: Rock-paper-scissors, trivia, word games
- **Utilities**: Reminders, polls, random generators
- **Fun**: Jokes, memes, random facts
- **Information**: Weather, news, Wikipedia lookups
- **Moderation**: Auto-moderation, logging, welcome messages
- **Music**: Play music from YouTube or Spotify
- **AI Integration**: ChatGPT, image generation, sentiment analysis

## Troubleshooting

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

## Resources

- [Discord.js Documentation](https://discord.js.org/#/docs)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Good luck with your Discord bot! 🤖✨**

## Submission

To complete your participation in the Discord Bots Event, please follow these steps:

1. **Record a Demo Video:**

- Record a short demo video showcasing your bot's features and commands in action.
- The video should clearly demonstrate your bot running and responding in Discord.
- Recommended formats: `.mp4`, `.mov`, or `.webm`.

2. **Upload the Video to Google Drive:**

- Upload your demo video to your Google Drive.
- Set the sharing permissions to "Anyone with the link can view".
- Copy the shareable link to your video.
- Update your README with the link to your demo video:
  ```markdown
  [Demo Video](PASTE_YOUR_GOOGLE_DRIVE_LINK_HERE)
  ```

3. **Submit a Pull Request:**

- Push your changes to your forked repository.
- Create a Pull Request (PR) to the main event repository **before 6** (6:00 PM local time).
- Ensure your PR includes your code and the Google Drive demo video link in the README.

**Note:** Late submissions may not be accepted. Double-check that your video is playable and your bot works as expected before submitting your PR.
