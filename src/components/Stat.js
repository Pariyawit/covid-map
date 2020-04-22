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

function handleMultipleRequests(ids) {
  console.log(ids);
  const urls = ids.map(
    (id) =>
      `https://coronavirus-tracker-api.herokuapp.com/v2/locations/${id}?source=nyt&timelines=true`
  );
  axios
    .all(urls.map((url) => axios.get(url)))
    .then(
      axios.spread((...responses) => {
        console.log(responses);
      })
    )
    .catch((errors) => console.log(errors));
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
      let urlTimeseries = `https://coronavirus-tracker-api.herokuapp.com/v2/locations/${country.id}`;
      //?source=nyt&timelines=true
      if (country.country_code === 'US' && country.level === 'province') {
        urlTimeseries += '?source=nyt&timelines=true';
      }
      console.log(country);
      if (country.ids) {
        setData([]);
      } else {
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
    }
  }, [country]);

  return (
    <div className='stat'>
      {data.length > 0 ? (
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
      ) : (
        <p>Data not avaliable</p>
      )}
    </div>
  );
}

export default Stat;
