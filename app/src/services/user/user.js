import { getUser, postUser } from "../common/proxy";

const pagesize = 10;

/**
 * 获取用户列表
 * @param {number} page 页码
 * @param {number} pagesize 每页条数
 * @param {string} search 搜索内容
 */
export function getUserList(page, search) {
    return getUser("/user/list", {
        page: page,
        pagesize: pagesize,
        search: search
    });
}

/**
 * 创建新用户
 * @param {string} account 帐号 
 * @param {string} password 密码
 */
export function createUser(account, password) {
    return postUser("/user/new", {
        account: account,
        password: password
    });
}