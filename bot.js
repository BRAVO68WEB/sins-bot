const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }  );
const {token,prefix} = require('./config.json')
client.once('ready', () => {
	console.log('Ready!');
});
const { API } = require("nhentai-api");
const api = new API();
const pagination = require("discord.js-pagination");

client.on("message", (message) => {
  if (message.content === "n&help") {
    const coverEmbed = new Discord.MessageEmbed()
      .setColor("#f04668")
      .setTitle(`Sin's Bot`)
      .setDescription(`All available commands for Sin's bot`)
      .addFields(
        {
          name: "n&cover xxxxxx",
          value: `Get the Image of the Cover of Doujinshi`,
          inline: true,
        },
        {
          name: "n&read xxxxxx",
          value: `Get the Entire Doujinshi in forms of Embedded messages`,
          inline: true,
        },
        {
          name: "n&about",
          value: `To know About of Sin's Bot`,
        }
      )
      .setTimestamp();
    message.channel.send(coverEmbed);
  }
});
client.on("message", (message) => {
  if (message.content === "n&about") {
    const coverEmbed = new Discord.MessageEmbed()
      .setColor("#9b42f5")
      .setTitle(`Sin's Bot`)
      .setImage(
        `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`
      )
      .setDescription(
        `An Discord by which Connects to nHentai and Returns images to You.`
      )
      .addFields(
        {
          name: "Invite",
          value: `https://discord.com/oauth2/authorize?client_id=862307032002854912&scope=bot&permissions=117824`,
          inline: true,
        },
        {
          name: "Github",
          value: `https://github.com/BRAVO68WEB/sins-bot`,
          inline: true,
        }
      )
      .setAuthor("Bravo68web")
      .setFooter("Build by Bravo68web")
      .setThumbnail(`https://avatars.githubusercontent.com/u/41448663?s=60&v=4`)
      .setTimestamp();
    message.channel.send(coverEmbed);
  }
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!message.channel.nsfw) {
    message.channel.send(
      "This command can only be used in channels marked nsfw."
    );
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  if (command === "cover") {
    console.log(message.author.username + " requested cover for " + args[0]);
    api.getBook(args[0]).then((book) => {
      const coverEmbed = new Discord.MessageEmbed()
        .setColor("#fc0388")
        .setTitle(`${book.title.english}`)
        .setDescription(
          `${book.tags[0].name}, ${book.tags[1].name}, ${book.tags[2].name}, ${book.tags[3].name}`
        )
        .setURL(`https://nhentai.net/g/${book.id}`)
        .setImage(`${api.getImageURL(book.cover)}`, "\u200B")
        .addFields(
          { name: "❤️ *Favorites*", value: `${book.favorites}`, inline: true },
          {
            name: "🧾 *Pages*",
            value: `${book.pages.length}`,
            inline: true,
          }
        )
        .setFooter(
          client.user.username,
          `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`
        )
        .setTimestamp();
      message.channel.send(coverEmbed);
    });
  }
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (command === "read") {
    console.log(
      message.author.username + " requested entire Doujinshi  for " + args[0]
    );
    api.getBook(args[0]).then((book) => {
      for (var i = 0; i < book.pages.length; i++) {
        const mangaEmbed = new Discord.MessageEmbed()
          .setColor("#057435")
          .setTitle(`${book.title.english}`)
          .setDescription(
            `${book.tags[0].name}, ${book.tags[1].name}, ${book.tags[2].name}, ${book.tags[3].name}`
          )
          .setURL(`https://nhentai.net/g/${book.id}/${i + 1}`)
          .setImage(`${api.getImageURL(book.pages[i])}`, "\u200B")
          .addFields(
            {
              name: "❤️ *Favorites*",
              value: `${book.favorites}`,
              inline: true,
            },
            {
              name: "🧾 *Page*",
              value: `${i + 1} of ${book.pages.length}`,
              inline: true,
            }
          )
          .setTimestamp();
        message.channel.send(mangaEmbed);
      }
    });
    console.log(
      message.author.username +
        "'s requested entire Doujinshi  for " +
        args[0] +
        " was sent successfully!!"
    );
  }
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("emb2")) {
    const Hebergeur = new Discord.MessageEmbed()
      .setColor("#057435")
      .setTitle("Name")
      .addField("**__Image Post  : __**", "\u200B")
      .setTimestamp();

    const Invisible = new Discord.MessageEmbed()
      .setColor("#057435")
      .setTitle("Ok It works !")
      .addField("**__👻  : __**", "\u200B")
      .setTimestamp();

    const InfoBot = new Discord.MessageEmbed()
      .setColor("#0E4396")
      .setTitle("F")
      .addField("**__Create By Paimon__**", "\u200B")
      .setTimestamp();

    const pages = [Hebergeur, Invisible, InfoBot];
    const emojiList = ["◀️", "▶️"];
    const timeout = "120000";
    pagination(message, pages, emojiList, timeout);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  console.log(
    `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
  );
  console.log(
    `${reaction.count} user(s) have given the same reaction to this message!`
  );
});

client.login(token);