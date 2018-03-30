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
            if (!res.ok) {
                reject("请求失败,请稍后再试");
                return;
            }
            try {
                res.json().then((data) => {
                    if (data.Code === 0) {
                        var pData = JSON.parse(data.Data);
                        resolve(pData);
                    } else {
                        reject(data.Message || "请求失败");
                    }
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
            if (!res.ok) {
                reject("请求失败,请稍后再试");
                return;
            }
            try {
                res.json().then((data) => {
                    if (data.Code === 0) {
                        var pData = JSON.parse(data.Data);
                        resolve(pData);
                    } else {
                        reject(data.Message || "请求失败");
                        return;
                    }
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