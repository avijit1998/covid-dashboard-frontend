import React, { Component } from "react";
import { Cards, CountryList, Chart } from "./components";
import styles from "./App.module.css";
import { fetchWorldData, fetchCountries } from "./api";
import Loader from "react-loader";
import image from "./images/covid.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineData: [],
      countries: [],
    };
  }

  async componentDidMount() {
    const fetchedWorldData = await fetchWorldData();
    const fetchedCountriesList = await fetchCountries();
    this.setState({
      timelineData: fetchedWorldData,
      countries: fetchedCountriesList,
    });
  }

  render() {
    const { timelineData, countries } = this.state;

    if (timelineData.length && countries.length) {
      return (
        <div className={styles.container}>
          <img className={styles.image} src={image} alt="COVID-19" />
          <Cards
            confirmed={timelineData[0].totalCases}
            recovered={timelineData[0].totalRecovered}
            deaths={timelineData[0].totalDeaths}
            lastUpdate={timelineData[0].lastUpdate}
          />
          <Chart timelyData={timelineData} />
          <CountryList countries={countries} />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default App;
