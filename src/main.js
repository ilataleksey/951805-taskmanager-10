import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 22;
const SHOWING_TASK_COUNT_ON_START = 8;
const SHOWING_TASK_COUNT_BY_BUTTON = 8;

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
    return;
  } else {
    render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
    render(boardComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);

    const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

    let showingTaskCount = SHOWING_TASK_COUNT_ON_START;
    tasks.slice(0, showingTaskCount).forEach((task) => renderTask(taskListElement, task));

    const loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      const prevTaskCount = showingTaskCount;
      showingTaskCount = showingTaskCount + SHOWING_TASK_COUNT_BY_BUTTON;

      tasks.slice(prevTaskCount, showingTaskCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTaskCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);

renderBoard(boardComponent, tasks);
