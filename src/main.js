import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const TASK_COUNT = 22;
const SHOWING_TASK_COUNT_ON_START = 8;
const SHOWING_TASK_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate());

const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);
let showingTaskCount = SHOWING_TASK_COUNT_ON_START;
tasks.slice(1, showingTaskCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTaskCount;
  showingTaskCount = showingTaskCount + SHOWING_TASK_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTaskCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTaskCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
