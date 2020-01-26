import AbstractSmartComponent from './abstract-smart-component.js';

const Color = {
  BLACK: `black`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
  YELLOW: `yellow`,
};

const ColorValue = {
  [Color.BLACK]: `#000000`,
  [Color.BLUE]: `#0c5cdd`,
  [Color.GREEN]: `#31b55c`,
  [Color.PINK]: `#ff3cb9`,
  [Color.YELLOW]: `#ffe125`,
};

const createStatisticsTemplate = ({tasks, dateFrom, dateTo}) => {
  const placeholder = createPlaceholder(dateFrom, dateTo);
  const tasksCount = getTasksByDateRange(tasks, dateFrom, dateTo).length;

  return (
    `<section class="statistic container">
      <div class="statistic__line">
        <div class="statistic__period">
          <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

          <div class="statistic-input-wrap">
            <input class="statistic__period-input" type="text" placeholder="${placeholder}">
          </div>

          <p class="statistic__period-result">
            In total for the specified period
            <span class="statistic__task-found">${tasksCount}</span> tasks were fulfilled.
          </p>
        </div>
        <div class="statistic__line-graphic">
          <canvas class="statistic__days" width="550" height="150"></canvas>
        </div>
      </div>

      <div class="statistic__circle">
        <div class="statistic__tags-wrap">
          <canvas class="statistic__tags" width="400" height="300"></canvas>
        </div>
        <div class="statistic__colors-wrap">
          <canvas class="statistic__colors" width="400" height="300"></canvas>
        </div>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  getTemplate() {
    return createStatisticsTemplate();
  }
}
