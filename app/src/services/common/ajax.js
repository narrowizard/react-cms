import { message } from 'antd';

export function get(url, data) {
    var p = new Promise((resolve, reject) => {
        var params = "";
        for (var p in data) {
            params += `${p}=${data[p]}&`
        }
        params = params.substr(0, params.length - 1);
        var urlWithParams = "";
        if (params !== "") {
            urlWithParams = url + "?" + params;
        } else {
            urlWithParams = url;
        }

        fetch(urlWithParams).then((res) => {
            try {
                if (!res.ok) {
                    // 请求失败
                    res.json().then((data) => {
                        reject(data.message);
                    })
                    return;
                }
                res.text().then((data) => {
                    resolve(data);
                });
            } catch (e) {
                reject("无法解析的返回值")
            }
        }).catch((msg) => {
            reject(msg);
        });
    });
    p.catch((msg) => {
        message.error(msg);
    });
    return p;
}

export function post(url, data) {
    var p = new Promise((resolve, reject) => {
        var params = "";
        for (var p in data) {
            params += `${p}=${data[p]}&`
        }
        params = params.substr(0, params.length - 1);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        }).then((res) => {
            try {
                if (!res.ok) {
                    // 请求失败
                    res.json().then((data) => {
                        reject(data.message);
                    })
                    return;
                }
                res.text().then((data) => {
                    resolve(data);
                });
            } catch (e) {
                reject("无法解析的返回值")
            }
        }).catch((msg) => {
            reject(msg);
        });
    });
    p.catch((msg) => {
        message.error(msg);
    });
    return p;
}