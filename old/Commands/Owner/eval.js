<<<<<<< Updated upstream:Commands/Owner/eval.js
const undici = require('undici');
const Discord = require('discord.js');

const Functions = require('../../Base/Functions');

module.exports = {
	help: {
		name: 'eval',
		aliases: ['evaluate', 'e'],
		description: 'Evaluate javascript code.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		if (config.devs !== message.author.id) return;

		try {
			const code = args.join(' ');
			if (!code) {
				return message.reply('Please provide a valid code to evaluate');
			}
			let evaled = eval(code);
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
			evaled = Functions.cleanEval(evaled, config.token);
			if (evaled.length > 4000) {
				const body = new undici.FormData();
				body.set('title', `Eval by ${message.author.tag}`);
				body.set('content', evaled);
				const { hash } = await undici.fetch('https://api.ctrl-v.app/api', {
					body: body,
					method: 'POST',
				}).then((res) => res.json());
				const embed = new Discord.MessageEmbed()
					.setDescription(
						`The result exceeded the text limit. So, I uploaded it on **[Bin](https://ctrl-v.app/${hash})** | **[Raw Code](https://ctrl-v.app/raw/${hash})**`,
					)
					.setColor('#43b481');
				return message.reply({ embeds: [embed] });
			}
			const embed = new Discord.MessageEmbed()
				.setDescription('```js' + '\n' + evaled + '\n' + '```')
				.setColor('#43b481');
			return message.reply({ embeds: [embed] });
		} catch (err) {
			console.log(err);
			const body = new undici.FormData();
			body.set('title', `Eval by ${message.author.tag}`);
			body.set('content', String(err));
			const { hash } = await undici.fetch('https://api.ctrl-v.app/api', {
				body: body,
				method: 'POST',
			}).then((res) => res.json());
			const embed = new Discord.MessageEmbed()
				.setDescription(`**[An error occured](https://ctrl-v.app/${hash})**`)
				.setColor('#f04947');
			return message.reply({ embeds: [embed] });
		}
	},
};
=======

module.exports = {
    help: {
        name: 'eval',
        aliases: ['eval'],
        description: 'Evaluate any Javascript Code.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message) => {

        if (config.devs !== message.author.id) return message.channel.send('Only the Developer can use this command.');

        const content = message.content.split(' ').slice(1).join(' ');
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== 'string') {
                output = require('util').inspect(output, { depth: 0 });
            }
            if (output.includes(client.token)) {
                output = output.replace(message.client.token, 'T0K3N');
            }
            message.channel.send(output, {
                code: 'js'
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(message.client.token)) {
                err = err.replace(message.client.token, 'T0K3N');
            }
            message.channel.send(err, {
                code: 'js'
            });
        });

    }
}
>>>>>>> Stashed changes:old/Commands/Owner/eval.js
