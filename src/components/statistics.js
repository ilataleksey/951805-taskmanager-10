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

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getTasksByDateRange = (tasks, dateFrom, dateTo) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    return dueDate >= dateFrom && dueDate <= dateTo;
  });
};

const createRandomColor = () => {
  const value = Math.floor(Math.random() * 0xffffff);

  return `#${value.toString(16)}`;
};

const createPlaceholder = (dateFrom, dateTo) => {
  const format = (date) => {
    return window.moment(date).format(`DD MMM`);
  };

  return `${format(dateFrom)} - ${format(dateTo)}`;
};

const calcUniqCountColor = (tasks, color) => {
  return tasks.filter((it) => it.color === color).length;
};

const calculateBetweenDates = (from, to) => {
  const result = [];
  let date = new Date(from);

  while (date <= to) {
    result.push(date);

    date = new Date(date);
    date.setDate(date.getDate() + 1);
  }

  return result;
};

const renderColorsChart = (colorsCtx, tasks) => {
  const colors = tasks
    .map((task) => task.color)
    .filter(getUniqItems);

  return new window.Chart(colorsCtx, {
    plugins: [window.ChartDataLabels],
    type: `pie`,
    data: {
      labels: colors,
      datasets: [{
        data: colors.map((color) => calcUniqCountColor(tasks, color)),
        backgroundColor: colors.map((color) => ColorValue[color])
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
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
