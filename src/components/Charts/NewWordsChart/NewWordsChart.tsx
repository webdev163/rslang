import React, { FC, useEffect, useState } from 'react';
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
import { NewWordsChartProps } from './types';

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

const NewWordsChart: FC<NewWordsChartProps> = ({ stat }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [newWordsArr, setNewWordsArr] = useState<number[]>([]);

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
        if (stat.optional[el]['audio']) {
          num += stat.optional[el]['audio'].newWords;
        }
        if (stat.optional[el]['sprint']) {
          num += stat.optional[el]['sprint'].newWords;
        }
        return num;
      });
      setNewWordsArr(wordsCounterArr);
    }
  }, [stat]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов',
        data: newWordsArr,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default NewWordsChart;
