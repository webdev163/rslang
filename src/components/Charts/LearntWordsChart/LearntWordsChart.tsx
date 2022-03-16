import React, { FC, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LearntWordsChartProps } from './types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
};

const LearntWordsChart: FC<LearntWordsChartProps> = ({ stat }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [learntWordsArr, setLearntWordsArr] = useState<number[]>([]);

  useEffect(() => {
    if (stat && stat.optional) {
      const keys = Object.keys(stat.optional);
      const currentDate = new Date().toLocaleDateString('ru-RU');
      if (!keys.includes(currentDate)) {
        keys.push(currentDate);
      }
      setLabels(keys);
      const wordsCounterArr = keys.map(el => {
        let num = 0;
        if (stat.optional[el] && stat.optional[el]['audio']) {
          num += stat.optional[el]['audio'].learnedWords;
        }
        if (stat.optional[el] && stat.optional[el]['sprint']) {
          num += stat.optional[el]['sprint'].learnedWords;
        }
        if (stat.optional[el] && stat.optional[el]['guide']) {
          num += stat.optional[el]['guide'].learnedWords;
        }
        return num;
      });
      const resultArr = wordsCounterArr.map((el, ndx, arr) => {
        if (ndx > 0) {
          return el + arr.slice(0, ndx).reduce((a, b) => a + b, 0);
        }
        return el;
      });
      setLearntWordsArr(resultArr);
    }
  }, [stat]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество изученных слов',
        data: learntWordsArr,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LearntWordsChart;
