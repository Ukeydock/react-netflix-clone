import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "df6127759055acd085098f81c258c47b",
    language: "ko-KR",
  },
});

export default instance;
