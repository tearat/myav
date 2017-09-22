const TelegramBot = require('node-telegram-bot-api');
const token = '317841350:AAEhMiTQ-rt9r2OlnBc79EoC53koKgEauo4';

const bot = new TelegramBot(token, {polling: true});

var meows_data = {};

function random(max)
{
    let temp = Math.round(Math.random()*max);
    return temp;
}

function ans(msg=msg, text, options = {})
{
    bot.sendMessage(msg.chat.id, text, options);
    console.log('ans -> '+text);
    console.log('');
}

bot.on('message', (msg) => {
    console.log(msg.from.first_name + " is writing: " + msg.text);
    
    var answers = {
        "привет": "Привет, "+msg.from.first_name+"! Мяв!",
        "мяу": "мяу!",
        "meow": "meow!",
        "пока": "Пока!",
        "ид": msg.from.id,
    }
    
    for (var answer in answers) {
        if ( msg.text.toLowerCase().indexOf(answer) != -1 )
            {
                ans( msg, answers[answer] );
            }
    }
    
    if (msg.text.toLowerCase().indexOf('мяв') === 0) 
    {
        var count = 0;
        if ( !meows_data[msg.from.id] )
        {
            meows_data[msg.from.id] = 1;
        }
        else if ( meows_data[msg.from.id] > 0 )
        {
            meows_data[msg.from.id] += 1;
            count = meows_data[msg.from.id];
        }
        console.log(JSON.stringify(meows_data));
        switch (count)
        {
            case 10:
                ans( msg, "Сколько можно мявкать?" );
                break
            case 20:
                ans( msg, "Ты так всю жизнь промявкаешь!!" );
                break
            case 30:
                ans( msg, "Ты что, совсем кукусь?" );
                break
            default:
                var meows = ['мяв', "мяв!", "МЯВ", "м\nя\nв", "мяяяяв", "вям"];
                var kus = random(42);
                
                if (kus == 42) 
                { 
                    ans( msg, "Кусь!!!" );
                }
                else 
                { 
                    ans( msg, meows[ random(meows.length) ] );
                }
                break
        }
        
    }
    
    if (msg.text.toLowerCase().indexOf('фото') === 0) {
        var rnd = Math.random()*4;
        rnd = Math.round(rnd);
        const photo = `${__dirname}\\img\\`+rnd+`.jpg`;
        console.log(photo);
        bot.sendPhoto( msg.chat.id, photo, {} );
    }
    
    // under
    // construction
    if (msg.text.toLowerCase().indexOf('мб') === 0) {
        bot.sendMessage(msg.chat.id, "<pre>0000000000\n00100•0000</pre>", {parse_mode : "HTML"} );
    }
    
});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Meow! I am Myav bot and I can meow as many times as you wish, not like your fool cat running away from you under the bed and sitting there while you cry. Welcome!~");
    
});

bot.onText(/ap (.+) (.+)/, (msg, match) => {
    var target = match[1];
    var text = match[2];
    bot.sendMessage(msg.chat.id, target+text);
    
});