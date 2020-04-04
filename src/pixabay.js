const API_KEY = "15868951-10a822b7da017ceb8c37c57c5";
const BASE_URL = "https://pixabay.com/api";

const buildURL = (queryString, page) => {
    const params = new URLSearchParams();
    params.append("key", API_KEY);
    if (queryString !== "") {
        params.append("q", queryString);
    }
    params.append("page", page);
    const url = new URL(`${BASE_URL}/?${params.toString()}`);
    //truncate trailing slash
    const urlString = url.href.substring(0, url.href.length-1);
    console.log(urlString);
    return urlString;
}

export const getImages = async (queryString, page) => {
    const url = buildURL(queryString, page);
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return Promise.reject("Request failed");
}

