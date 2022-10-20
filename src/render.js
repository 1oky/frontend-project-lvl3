import { state } from ".";
import 'bootstrap';

const titleContainer = document.querySelector('.title-container');

const renderState = () => {
titleContainer.innerHTML = "";
const posts = state.posts

const modalLinkHref = document.getElementById('post-link');
const modalTitle = document.getElementById('modal-header');
const modalDescription = document.getElementById('modal-description');
const divTitleContainer = document.getElementById('div-title-container');

for (let i = 0; i <= posts.title.length - 1; i = i + 1) {
  const titleElement = document.createElement('li');
  const aEl = document.createElement('a');
  const descriptonEl = document.createElement('li');
  descriptonEl.setAttribute('value', `${posts.description[i]}`);
  aEl.setAttribute("href", `${posts.link[i]}`);
  titleElement.append(aEl);
  titleElement.classList.add('li-posts-style');
  aEl.classList.add('a-posts-style');
  aEl.textContent = posts.title[i];
  titleContainer.append(titleElement);
  const button = document.createElement('button');
  button.textContent = 'Просмотр';
  button.classList.add('btn', 'btn-primary', 'btn-modal');
  button.setAttribute('type', 'button');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#postModal');
  button.setAttribute('id', 'openModal');
  titleElement.append(button);
  titleElement.append(descriptonEl);
  }

  divTitleContainer.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (isButton) {
      const button = event.target;
      modalTitle.textContent = button.previousSibling.textContent;
      modalDescription.textContent = button.nextSibling.getAttribute('value');
      modalLinkHref.setAttribute('href', `${button.previousSibling.getAttribute('href')}`);
    }
  })
};

export default renderState;