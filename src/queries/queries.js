import axios from "axios";

const Api_key = process.env.REACT_APP_API_KEY;

const GET_PHOTOS = async (searchValue, date) => {
  let result;

  if (searchValue) {
    result = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${searchValue}&api_key=${Api_key}`
    );
  } else if (date) {
    result = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${Api_key}`
    );
  } else {
    result = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${Api_key}`
    );
  }

  return result;
};

export { GET_PHOTOS };
