export function getUserModules() {
    return new Promise((resolve, reject) => {
        var data = [
            {
                Name: "用户管理",
                ID: 1,
                Icon: "user",
                URL: "/layout/manager/user/list"
            },
            {
                Name: "模块管理",
                ID: 2,
                Icon: "user",
                URL: "/layout/manager/module/list"
            },
            {
                Name: "模块二",
                ID: 3,
                Icon: "inbox",
                Children: [
                    {
                        Name: "子模块一",
                        URL: "/layout/manager/test",
                        ID: 4,
                    },
                ]
            },
        ];
        resolve(data);
    })
} 