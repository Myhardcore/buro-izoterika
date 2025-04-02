const subscribeUrl = 'https://t.me/+U483ZMPwLPlhZjJi';
const prohibitionsImage = 'https://i.ibb.co/zWvbgtXy/photo-2024-01-16-18-18-28.jpg'
const getFormattedDate = require('../helpers/helper');
const prohibitionsPrompt = {
    role: "user",
    content: 
    `
    Напиши мне список запретов на сегодняшний день. Довольно кратко, разбив на абзацы, желательно пунктов 6-7. Не превышай общий объем по символам  (1024 символа). 
    1. Заголовок должен быть таким: <b>✖ ЧТО НЕЛЬЗЯ ДЕЛАТЬ ${getFormattedDate()}?</b>
    2. Далее - отступ и основное содержание. Сами запреты по пунктам (emoji 🔵 + текст запрета). 
    3. В завершении, сделать текст-ссылку со словами: <a href="${subscribeUrl}">Подписаться ★ Бюро эзотерика</a>

    так как я использую parseMode: HTML, то воспользуемся html-тегами (например <b>bold</b>, <i>italic</i>), но не используй для переноса строк <br>
    `
};

module.exports = prohibitionsPrompt;
module.exports.prohibitionsImage = prohibitionsImage;
