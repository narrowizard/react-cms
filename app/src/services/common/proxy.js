import { post, get, del, put } from "./ajax";


export function postUser(url, data) {
    return post("/user" + url, data);
}

export function getUser(url, data) {
    return get("/user" + url, data).then((data) => {
        return JSON.parse(data);
    });
}

export function delUser(url, data) {
    return del("/user" + url, data);
}

export function putUser(url, data) {
    return put("/user" + url, data);
}