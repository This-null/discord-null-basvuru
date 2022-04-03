const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayar = require('../config/ayar.json');

var prefix = ayar.prefix;

module.exports = client => {
  setInterval(() => {
    const ekmek = Math.floor(Math.random() * (ayar.oyun.length));
    client.user.setActivity(`${ayar.oyun[ekmek]}`, {type: "LISTENING"});
}, 10000);
client.user.setStatus("idle");
console.log(`${client.user.tag} olarak giriş yapıldı.`);
  let botVoiceChannel = client.channels.cache.get(ayar.seskanalı);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Ses kanalına giriş başarısız"));

};
