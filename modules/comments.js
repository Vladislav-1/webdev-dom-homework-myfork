let currentData = new Date();
let currentDataNumber = currentData.getDate();
let currentMonth = currentData.getMonth() + 1;
let currentYear = currentData.getFullYear() % 100;
if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
}
let options = { hour: '2-digit', minute: '2-digit' };
let currentLocalTime = currentData.toLocaleTimeString('ru-RU', options);

export let comments = [
    {
        name: 'Глеб Фокин',
        date: `${currentDataNumber}.${currentMonth}.${currentYear} ${currentLocalTime}`,
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: `${currentDataNumber}.${currentMonth}.${currentYear} ${currentLocalTime}`,
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: false,
    },
];
