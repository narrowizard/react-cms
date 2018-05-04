import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, Switch, Redirect } from 'react-router-dom';
import { getUserModules } from '../services/layout/menu';
import { getRouter } from '../router';
import { isLogin, logout } from '../services/user/user';

const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class LayoutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            collapsed: false,
            menuData: []
        };

        this.onLogout = this.onLogout.bind(this);
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

    componentDidMount() {
        isLogin().then((data) => {
            if (!(data.toLowerCase().trim() == "true")) {
                this.setState({
                    isLoggedIn: false
                })
            }
        });
        getUserModules().then((data) => {
            this.setState({ menuData: data });
        })
    }

    render() {
        if (!this.state.isLoggedIn) {
            return <Redirect to="/login" />
        }
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
                        <div style={{ float: "right", marginRight: 40 }}><a onClick={this.onLogout}>退出登录</a></div>
                    </Header>
                    <Switch>
                        {getRouter()}
                    </Switch>
                </Layout>
            </Layout>
        )
    }

}