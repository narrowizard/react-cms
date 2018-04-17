import { getUser, postUser, delUser, putUser } from "../common/proxy";

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
 * 获取用户详细信息
 * @param {number} id 用户编号
 */
export function getUserInfo(id) {
    return getUser("/user/info", {
        id: id
    })
}

/**
 * 创建新用户
 * @param {string} account 帐号 
 * @param {string} password 密码
 */
export function createUser(account, password, menus) {
    return postUser("/user/new", {
        account: account,
        password: password,
        menus: menus
    });
}

/**
 * 删除用户
 * @param {number} userid 用户编号
 */
export function deleteUser(userid) {
    return delUser("/user/delete", {
        userid: userid
    });
}

/**
 * 更新用户数据
 * @param {number} userid 用户编号
 * @param {number} status 用户状态
 */
export function updateUserStatus(userid, status) {
    return putUser("/user/update", {
        userid: userid,
        status: status
    })
}

/**
 * 更新用户的菜单信息
 * @param {number} userid 用户编号
 * @param {string} menus json字符串,int数组
 */
export function updateUserModules(userid, modules) {
    return putUser("/user/update", {
        userid: userid,
        menus: modules
    })
}