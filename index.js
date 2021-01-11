const Discord = require('discord.js');
const fetch = require('node-fetch');
const {
    token,
    status,
    prefix
} = require('./misc/config.json');
const client = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
});
client.util = require('./util');

client.on('warn', err => console.warn('[WARNING]', err));

client.on('error', err => console.error('[ERROR]', err));

client.on('ready', () => {
    console.log('Micu żyje');
    client.user.setActivity("being neko", {
        type: "STREAMING",
        url: "https://www.twitch.tv/monstercat"
    });
});

client.on('disconnect', () => {
    console.warn('Jednak nie żyje')
    process.exit(0);
});

client.on('uncaughtException', (err) => {
    console.log('Uncaught Exception: ' + err)
    process.exit(1)
});


client.on('message', (msg) => {
    if (msg.author.bot) return;
    if (msg.guild) {
        if (msg.content.toLowerCase().startsWith(`micu `) || msg.content.toLowerCase().startsWith(`micu `)) {
            client.util.handleTalk(msg);
        }
    }
});

client.on('message', async message => {
    if (message.content.toLowerCase().startsWith(`${prefix}hug`)) {
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        const hug = await fetch('https://api.furrycentr.al/sfw/hug/').then(Response => Response.json());
        if(hug){
            console.log('API: ', hug.result.status)
            if (!message.mentions.users.first()) {
                return message.channel.send(`${message.author} hugs nobody :<`);
            }
            else {
                message.channel.send(`${message.author} hugs **${message.mentions.users.first().username}** gently`);
            message.channel.send(hug.result.imgUrl);
           }
         }
    }
});

client.on('message', async message => {
    if (message.content.toLowerCase().startsWith(`${prefix}boop`)) {
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        const boop = await fetch('https://api.furrycentr.al/sfw/boop/').then(Response => Response.json());
        if(boop){
            console.log('API: ', boop.result.status)
            if (!message.mentions.users.first()) {
                return message.channel.send(`${message.author} boops nobody :<`);
            }
            else {
                message.channel.send(`${message.author} boops **${message.mentions.users.first().username}** UwU`);
            message.channel.send(boop.result.imgUrl);
           }
         }
    }
});

client.on('message', async message => {
    if (message.content.toLowerCase().startsWith(`${prefix}lick`)) {
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
        const lick = await fetch('https://api.furrycentr.al/sfw/lick/').then(Response => Response.json());
        if(lick){
            console.log('API: ', lick.result.status)
            if (!message.mentions.users.first()) {
                return message.channel.send(`${message.author} licks nobody :<`);
            }
            else {
                message.channel.send(`${message.author} licks **${message.mentions.users.first().username}** *blep*`);
            message.channel.send(lick.result.imgUrl);
           }
         }
    }
});

client.on('message', (msg) => {
    if (msg.author.bot) return;
    if (msg.guild) {
        if (msg.content.toLowerCase().startsWith(`${prefix}help`)) {
            msg.channel.send({embed: {
                color: 16711751,
                title: "Help",
                fields: [
                  { name: "Commands", value: ">help to show this\nmicu and any sentence to talk to AI\n>hug to hug somebody\n>boop to boop\n>lick to lick"},
                ]
              }
            });
        }
    }
});

client.on('message', (msg) => {
    
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('[FATAL] Nieobsługiwany błąd na: Promise ', promise, ' Reason: ', reason.message);
});

client.login(token);