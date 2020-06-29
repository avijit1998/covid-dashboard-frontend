import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountryData } from "../../api";
import { Cards, Chart } from "../index";
import Loader from "react-loader";

const CountryData = () => {
  const { slug } = useParams();

  const [countryData, setCountryData] = useState({});
  const [timelyData, setTimelyData] = useState([]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const fetchedCountryData = await fetchCountryData(slug);
      setCountryData(fetchedCountryData);
      let timeline = [];
      fetchedCountryData.countryTimelineData.forEach((record) => {
        timeline.push({
          totalCases: record.cases,
          totalDeaths: record.deaths,
          totalRecovered: record.recovered,
          lastUpdate: record.lastUpdate,
        });
      });
      setTimelyData(timeline);
    };
    fetchMyAPI();
  }, [slug]);

  if (countryData.totalCases) {
    return (
      <>
        <h1>{countryData.name}</h1>
        <Cards
          confirmed={countryData.totalCases}
          recovered={countryData.totalRecovered}
          deaths={countryData.totalDeaths}
          lastUpdate={countryData.lastUpdate}
          restDetails={countryData}
        />
        <Chart timelyData={timelyData.reverse()} />
      </>
    );
  } else {
    return <Loader />;
  }
};

export default CountryData;
