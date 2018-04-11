import { post, get } from "./ajax";


export function postUser(url, data) {
    return post("/user" + url, data);
}

export function getUser(url, data) {
    return get("/user" + url, data).then((data) => {
        return JSON.parse(data);
    });
}