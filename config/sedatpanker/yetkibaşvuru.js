const Discord = require("discord.js");
const configirasyon = require('../ayar.json');
const db = require("quick.db");
const oyuncu = require('../ayar.json');
let taglı = configirasyon.taglı
let yetkilirol = configirasyon.yetkilirol;
let roll = configirasyon.null.roll;
let log = configirasyon.log;


module.exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(taglı)) {

    message.react(configirasyon.emojiler.reddet);
    return message.channel.send(new Discord.MessageEmbed().setColor("fbfd03").setDescription(`Bu komutu sadece üzerinde <@&${taglı}> olan kişiler kullanabilir.`)).then(x => x.delete({timeout: 15000}));

  };

  if (args[0] === "onay") {

    message.member.roles.cache.has

      if(!message.member.roles.cache.has(yetkilirol)) {
        message.react(configirasyon.emojiler.reddet);
        return message.channel.send(new Discord.MessageEmbed().setColor("fbfd03").setDescription(`Bu komutu sadece üzerinde <@&${yetkilirol}> olan kişiler kullanabilir.`)).then(x => x.delete({timeout: 15000}));
      };


    let uyeler;
    let yarak = message.mentions.members.first();
    let memem = message.guild.members.cache.get(args[1]);
    if (yarak) {
      uyeler = yarak;
    }
    if (memem) {
      uyeler = memem;
    }
    if (!uyeler) {

      message.reply("`Lütfen Birisini etiketle ya da İD sini belirt.`");

    }
    let data = db.get(`basvuru.${uyeler.id}`);
    if (!data)
      return message.reply("`Bahsedilen Üyenin Bir Başvuru Talebi Bulunamadı`");

    uyeler.roles.add(roll);
    message.react(configirasyon.emojiler.onayla);
    message.channel.send(
      
      "`Başvuru Başarılı Bir Şekilde Onaylandı.\n Kullanıcın rolleri üzerine verildi.`"
    );

    uyeler.send(

      "Selam ben null `" + message.guild.name + "` sunucusunda yetkili olma talebin onaylandı iyi eğlenceler. :tada:"

    );


    db.delete(`basvuru.${uyeler.id}`);

  } else {

    if (args[0] === "red") {

      if(!message.member.roles.cache.has(yetkilirol)) {

        message.react(configirasyon.emojiler.reddet);
        return message.channel.send(new Discord.MessageEmbed().setColor("fbfd03").setDescription(`Bu komutu sadece üzerinde <@&${yetkilirol}> olan kişiler kullanabilir.`)).then(x => x.delete({timeout: 15000}));

      };

      let uyeler;
      let yarak = message.mentions.members.first();
      let memem = message.guild.members.cache.get(args[1]);
      if (yarak) {
        uyeler = yarak;
      }
      if (memem) {
        uyeler = memem;
      }
      if (!uyeler) {

        message.reply("`Lütfen Birisini etiketle ya da İD sini belirt.`");

      }
      let data = db.get(`basvuru.${uyeler.id}`);
      if (!data)
        return message.reply(
          "Bahsedilen Üyenin Bir Başvuru Talebi Bulunamadı."
        );
        message.react(configirasyon.emojiler.onayla);
      message.channel.send("`Başvuru Başarılı Bir Şekilde Reddedildi.`");

      uyeler.send(
        "Selam ben null! üzülerek söylüyorumki `" +message.guild.name +"` sunucusunda yetkili olma talebin reddedildi. :pleading_face:"
      );

      db.delete(`basvuru.${uyeler.id}`);

      // Sorular aşkım
    } else {
      let soru1 = "İsmin Nedir?";
      let soru2 = "Kaç Yaşındasın?";
      let soru3 = "Bize Ne Gibi Katkıların Ola Bilir? \n4. Haftalık Kaç İnvite Kasabilirsin ? \n5. Günlük Kaç Saat Seste Durabilirsin ? \n6. Gece Afk Bırakabilir misin ? \n7. Daha önce hiç başka bi sunucuda yetkili oldunmu ?";
      
      if (!args[0])
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Başvuru Talimatları")
            .setThumbnail(message.author.avatarURL())
            .setColor("#fffb00")
            .setDescription(`Başvuru Soruları:\n**1. ${soru1}\n2. ${soru2}\n3. ${soru3}**\n\n\`Örnek Kullanım:\` __.başvuru İsim Yaş Üstteki soruların cevapları.__`)
            .setTimestamp()
            .setFooter("Her hangi bir sorunda null#1002")
        );

      let data = db.get(`basvuru.${message.author.id}`);
      if (!data) {
        
        if (!args[0]) return message.reply("**İsmin Nedir Yazman Gerek!**");

        if (!args[1]) return message.reply("**Kaç Yaşındasın Yazman Gerek!**");

        if (!args.slice(2).join(" "))
          return message.reply(
            "**Bize Ne Gibi Katkıların Olur Yazman Gerek!**"
          );
        db.set(`basvuru.${message.author.id}`, "onayla");
        let spankerembedmesaj = message.guild.channels.cache.get(log);
        let yarram = message.guild.channels.cache.get(log);
       message.channel.send("`Başvurunuz başarı ile alındı iyi eğlenceler.`")
        let embedicerik = new Discord.MessageEmbed()

          .setTitle("Hey Yeni Bir Başvuru")
          .setColor("#fbfd03")
          .setThumbnail(message.author.avatarURL())
          .setDescription(
            `Başvuran: ${message.author}\nBaşvuran ID: \`${
              message.author.id
            }\`\n\nBaşvuran Bilgileri:\n**İsim:** \`${args[0]}\`\n**Yaş:** \`${
              args[1]
            }\`\n**Ne Yapa Bilir:** \`${args.slice(2).join(" ")}\``
          )
          .setTimestamp()
          .setFooter("null 💛 Light");
          yarram.send(`<@&${yetkilirol}> Yeni bir başvuru talebi lütfen gerekli işlemleri yapınız.`)
        return spankerembedmesaj.send(embedicerik).then(mr => {

      
          message.author.send(

            "`Başvuru talebin sisteme eklendi iyi eğlenceler.`"

          );;
        });
      } else {


        message.reply("`Zaten cevaplanmamış başvuru talebin var.`");


      }
    }
  }
};





module.exports.conf = {
  aliases: ["nullvurdu"]
};

module.exports.help = {
  name: "başvuru"

};