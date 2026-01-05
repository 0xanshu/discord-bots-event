const { startBot } = require("./utils/core");

function onReady(client) {
  console.log("=== Bot is up and running! ===");
}

// Example: Custom logic for every interaction (before command execution)
async function onInteraction(interaction, client) {
  // You can add custom pre-processing here
  if (interaction.isChatInputCommand()) {
    console.log(`Received command: ${interaction.commandName}`);
  }
}

// Start the bot with your custom hooks
startBot({
  onReady,
  onInteraction,
});

// Participants:
// - Add your custom logic in the onReady or onInteraction functions above.
// - To add commands, place them in the ./commands directory as separate .js files.
