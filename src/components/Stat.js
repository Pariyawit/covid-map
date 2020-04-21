import React, { useContext, useEffect } from 'react';
import { CaseContext } from './../context/CaseContext';
import axios from 'axios';

function n(n) {
  return n > 9 ? '' + n : '0' + n;
}

function Stat() {
  const { country } = useContext(CaseContext);

  useEffect(() => {
    //2020-03-15
    if (country) {
      // const startDate = new Date(Date(latestDate)
      const dayPass = 7;
      const urlTimeseries = `https://coronavirus-tracker-api.herokuapp.com/v2/locations/${country.id}`;

      axios.get(urlTimeseries).then((res) => {
        const timelineObj = res.data.location.timelines.confirmed.timeline;
        const dates = Object.keys(timelineObj);
        let latestDate = dates.splice(-dayPass);
        console.log(latestDate);

        const result = latestDate.map((date) => ({
          date: date,
          confirmed: timelineObj[date],
        }));
        console.log(result);
      });
    }
  }, [country]);

  return <div>{/* {country}, {latestDate} */}</div>;
}

export default Stat;
