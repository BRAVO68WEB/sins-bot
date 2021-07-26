const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }  );
const {token,prefix} = require('./config.json')
client.once('ready', () => {
	console.log('Ready!');
});
const { API } = require('nhentai-api');
const log = console.log;
const api = new API();
const { MessageEmbed } = require('discord.js');
const pagination = require('discord.js-pagination');

client.on('message', message => {
	if (message.content === 'h&nhentai') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Lesss Goo !!');
	}
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(!message.channel.nsfw){ message.channel.send("This command can only be used in channels marked nsfw."); return; }
	const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'cover') {
        api.getBook(args[0]).then(book => {
            const coverEmbed = new Discord.MessageEmbed()
                .setColor("#fc0388")
                .setTitle(`${book.title.english}`)
                .setDescription(`${book.tags[0].name}, ${book.tags[1].name}, ${book.tags[2].name}, ${book.tags[3].name}`)
                .setURL(`https://nhentai.net/g/${book.id}`)
                .setImage(`${api.getImageURL(book.cover)}`, "\u200B")
                .addFields({ name: '❤️ *Favorites*', value: `${book.favorites}` })  
                .setTimestamp()       
            message.channel.send(coverEmbed);
        });
    }   
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'readall') {
        api.getBook(args[0]).then(book => {
            for (var i = 0; i < book.pages.length; i++) {
                const mangaEmbed = new Discord.MessageEmbed()
                .setColor("#057435")
                .setTitle(`${book.title.english}`)
                .setDescription(`${book.tags[0].name}, ${book.tags[1].name}, ${book.tags[2].name}, ${book.tags[3].name}`)
                .setURL(`https://nhentai.net/g/${book.id}`)
                .setImage(`${api.getImageURL(book.pages[i])}`, "\u200B")
                .addField(`❤️ *Favorites* ${book.favorites}`)
                .setTimestamp()
                message.channel.send(mangaEmbed);
            }
        });
    }
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith('emb2')){
        const Hebergeur = new Discord.MessageEmbed()
        .setColor("#057435")
        .setTitle("Name")
        .addField("**__Image Post  : __**", "\u200B")
        .setTimestamp()
        
        const Invisible = new Discord.MessageEmbed()
        .setColor("#057435")
        .setTitle("Ok It works !")
        .addField("**__👻  : __**", "\u200B")
        .setTimestamp()
    
        const InfoBot = new Discord.MessageEmbed()
        .setColor("#0E4396")
        .setTitle("F")
        .addField("**__Create By Paimon__**", "\u200B")
        .setTimestamp()
        
        const pages = [
            Hebergeur,
            Invisible,
            InfoBot
    ]
    const emojiList = ["◀️", "▶️"];
    const timeout = '120000';
    pagination(message, pages, emojiList, timeout)
    }
})


client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

client.login(token);