//prompts spam
const horoscopePrompt = require('./prompts/horoscopePrompt.js');
const prohibitionsPrompt = require('./prompts/prohibitionsPrompt.js');
const signsPrompt = require('./prompts/signsPrompt.js');
const tipsPrompt = require('./prompts/tipsPrompt.js');
//img spam
const horoscopeImage = require('./prompts/horoscopePrompt.js').horoscopeImage;
const prohibitionsImage = require('./prompts/prohibitionsPrompt.js').prohibitionsImage;
const signsImage = require('./prompts/signsPrompt.js').signsImage;
const tipsImage = require('./prompts/tipsPrompt.js').tipsImage;

const telegramApi = require('node-telegram-bot-api');
const schedule = require('node-schedule');

//TODO: вынести нахуй токены
require('dotenv').config();
const botToken = process.env.BOT_TOKEN;
const ioSecretKey = process.env.IO_SECRET_KEY;
const channelId = process.env.CHANNEL_ID;

const url = 'https://api.intelligence.io.solutions/api/v1/chat/completions';

const bot = new telegramApi(botToken, {polling: true});

async function generatePost(prompt, imageUrl) {
    const fetch = (await import('node-fetch')).default;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${ioSecretKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-ai/DeepSeek-R1',
            messages: [
                { role: 'system', content: 'Ты телеграм блогер Мария, ведешь канал по эзотерике.' },
                prompt
            ]
        }),
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const messageContent = data.choices[0].message?.content.split('</think>\n\n')[1];
            if (messageContent) {
                bot.sendPhoto(channelId, imageUrl, {
                    caption: messageContent,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                });
                console.log('Пост отправлен:', messageContent);
            } else {
                console.error('Ошибка: В ответе отсутствует content.');
            }
        } else {
            console.error('Ошибка: Неверный формат ответа.');
        }
    } catch (err) {
        console.error('Ошибка запроса:', err);
    }
}

// Запуск постов по расписанию
schedule.scheduleJob(`0 8 * * *`, () => generatePost(horoscopePrompt, horoscopeImage)); // 8:00 - Гороскоп
schedule.scheduleJob('30 12 * * *', () => generatePost(signsPrompt, signsImage)); // 12:30 - Приметы
schedule.scheduleJob('10 18 * * *', () => generatePost(prohibitionsPrompt, prohibitionsImage)); // 18:00 - Запреты
schedule.scheduleJob('30 21 * * *', () => generatePost(tipsPrompt, tipsImage)); // 21:30 - Советы

// Генерация по запросу пользователя
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Пост генерируется, подождите...');
    generatePost(horoscopePrompt, horoscopeImage); 
});