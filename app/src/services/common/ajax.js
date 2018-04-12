import { message } from 'antd';

/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {string} method 
 */
function ajax(url, data, method) {
    var p = new Promise((resolve, reject) => {
        var params = "";
        for (var p in data) {
            params += `${p}=${data[p]}&`
        }
        params = params.substr(0, params.length - 1);
        var options = {
            method: method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        switch (method.toUpperCase()) {
            case "GET":
            case "DELETE": {
                url = url + "?" + params;
                break;
            }
            case "POST":
            case "PUT": {
                options.body = params;
                break;
            }
            default:
                break;
        }

        fetch(url, options).then((res) => {
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

export function get(url, data) {
    return ajax(url, data, "GET");
}

export function post(url, data) {
    return ajax(url, data, "POST");
}

export function del(url, data) {
    return ajax(url, data, "DELETE");
}

export function put(url, data) {
    return ajax(url, data, "PUT");
}