const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const configirasyon = require('../config/ayar.json');

var prefix = configirasyon.prefix;

module.exports = client => {
  client.user.setPresence({ activity: { name: "null 💛 Shields" }, status: "idle" });
  let botVoiceChannel = client.channels.cache.get(configirasyon.seskanalı);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Ses kanalına giriş başarısız"));
  console.log(`Aktifim Orospu evladı`);

};
