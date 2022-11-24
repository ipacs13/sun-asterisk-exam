import axios from "axios";
let BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const search = (options) => {
  if (!options.apiKey) throw new Error("API key needed");

  let params = {
    part: "snippet",
    key: options.apiKey,
    q: options.query,
    maxResults: options.items ?? 6,
    type: "video",
  };

  return axios.get(BASE_URL, { params });
};

export { search };
