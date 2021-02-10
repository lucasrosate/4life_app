import axios from 'axios';

const headers = new Headers();
headers.append("Content-Type", "text/html;charset=UTF-8");
headers.append("Content-Type", "text/javascript;charset=utf-8");
headers.append("Content-Type", "application/json");
headers.append("Content-Type", "image/x-icon");
headers.append("Content-Type", "image/jpeg");
headers.append("Cache-Control", "public");
headers.append("Cache-Control", "max-age=604800");



const api = axios.create({
    baseURL: "http://localhost:3333/",
    headers: headers
});

export default api;