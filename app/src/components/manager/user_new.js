import React from 'react';
import { Redirect } from 'react-router';
import { Card, Input, Button, message, Spin, Tree } from 'antd';
import { createUser, getUserInfo, updateUserModules } from '../../services/user/user';
import { getModules } from '../../services/layout/menu';


const TreeNode = Tree.TreeNode;
export class UserNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "添加管理员",
            remarks: "为您的管理系统添加一个管理员, 您可以按需分配管理权限.",
            redirect: false,
            loadingInfo: false,
            account: "",
            password: "",
            passwordConfirm: "",
            modulesData: [],
            checkedKeys: [],
            loadingTree: false,
        };

        this.onFormChange = this.onFormChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentDidMount() {
        this.setState({
            loadingTree: true
        })
        getModules().then((data) => {
            this.setState({
                modulesData: data,
                loadingTree: false
            });
        })
        if (this.props.match.params.id) {
            this.setState({
                title: "编辑管理员",
                remarks: "修改管理员的模块权限.",
                loadingInfo: true
            })
            // 编辑
            getUserInfo(this.props.match.params.id).then((data) => {
                var checkedKeys = data.Menus.map((item) => {
                    return "" + item.MenuID;
                })
                this.setState({
                    account: data.Account,
                    checkedKeys: checkedKeys,
                    loadingInfo: false
                })
            })
        }
    }

    onFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit() {
        if (this.props.match.params.id) {
            var menus = this.state.checkedKeys.map((item) => {
                return +item;
            })
            updateUserModules(this.props.match.params.id, JSON.stringify(menus)).then((data) => {
                message.success("编辑用户成功.");
                this.setState({
                    redirect: true
                });
            });
        } else {
            // 校验确认密码
            if (this.state.password !== this.state.passwordConfirm) {
                message.error("两次密码输入不一致.");
                return;
            }
            var menus = this.state.checkedKeys.map((item) => {
                return +item;
            })
            createUser(this.state.account, this.state.password, JSON.stringify(menus)).then((data) => {
                message.success("创建用户成功.");
                this.setState({
                    redirect: true
                });
            });
        }
    }

    onCheck(checkedKeys, e) {
        var ck = e.checkedNodes.map((item) => {
            return item.key;
        });
        this.setState({
            checkedKeys: ck
        })
        console.log(ck);
    }

    renderTreeNode(data) {
        return data.map((item) => {
            if (item.Children && item.Children.length > 0) {
                return <TreeNode key={item.ID} title={item.Name}>{this.renderTreeNode(item.Children)}</TreeNode>
            }
            return <TreeNode key={item.ID} title={item.Name} />;
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/layout/manager/user/list" />;
        }
        return (<div>
            <Spin spinning={this.state.loadingInfo}>
                <Card>
                    <h1>{this.state.title}</h1>
                    <p>{this.state.remarks}</p>
                </Card>
                <div style={{ padding: '24px' }}>
                    <Card title="个人信息">
                        <label>用户名</label>
                        <Input value={this.state.account} name="account" onChange={this.onFormChange} placeholder="请输入用户名" disabled={this.props.match.params.id !== undefined} />
                        <label>密码</label>
                        <Input value={this.state.password} type="password" name="password" onChange={this.onFormChange} placeholder="请输入密码" disabled={this.props.match.params.id !== undefined} />
                        <label>确认密码</label>
                        <Input value={this.state.passwordConfirm} type="password" name="passwordConfirm" onChange={this.onFormChange} placeholder="请再次输入密码" disabled={this.props.match.params.id !== undefined} />
                    </Card>
                    <Card title="管理权限" style={{ marginTop: 24 }}>
                        <Spin spinning={this.state.loadingTree}>
                            <Tree
                                checkable={true}
                                showLine={true}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                            >
                                {this.renderTreeNode(this.state.modulesData)}
                            </Tree>
                        </Spin>
                        <div style={{ textAlign: "center", marginTop: 24 }}>
                            <Button type="primary" size="large" onClick={this.onSubmit} >提交</Button>
                        </div>
                    </Card>
                </div>
            </Spin>
        </div>);
    }

}