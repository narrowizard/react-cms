import React from 'react';
import { Layout, Menu, Icon, Modal, Input, message } from 'antd';
import { Link, Switch, Redirect } from 'react-router-dom';
import { getUserModules } from '../services/layout/menu';
import { getRouter } from '../router';
import { isLogin, logout, updatePassword } from '../services/user/user';

const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class LayoutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            menuData: [],
            isChangePassword: false
        };

        this.onLogout = this.onLogout.bind(this);
        this.onShowPasswordDialog = this.onShowPasswordDialog.bind(this);
        this.onHidePasswordDialog = this.onHidePasswordDialog.bind(this);
        this.onPasswordCommit = this.onPasswordCommit.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    renderMenu(data) {
        if (!data || data.length === 0) {
            return [];
        }
        var menu = data.map((item) => {
            if (item.Children && item.Children.length > 0) {
                return <SubMenu
                    key={item.ID}
                    title={<span>{item.Icon ? <Icon type={item.Icon} /> : null}<span>{item.Name}</span></span>}
                >
                    {this.renderMenu(item.Children)}
                </SubMenu>;
            } else if (item.URL) {
                return <Menu.Item key={item.ID}><Link to={item.URL}><span>{item.Icon ? <Icon type={item.Icon} /> : null}<span>{item.Name}</span></span></Link></Menu.Item>;
            }
            return null;
        });
        return menu;
    }

    onLogout() {
        logout().then(() => {
            this.setState({
                isLoggedIn: false,
            })
        })
    }

    onShowPasswordDialog() {
        this.setState({
            isChangePassword: true
        })
    }

    onHidePasswordDialog() {
        this.setState({
            isChangePassword: false
        })
    }

    onFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onPasswordCommit() {
        if (this.state.newpassword !== this.state.newpasswordConfirm) {
            message.error("两次密码不一致, 请确认后重试.");
            return;
        }
        updatePassword(this.state.oldpassword, this.state.newpassword).then(() => {
            this.setState({
                isChangePassword: false
            });
            message.success("修改成功.");
        })
    }

    componentDidMount() {
        getUserModules().then((data) => {
            this.setState({ menuData: data });
        })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" >
                        {this.renderMenu(this.state.menuData)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div style={{ float: "right", marginRight: 40 }}><a onClick={this.onShowPasswordDialog}>修改密码</a>&nbsp;&nbsp;<a onClick={this.onLogout}>退出登录</a></div>
                    </Header>
                    <Switch>
                        {getRouter()}
                    </Switch>
                </Layout>
                <Modal
                    title="修改密码"
                    okText="确定"
                    cancelText="取消"
                    visible={this.state.isChangePassword}
                    onOk={this.onPasswordCommit}
                    onCancel={this.onHidePasswordDialog}
                >
                    <label>旧密码</label>
                    <Input value={this.state.oldpassword} type="password" name="oldpassword" onChange={this.onFormChange} placeholder="请输入旧密码" />
                    <label>新密码</label>
                    <Input value={this.state.newpassword} type="password" name="newpassword" onChange={this.onFormChange} placeholder="请输入密码" />
                    <label>确认新密码</label>
                    <Input value={this.state.newpasswordConfirm} type="password" name="newpasswordConfirm" onChange={this.onFormChange} placeholder="请再次输入密码" />
                </Modal>
            </Layout>
        )
    }

}