const subscribeUrl = 'https://t.me/+U483ZMPwLPlhZjJi';
const signsImage = 'https://i.ibb.co/5hwnWc08/photo-2024-01-16-18-18-14.jpg';
const getFormattedDate = require('../helpers/helper');

const signsPrompt = {
    role: "user",
    content: 
    `
    Напиши мне список примет на сегодняшний день. Довольно кратко, разбив на абзацы, желательно пунктов 6-7. Не превышай общий объем по символам  (1024 символа). 
    1. Заголовок должен быть таким: <b>📌 ПРИМЕТЫ НА ${getFormattedDate()}?</b>
    2. Далее - отступ и основное содержание. Сами приметы по пунктам (emoji 🟣 + текст приметы). 
    3. В завершении, сделать текст-ссылку со словами: <a href="${subscribeUrl}">Подписаться ★ Бюро эзотерика</a>

    так как я использую parseMode: HTML, то воспользуемся html-тегами (например <b>bold</b>, <i>italic</i>), но не используй для переноса строк <br>
    `
};

module.exports = signsPrompt;
module.exports.signsImage = signsImage;