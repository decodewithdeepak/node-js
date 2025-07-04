const {REST, Routes} = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    },
    {
        name: 'beep',
        description: 'Replies with Boop!'
    },
    {
        name: 'hello',
        description: 'Replies with Hello World!'
    },
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: commands},
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();