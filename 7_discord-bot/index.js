require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', (message) => {
    // console.log(message);
    console.log(message.author.username + ': ' + message.content);
});

client.on('messageCreate', (message) => {
    if(message.author.bot) return; // Ignore bot messages
    message.reply({
        content: 'Hi from Bot',
    });
});

client.on('interactionCreate',(interaction) => {
    // console.log(interaction);
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (commandName === 'ping') {
        interaction.reply('Pong!');
    } else if (commandName === 'beep') {
        interaction.reply('Boop!');
    } else if (commandName === 'hello') {
        interaction.reply('Hello World!');
    } else {
        interaction.reply('Unknown command');
    }
});





client.login(process.env.DISCORD_TOKEN);