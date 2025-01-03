require('dotenv').config();
const { Client, IntentsBitField, Collection, Events } = require('discord.js');

// Set specific intent bit flags so the bot can access/view/respond to messages
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
})

// Bot logs in with secret token
client.login(process.env.TOKEN);

// Message in terminal to ensure bot has been started
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async msg => {
    if (msg.author.id === process.env.TARGET1 || msg.author.id === process.env.TARGET2) {// || msg.author.id === "259831236418076672"
        if (msg.content.includes("bestie")) {
            msg.reply("https://tenor.com/view/get-a-job-gif-22743613");

            try {
                const guild = await client.guilds.fetch(process.env.GUILDID)

                const member = await guild.members.fetch(msg.author.id)
                console.log(member)

                await member.timeout(60_000);

            } catch (e) {
                console.log("Error: ", e);
            }
        }
    }
})


module.exports = { client }