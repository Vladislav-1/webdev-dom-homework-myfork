import { comments } from './comments.js';
import { sanitizeHtml } from './sanitizeHtml.js';
import { renderComments } from './renderComments.js';

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll('.like-button');

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            const comment = comments[index];
            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1;
            comment.isLiked = !comment.isLiked;
            renderComments();
        });
    }
};

export const initReplyListeners = () => {
    const text = document.getElementById('text-input');
    const commentsElements = document.querySelectorAll('.comment');

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index];
            text.value = `${currentComment.name}: "${currentComment.text}"`;
        });
    }
};

export const initAddCommentListener = () => {
    let currentData = new Date();
    let currentDataNumber = currentData.getDate();
    let currentMonth = currentData.getMonth() + 1;
    let currentYear = currentData.getFullYear() % 100;
    if (currentMonth < 10) {
        currentMonth = `0${currentMonth}`;
    }
    let options = { hour: '2-digit', minute: '2-digit' };
    let currentLocalTime = currentData.toLocaleTimeString('ru-RU', options);
    const name = document.getElementById('name-input');
    const text = document.getElementById('text-input');

    const addButton = document.querySelector('.add-form-button');

    addButton.addEventListener('click', () => {
        const newComment = {
            name: sanitizeHtml(name.value),
            date: `${currentDataNumber}.${currentMonth}.${currentYear} ${currentLocalTime}`,
            text: sanitizeHtml(text.value),
            likes: 0,
            isLiked: false,
        };

        if (name.value === '') {
            name.style.background = 'red';
        }
        if (text.value === '') {
            text.style.background = 'red';
        }
        if (name.value != '' && text.value != '') {
            comments.push(newComment);
            name.style.background = 'rgb(255,255,255)';
            text.style.background = 'rgb(255,255,255)';
        }

        renderComments();

        name.value = '';
        text.value = '';
    });
};
