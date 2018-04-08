import React from 'react';
import { Redirect } from 'react-router';
import { Card, Input, Button, message, Spin } from 'antd';

export class UserNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "添加管理员",
            remarks: "为您的管理系统添加一个管理员, 您可以按需分配管理权限.",
            redirect: false,
            loadingInfo: false
        };
        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/layout/manager/user" />;
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
                        <Input value={this.state.name} name="name" onChange={this.onFormChange} placeholder="请输入用户名" />
                        <label>密码</label>
                        <Input value={this.state.password} type="password" name="password" onChange={this.onFormChange} placeholder="请输入密码" />
                        <label>确认密码</label>
                        <Input value={this.state.password} type="password" name="passwordConfirm" onChange={this.onFormChange} placeholder="请再次输入密码" />
                    </Card>
                    <Card title="管理权限" style={{ marginTop: 24 }}>
                        <div style={{ textAlign: "center", marginTop: 24 }}>
                            <Button type="primary" size="large" onClick={this.onSubmit} >提交</Button>
                        </div>
                    </Card>
                </div>
            </Spin>
        </div>);
    }

}