<<<<<<< Updated upstream:Commands/Chatbot/chatbot.js
const Discord = require('discord.js');


const Database = require('../../Structures/Database');

module.exports = {
	help: {
		name: 'chatbot',
		aliases: [],
		description: 'Shows the Chatbot config.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message) => {
		const db = await Database.findOne({ ID: `chatbot_${message.guild.id}` });
		const channel = db
			? message.guild.channels.cache.get(db.data)
				? `<#${message.guild.channels.cache.get(db.data).id}>`
				: 'None'
			: 'None';

		const embed = new Discord.MessageEmbed()
			.setThumbnail(client.user.avatarURL())
			.setTitle('🤖 Chatbot Configuration')
			.setDescription(
				`**Chatbot Channel:**
           ${channel}
           
          **${emotes.info} Usage:**
           Type \`${config.prefix}setchatbot\` - To Set a Channel 
           Type \`${config.prefix}disablechatbot\` - To Disable a Channel.
  
          **${emotes.info} Example:**
           \`${config.prefix}setchatbot\` <#${message.channel.id}>
           \`${config.prefix}disablechatbot\``,
			)
			.addField(
				'Support Link: ',
				'**[Click Here!](https://discord.gg/NtyaM9d)**',
				true,
			)
			.addField(
				'Vote Link:',
				'**[Click Here!](https://top.gg/bot/636484020301201418/vote)**',
				true,
			)
			.setTimestamp()
			.setFooter('© Karma', 'https://i.imgur.com/U34MPtp.png')
			.setColor(config.embedColor);

		message.reply({ embeds: [embed] });
	},
};
=======
const Discord = require('discord.js')
const { db } = require('../../Structures/Database')

module.exports = {
    help: {
        name: 'chatbot',
        aliases: ['chatbot'],
        description: 'Shows the Chatbot config.',
        category:  __dirname.split("Commands\\")[1]
    },
    run: async(client, message) => {
       
        const embedd = new Discord.MessageEmbed()
        .setThumbnail(client.user.avatarURL())
        .setDescription(
          `🤖 ChatBot Configuration 
  
          **${emotes.info} Usage :**
           Type \`${config.prefix}setchatbotchannel\` - To Set a Channel 
           Type \`${config.prefix}disablechatbotchannel\` - To Disable a Channel.
           ChatBot Channel Set - None
  
          **${emotes.info} Examples :**
           \`${config.prefix}setchatbotchannel\` <#${message.channel.id}>
           \`${config.prefix}disablechatbotchannel\` <#${message.channel.id}>`
        )
       .addField(
          "Support Link: ",
          `**[Click Here!](https://discord.gg/NtyaM9d)**`,
          true
        )
        .addField(
          "Vote Link:",
          `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`,
          true
        )
        .setTimestamp()
        .setFooter(
          "© Karma",
          "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
        )
        .setColor(config.embedcolor);
      
       let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
      if(!channel1) return message.channel.send(embedd)
      var sChannel = message.guild.channels.cache.get(channel1);
      let embedvch = "<#" + sChannel.id + ">"
      
      const embed = new Discord.MessageEmbed()
      
        .setThumbnail(client.user.avatarURL())
        .setDescription(
          `**🤖 ChatBot Configuration** 
  
          **${emotes.info} Usage :**
           Type \`${config.prefix}setchatbotchannel\` - To Set a Channel 
           Type \`${config.prefix}disablechatbotchannel\` - To Disable a Channel.
           ChatBot Channel Set - ${embedvch} 
  
          **${emotes.info} Examples :**
           \`${config.prefix}setchatbotchannel\` <#${message.channel.id}>
           \`${config.prefix}disablechatbotchannel\` <#${message.channel.id}>`
                       )
       .addField(
          "Support Link: ",
          `**[Click Here!](https://discord.gg/NtyaM9d)**`,
          true
        )
        .addField(
          "Vote Link:",
          `**[Click Here!](https://top.gg/bot/636484020301201418/vote)**`,
          true
        )
        .setTimestamp()
        .setFooter(
          "© Karma",
          "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
        )
        .setColor(config.embedcolor);
      message.channel.send(embed);

    }
}
>>>>>>> Stashed changes:old/Commands/Chatbot/chatbot.js
