import { comments } from './comments.js';
import { initLikeListeners } from './initListeners.js';
import { initReplyListeners } from './initListeners.js';

export const renderComments = () => {
    const list = document.querySelector('.comments');
    list.innerHTML = comments
        .map((comment, index) => {
            /* Привёл рендер даты и времени к подобающему виду */
            let dayComment = comment.date.getDay() + 1;
            let monthComment = comment.date.getMonth() + 1;
            let yearComment = comment.date.getFullYear();
            if (dayComment < 10) dayComment = `0${dayComment}`;
            if (monthComment < 10) monthComment = `0${monthComment}`;
            let timeComment = comment.date.toLocaleTimeString('ru-Ru');
            /* ----------------------------------------------- */
            return `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${dayComment}.${monthComment}.${yearComment} ${timeComment}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>
      `;
        })
        .join('');

    initLikeListeners(renderComments);
    initReplyListeners();
};
