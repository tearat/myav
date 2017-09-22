const TelegramBot = require('node-telegram-bot-api');
const token = '317841350:AAEhMiTQ-rt9r2OlnBc79EoC53koKgEauo4';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    
    if (msg.text.toLowerCase().indexOf('hi') === 0) {
        bot.sendMessage(msg.chat.id, "Привет, " + msg.from.first_name);
    } 
    
    
    if (msg.text.toLowerCase().indexOf('мяв') === 0) {
        bot.sendMessage(msg.chat.id, "Мяв!");
        console.log(msg.from.first_name + " is writing: " + msg.text)
    } 
    
});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome");
    
});