const subscribeUrl = 'https://t.me/+U483ZMPwLPlhZjJi';
const horoscopeImage = 'https://i.ibb.co/nqfv9MHY/photo-2024-01-16-19-02-46.jpg';
const getFormattedDate = require('../helpers/helper');

const horoscopePrompt = {
    role: "user",
    content: 
    `
    Напиши мне гороскоп на сегодняшний день. Очень кратко, буквально по 1 строчке на каждый знак зодиака. 
    1. Заголовок должен быть таким: <b>ГОРОСКОП НА ${getFormattedDate()}</b>
    2. Далее - отступ и основное содержание. Сам гороскоп (emoji знаков зодиака + название знака зодиака и уже текст с самим гороскопом).
    3. Далее - небольшой совет на день с каким-нибудь emoji в формате Совет дня: (текст совета) + emoji.
    
    5. В завершении, сделать текст-ссылку со словами: <a href="${subscribeUrl}">Подписаться ★ Бюро эзотерика</a>

    так как я использую parseMode: HTML, то воспользуемся html-тегами (например <b>bold</b>, <i>italic</i>), но не используй для переноса строк <br>
    `
};

module.exports = horoscopePrompt;
module.exports.horoscopeImage = horoscopeImage;