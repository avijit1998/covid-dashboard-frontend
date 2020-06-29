import axios from "axios";

const url = "http://localhost:52487/api";

export const fetchWorldData = async () => {
  try {
    const { data } = await axios.get(`${url}/world`);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCountryData = async (slug) => {
  try {
    const { data } = await axios.get(`${url}/countries/${slug}`);
    return data;
  } catch (error) {
    return error;
  }
};
