import React, { useContext, useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { CaseContext } from './../context/CaseContext';
import axios from 'axios';

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
  const [fill, setFill] = useState('#a0a0a0');
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
        let prevConfirm = 0;
        const result = latestDate.map((date) => {
          const newCase = timelineObj[date] - prevConfirm;
          const obj = {
            date: dateToString(date),
            cumulative: timelineObj[date],
            new: newCase > 0 ? newCase : 0,
          };
          prevConfirm = timelineObj[date];
          return obj;
        });
        result.shift();
        setData(result);
        const confirm = country.latest.confirmed;
        if (confirm >= 100000) setFill('#6b48b6');
        else if (confirm >= 10000) setFill('#b44cc5');
        else if (confirm >= 1000) setFill('#c85050');
        else if (confirm >= 100) setFill('#c8b550');
        else setFill('#7cc64f');
      });
    }
  }, [country]);

  const style = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div style={style}>
      <ComposedChart width={320} height={150} data={data}>
        <CartesianGrid stroke='#f5f5f5' />
        <XAxis dataKey='date' />
        <YAxis
          yAxisId='right'
          type='number'
          orientation='right'
          allowDecimals={false}
          name='Cumulative'
          domain={[0, 'auto']}
        />
        <YAxis
          yAxisId='left'
          type='number'
          orientation='left'
          domain={[0, 'auto']}
          allowDecimals={false}
          name='New'
        />
        <Tooltip />
        <Legend />
        <Bar yAxisId='left' dataKey='new' barSize={20} fill={fill} />
        <Line
          yAxisId='right'
          type='monotone'
          dataKey='cumulative'
          stroke='#45707C'
          dot={false}
        />
      </ComposedChart>
    </div>
  );
}

export default Stat;
