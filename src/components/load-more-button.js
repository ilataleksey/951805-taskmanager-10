import AbstractComponent from './abstract-component.js';

export const createLoadMoreButtonTemplate = () => (
  `<button class="load-more" type="button">load more</button>`
);

export default class Board extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
