const getFormattedDate = () => {
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня", 
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    
    return `${day} ${month} ${year}`;
};

module.exports = getFormattedDate;
