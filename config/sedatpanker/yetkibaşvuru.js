// Hey Selam! Ben Spanker.
// Bu Porjeyi Yayınlamamın sebebi düzgün bir yetki başvuru botu olmamasıdır.
// herkes !başvuru ismin ve Soy İsmin nedir: berke yıldız (Gerçek İsmim Ve Soy İsmim) gibilerin aksine daha değişik ve ayrıntılı bir bot yapmaya çalıştım.
// iyi kodlamalar dilerim aptal botçular. :)
// null senin ananı sikti spanker haberin yok AHAHHAYT :)



// Emeği Geçen Kişiler; 
// Yapımcı kodlayıcı: Spanker
// Hatalarını Çözen Kişi: Null
const Discord = require("discord.js");
const configirasyon = require('../ayar.json');
const db = require("quick.db");

let yetkilirol = configirasyon.yetkilirol;
let roll = configirasyon.null.roll;
let log = configirasyon.log;


module.exports.run = async (client, message, args) => {

  if (args[0] === "onay") {

    message.member.roles.cache.has

      if(!message.member.roles.cache.has(yetkilirol)) {

        return message.channel.send("Hey! Bu komutu sadece Yetkili Alım Dm Kullanabilir!");
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

      message.reply("Hey! bir hata yaptın, Lütfen Birisini etiketle ya da İD sini belirt.");

    }
    let data = db.get(`basvuru.${uyeler.id}`);
    if (!data)
      return message.reply("Bahsedilen Üyenin Bir Başvuru Talebi Bulunamadı!");

    uyeler.roles.add(roll);

    message.channel.send(
      
      "Hey Sana İyi Bir Haberim Var! Başvuru Başarılı Bir Şekilde Onaylandı."
    );

    uyeler.send(

      "Selam Ben Spanker! " +
        message.guild.name +
        " Sunucusunda Yetkili Olma Talebin Onaylandı! :tada:"

    );


    db.delete(`basvuru.${uyeler.id}`);

  } else {

    if (args[0] === "red") {

      if(!message.member.roles.cache.has(yetkilirol)) {

        return message.channel.send("Hey! Bu komutu sadece Yetkili Alım Dm Kullanabilir!");

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

        message.reply("Hey! bir hata yaptın, Lütfen Birisini etiketle ya da İD sini belirt.");

      }
      let data = db.get(`basvuru.${uyeler.id}`);
      if (!data)
        return message.reply(
          "Bahsedilen Üyenin Bir Başvuru Talebi Bulunamadı!"
        );

      message.channel.send("Hey Sana İyi Bir Haberim Var! Başvuru Başarılı Bir Şekilde Reddedildi.");

      uyeler.send(
        "Hey Ben Spanker! Üzülerek Söylüyorumki " +
          message.guild.name +
          " Sunucusunda Yetkili Olma Talebin Reddedildi!"
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
            .setColor("RANDOM")// Null beğendiğin bi renk varsa yaz yarram 
            .setDescription(`Başvuru Soruları:\n**1. ${soru1}\n2. ${soru2}\n3. ${soru3}**\n\n\`Örnek Kullanım:\` __.başvuru İsim Yaş Üstteki soruların cevapları.__`)
            .setTimestamp()
            .setFooter("Bir Sorun Olursa Spanker#0091 null#4000")
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
       // message.channel.send(`${spxnker.yetkilirol} Lütfen gereken işlemi yapınız.`)
        let embedicerik = new Discord.MessageEmbed()

          .setTitle("Hey Yeni Bir Başvuru!")
          .setColor("RANDOM")
          .setThumbnail(message.guild.iconURL())
          .setDescription(
            `Başvuran: ${message.author}\nBaşvuran ID: \`${
              message.author.id
            }\`\n\nBaşvuran Bilgileri:\n**İsim:** \`${args[0]}\`\n**Yaş:** \`${
              args[1]
            }\`\n**Ne Yapa Bilir:** \`${args.slice(2).join(" ")}\``
          )
          .setTimestamp()
          .setFooter("Bir Sorun Olursa Spanker#0091 null#4000");
        return spankerembedmesaj.send(embedicerik).then(mr => {
          
        

          message.channel.send(

            "Hey! Sana iyi bir haberim var! Başvurunu Başarıyla Sisteme Ekledim!"

          );
        });
      } else {


        message.reply("Zaten Henüz Cevaplanmamış Bir Başvurun Var!");


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