const Discord = require('discord.js');
const client = new Discord.Client();
const configirasyon = require('./config/ayar.json');
const chalk = require('chalk');
const Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');

require('./config/eventLoader')(client);

client.on('message', function() {
    { 
     var interval = setInterval (function () {
       process.exit(0);
     }, 1 * 14400000); 
   }
 });
// bu ne işe yarar ? 
// yukarıda gördüğünüz interval botu 4 saat arayla yeniden başlatır ve ping değeri veya düşme sorunlarını çözer basit bir çözüm yolu :D
var prefix = configirasyon.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./config/sedatpanker/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./config/sedatpanker/${f}`);
        log(`${props.help.name} Eklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./config/sedatpanker/${command}`)];
            let cmd = require(`./config/sedatpanker/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./config/sedatpanker/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./config/sedatpanker/${command}`)];
            let cmd = require(`./config/sedatpanker/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === configirasyon.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(configirasyon.token);


client.on('guildMemberAdd', member => {

const embed = new Discord.MessageEmbed()

.setTitle("Hey Sunucumuza Hoş Geldin!")
.setDescription("Sunucumuzda bulunan yapay zekaya sahip başvuru botumuzu denemek istermisin. \n\n sunucumuzda yetkili olmak için herangi bi kanala **__.başvuru__** yazabilirsin.")
.setFooter("Herangi bi sorunda null#1002")
.setColor("ORANGE")
member.send(embed);
});
 

// .setTitle('') = Başlık
// .addField('','') = Satır
// .setDescription('') = Açıklama
// .setFooter('') = Son Açıklama
// .setTimestamp() = Saat
// .setURL('') = Link
// .setThumbnail('') = Sağ Üste Resim
// .setColor('')= Renk
// .setImage('') = Gömülü Resim



//Hala internetim yok vee ama şimdi başvuru nasıl yapılır gibi soruların cevabını yaptım :)

client.on("message", message => {
    if(message.content.toLowerCase() == "nasıl başvuru yapabilirim") 
    return message.channel.send(`.başvuru Yazarak Başvuru yapabilirsin. ${message.author}`).then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
    if(message.content.toLowerCase() == "nasıl başvuru yaparım") 
    return message.channel.send(`.başvuru Yazarak Başvuru yapabilirsin. ${message.author}`).then(x => x.delete({ timeout: 8000 }));
});
client.on("message", message => {
    if(message.content.toLowerCase() == "!başvuru") 
    return message.channel.send("**Ünlem Yerine `.` Koymayı Dene!**").then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
    if(message.content.toLowerCase() == "başvuru nasıl yaparım") 
    return message.channel.send(`.başvuru Yazarak Başvuru yapabilirsin. ${message.author}`).then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
    if(message.content.toLowerCase() == "başvuru nasıl yapılır") 
    return message.channel.send(`.başvuru Yazarak Başvuru yapabilirsin. ${message.author}`).then(x => x.delete({ timeout: 8000 }));
});







