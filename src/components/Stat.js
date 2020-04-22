import React, { useContext, useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';

import { CaseContext } from './../context/CaseContext';
import axios from 'axios';

function n(n) {
  return n > 9 ? '' + n : '0' + n;
}

function dateToString(JSONdate) {
  const m = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(JSONdate);
  return `${date.getDate()} ${m[date.getMonth()]}`;
}

function Stat() {
  const { country } = useContext(CaseContext);
  const [data, setData] = useState([]);
  const [dataMax, setDataMax] = useState(0);
  useEffect(() => {
    //2020-03-15
    if (country) {
      // const startDate = new Date(Date(latestDate)
      const dayPass = 30;
      const urlTimeseries = `https://coronavirus-tracker-api.herokuapp.com/v2/locations/${country.id}`;

      axios.get(urlTimeseries).then((res) => {
        const timelineObj = res.data.location.timelines.confirmed.timeline;
        const dates = Object.keys(timelineObj);
        let latestDate = dates.splice(-dayPass - 1);
        console.log(latestDate);
        let prevConfirm = 0;
        const result = latestDate.map((date) => {
          const obj = {
            date: dateToString(date),
            total: timelineObj[date],
            new: timelineObj[date] - prevConfirm,
          };
          prevConfirm = timelineObj[date];
          return obj;
        });
        result.shift();
        setData(result);
        setDataMax(result[6].total);
      });
    }
  }, [country]);

  return (
    <div>
      <ComposedChart width={320} height={300} data={data}>
        <CartesianGrid stroke='#f5f5f5' />
        <XAxis dataKey='date' />
        <YAxis yAxisId='left' type='number' orientation='left' />
        <YAxis yAxisId='right' type='number' orientation='right' />
        <Tooltip />
        <Bar yAxisId='right' dataKey='new' barSize={20} fill='#a0a0a0' />
        <Line yAxisId='left' type='monotone' dataKey='total' stroke='#45707C' />
      </ComposedChart>
    </div>
  );
}

export default Stat;
