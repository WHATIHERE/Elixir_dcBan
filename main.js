
let path = require('path');
let fs = require('fs');
let folderName = "Elixir_dcBan";
const directoryPath = path.join(process.cwd());

if (directoryPath.search(folderName) == -1) {
    console.log('Please change folder name to Elixir_dcBan');
    return;
} else {
    const discord = require('discord.js')
    const config = require('./config')
    const console = require('./utils/console')

    let client = new discord.Client({
        intents: [
            discord.IntentsBitField.Flags.GuildMembers,
            discord.IntentsBitField.Flags.Guilds,
            discord.IntentsBitField.Flags.GuildMessages,
            discord.IntentsBitField.Flags.MessageContent,
        ]
    })

    const connection = require('./utils/sql')

    const task = 'CLIENT'

    client.on('ready', () => {
        client.user.setActivity({ type: "STREAMING", name: "ELIXIR DISCORD BOT", url: "https://www.twitch.tv/elixirbot" })
        client.user.setStatus('dnd')
        console.log(task, '\033[32mCLIENT CONNECT SERVER\033[32m')
    })


    client.on('messageCreate', async (message) => {
        const prefix = config.prefix;


        if (!message.content.startsWith(prefix) || message.author.bot) return;


        const args = message.content.slice(prefix.length).split(/ +/);

        const command = args.shift().toLowerCase();

        if (config.steam == true) {
            if (command == config.commandsBansteam) {

                if (!message.member.permissions.has(discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [embedsReply('You do not have permission to use this command.')] }).then(msg => { msg.delete({ timeout: 25000 }) })

                let steam = args[0]
                let discord_id = args[1]
                let reason = args[2]
                let time = args[3]


                if (!steam) return message.reply({ content: 'โปรดใส่ Steam ของผู้ใช้งานให้ถูกต้อง' })
                if (!discord_id) return message.reply({ content: 'โปรดใส่ ID ของผู้ใช้งานให้ถูกต้อง' })
                if (!reason) return message.reply({ content: 'โปรดใส่เหตุผลให้ถูกต้อง' })
                if (!time) return message.reply({ content: 'โปรดใส่เวลาให้ถูกต้อง' })

                connection.query('SELECT * FROM `bans` WHERE `steam` = ? OR `discord_id` = ?', [steam, discord_id], (err, rows) => {
                    if (err) throw err;
                    if (rows.length < 1) {
                        connection.query('INSERT INTO `bans` (`steam`, `discord_id`, `reason`, `time`) VALUES (?, ?, ?, ?)', [steam, discord_id, reason, time], (err, rows) => {
                            if (err) throw err;
                            message.channel.send({ embeds: [embedsReply(`แบนสำเร็จ\n**steam:** ${steam}\n**Discord ID:** ${discord_id}\n**Reason:** ${reason}\n**Time:** ${time}`)] })
                        })
                    } else {
                        message.channel.send({ embeds: [embedsReply('พบข้อมูลในระบบแล้ว')] }).then(msg => { msg.delete({ timeout: 100000 }) })
                    }
                })
            }
        } else {
            if (command == config.commandsBanlicense) {

                if (!message.member.permissions.has(discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [embedsReply('You do not have permission to use this command.')] }).then(msg => { msg.delete({ timeout: 25000 }) })

                let license = args[0]
                let discord_id = args[1]
                let reason = args[2]
                let time = args[3]


                if (!license) return message.reply({ content: 'โปรดใส่ License ของผู้ใช้งานให้ถูกต้อง' })
                if (!discord_id) return message.reply({ content: 'โปรดใส่ ID ของผู้ใช้งานให้ถูกต้อง' })
                if (!reason) return message.reply({ content: 'โปรดใส่เหตุผลให้ถูกต้อง' })
                if (!time) return message.reply({ content: 'โปรดใส่เวลาให้ถูกต้อง' })

                connection.query('SELECT * FROM `bans` WHERE `license` = ? OR `discord_id` = ?', [license, discord_id], async (err, rows) => {
                    if (err) throw err;
                    if (rows.length < 1) {
                        connection.query('INSERT INTO `bans` (`license`, `discord_id`, `reason`, `time`) VALUES (?, ?, ?, ?)', [license, discord_id, reason, time], (err, rows) => {
                            if (err) throw err;
                            message.channel.send({ embeds: [embedsReply(`แบนสำเร็จ\n**license:** ${license}\n**Discord ID:** ${discord_id}\n**Reason:** ${reason}\n**Time:** ${time}`)] })
                        })

                        let channel = await client.channels.fetch(config.channelid)

                        channel.send({ embeds: [embedsReply(`แบนสำเร็จ\n**license:** ${license}\n**Discord ID:** <@${discord_id}> &${discord_id} \n**Reason:** ${reason}\n**Time:** ${time}`)] })

                    } else {
                        message.channel.send({ embeds: [embedsReply('พบข้อมูลในระบบแล้ว')] }).then(msg => {
                            setTimeout(() => {
                                msg.delete({ timeout: 10 })
                            }, 5000);
                            setTimeout(() => {
                                message.delete()
                            }, 5000);
                        })
                    }
                })


            }
        }


        if (command == config.commandsBanCheck) {
            if (!message.member.permissions.has(discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [embedsReply('You do not have permission to use this command.')] }).then(msg => { msg.delete({ timeout: 25000 }) })
            connection.query('SELECT * FROM `bans` WHERE `discord_id` = ?', [args[0]], (err, rows) => {
                if (err) throw err;

                if (isNaN(args[0])) return message.reply({ content: 'โปรดใส่ ID ของผู้ใช้งานให้ถูกต้อง' })

                if (rows.length < 1) return message.channel.send({ embeds: [embedsReply('ไอดีดิสคอร์ดนี้ไม่ได้ถูกแบน')] })

                let license = rows[0].license
                let steam = rows[0].steam
                let discord_id = rows[0].discord_id

                if (config.steam == true) {
                    let embed = new discord.EmbedBuilder()
                        .setAuthor({ name: config.servername, iconURL: config.iconURL, url: 'https://discord.gg/Zum9mmUP7b' })
                        .setTitle('BAN CHECK')
                        .setDescription(`**${config.messageban}**\n\n**Steam:** ${steam ? steam : 'ไม่พบข้อมูล'}\n**Discord ID:** ${discord_id}`)
                        .setColor('Red')
                        .setImage('https://cdn.discordapp.com/attachments/1100093108965879811/1104530337129840740/YOUR-IMPOSTER-2.png')
                        .setFooter({ text: 'Elixir Bot', iconURL: 'https://cdn.discordapp.com/attachments/1100093108965879811/1104477628561358998/TopPNG.png' })

                    message.channel.send({ embeds: [embed] })
                } else {

                    let embed = new discord.EmbedBuilder()
                        .setAuthor({ name: config.servername, iconURL: config.iconURL, url: 'https://discord.gg/Zum9mmUP7b' })
                        .setTitle('BAN CHECK')
                        .setDescription(`**${config.messageban}**\n\n**License:** ${license ? license : 'ไม่พบข้อมูล'}\n**Steam:** ${steam ? steam : 'ไม่พบข้อมูล'}\n**Discord ID:** ${discord_id}`)
                        .setColor('Red')
                        .setImage('https://cdn.discordapp.com/attachments/1100093108965879811/1104530337129840740/YOUR-IMPOSTER-2.png')
                        .setFooter({ text: 'Elixir Bot', iconURL: 'https://cdn.discordapp.com/attachments/1100093108965879811/1104477628561358998/TopPNG.png' })

                    message.channel.send({ embeds: [embed] })
                }


            })
        }

        if (command == config.commandsUnban) {

            if (!message.member.permissions.has(discord.PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [embedsReply('You do not have permission to use this command.')] }).then(msg => { msg.delete({ timeout: 25000 }) })

            connection.query('SELECT * FROM `bans` WHERE `discord_id` = ?', [args[0]], (err, rows) => {
                if (err) throw err;

                if (isNaN(args[0])) return message.reply({ content: 'โปรดใส่ ID ของผู้ใช้งานให้ถูกต้อง' })

                if (rows.length < 1) return message.channel.send({ embeds: [embedsReply('ไอดีดิสคอร์ดนี้ไม่ได้ถูกแบน')] })

                connection.query('DELETE FROM `bans` WHERE `discord_id` = ?', [args[0]], (err, rows) => {
                    if (err) throw err;
                    message.channel.send({ embeds: [embedsReply('ยกเลิกแบนสำเร็จ')] })
                })
            })
        }

        if (command == "help") {

            let embed = new discord.EmbedBuilder()
                .setAuthor({ name: config.servername, iconURL: config.iconURL, url: 'https://discord.gg/Zum9mmUP7b' })
                .setTitle('คำสั่งทั้งหมด')
                .setDescription(`**${config.prefix}${config.commandsBanCheck}** <Discord ID>\n**${config.prefix}${config.commandsBansteam}** <Steam> <Discord ID> <Reason> <Time>\n**${config.prefix}${config.commandsBanlicense}** <License> <Discord ID> <Reason> <Time>\n**${config.prefix}${config.commandsUnban}** <Discord ID>`)
                .setColor('Green')
                .setFooter({ text: 'Elixir Bot', iconURL: 'https://cdn.discordapp.com/attachments/1100093108965879811/1104477628561358998/TopPNG.png' })
                .setTimestamp()
            message.channel.send({ embeds: [embed] })

        }
    })


    client.login(config.token)

    // process.on('uncaughtException', function (err) {
    //     console.error(err);
    //     console.log("Node NOT Exiting...");
    // });
    // process.on('unhandledRejection', (reason, p) => {
    //     console.log('=== unhandled Rejection ==='.toUpperCase());
    //     console.log('Promise: ', p, 'Reason: ', reason.stack ? reason.stack : reason);
    //     console.log('=== unhandled Rejection ==='.toUpperCase());
    // });

    function embedsReply(text) {
        return new discord.EmbedBuilder()
            .setTitle(client.user.tag)
            .setDescription(text)
            .setColor('#ff0000')
            .setFooter({ text: 'Elixir Bot', iconURL: 'https://cdn.discordapp.com/attachments/1100093108965879811/1104477628561358998/TopPNG.png' })
            .setTimestamp()
    }
}
