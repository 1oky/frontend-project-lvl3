import 'bootstrap';
import './style.css'
import { urlValidationSchema } from './UrlValidation';
import onChange from 'on-change';
import axios from 'axios';
import parser from './parser';
import validError from './validError';
import validSuccess from './validSuccess';
import renderState from './render';
import _ from 'lodash';

export const state = {
  url:"",
  urlData:[],
  posts: {
    title:[],
    description:[],
    link:[],
  },
};

const watchedState = onChange(state, function (path, value) {
  if (path === 'posts.title') {
    renderState()
  };
});

const urlValidMessage = document.querySelector('.valid-message');

const urlBase = state.urlData
const updatePosts = (state, urls) => {
  const posts = state.posts
  urls.reverse().forEach((url) => {
    axios
    .get((`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
    .then((response) => {
      const { infoItems } = parser(response.data.contents.toString())
      for (let i = 0; i <= infoItems.length - 1; i = i + 1) {
        if (infoItems[i].title !== posts.title[i]) {
          watchedState.posts.title.unshift(infoItems[i].title)
          watchedState.posts.link.unshift(infoItems[i].link)
          watchedState.posts.description.unshift(infoItems[i].description)
        };
      };
    });
  });
  setTimeout(() => updatePosts(watchedState, urlBase), 5000);
};

const urlInput = document.querySelector('.form-control');
urlInput.addEventListener('change', (e) => {
  watchedState.url = e.target.value;
});

const findButton = document.querySelector('.find-button');

findButton.addEventListener('click', function () {
  const url = watchedState.url;
  const isValid = urlValidationSchema.isValid({websiteLink: url});
  isValid
    .then((data) => {
      if (data === false) {
        validError(urlInput, urlValidMessage);
      } else {
        validSuccess(urlValidMessage);
        axios
        .get((`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
        .then((response) => {
          state.urlData.push(url);
          const infoItemsLength = parser(response.data.contents.toString()).infoItems.length;
          for (let i = 0; i <= infoItemsLength - 1; i = i + 1) {
            const parsedTitle = parser(response.data.contents.toString()).infoItems[i].title;
            state.posts.title.push(parsedTitle);
            const parsedLink = parser(response.data.contents.toString()).infoItems[i].link;
            state.posts.link.push(parsedLink);
            const parsedDescription = parser(response.data.contents.toString()).infoItems[i].description;
            state.posts.description.push(parsedDescription);
          }
          renderState();
        })
        .catch((error) => {
          console.error(error);

        })
        .then(() => updatePosts(state, urlBase));
      }
    })
    .catch((error) => console.log(error));
  });
