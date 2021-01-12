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

client.login(token);

client.on('warn', err => console.warn('[WARNING]', err));

client.on('error', err => console.error('[ERROR]', err));

client.on('ready', () => {
    console.log('Connected to APIs');
    client.user.setActivity("being neko", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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

process.on('unhandledRejection', (reason, promise) => {
    console.log('[FATAL] Rejection on : Promise ', promise, ' Reason: ', reason.message);
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
            console.log('hug API: ', hug.result.status)
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
            console.log('boop API: ', boop.result.status)
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
            console.log('lick API: ', lick.result.status)
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

client.on('message', async message => {
    if (message.content.toLowerCase().startsWith(`${prefix}fursuit`)) {
        const fursuit = await fetch('https://loremflickr.com/json/480/720/fursuit,furry').then(Response => Response.json());
        if(fursuit){
            console.log('fursuit API: ', fursuit.tags)
            message.channel.send(fursuit.file);
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
                  { name: "Commands", value: ">help to show this\nmicu and any sentence to talk to AI\n>hug to hug somebody\n>boop to boop\n>lick to lick\n>fursuit to send random fursuit photo"},
                ]
              }
            });
        }
    }
});

client.on('message', (msg) => {
    if (msg.author.bot) return;
    if (msg.guild) {
        if (msg.content.toLowerCase().startsWith(`${prefix}latency`)) {
            var ping = (new Date().getTime() - msg.createdTimestamp) * -1
            var api = Math.round(client.ping)
            msg.channel.send({embed: {
                color: 16711751,
                title: "Latency",
                fields: [
                  { name: "Local ping: ", value: '**' + ping + '** ms'},
                  { name: "Bot ping: ", value: '**' + api + '** ms'}
                ]
              }
            });
        }
    }
});