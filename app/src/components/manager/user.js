import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Layout, Table, Divider, Button, Pagination, Popconfirm, message } from 'antd';
import { TableColumn } from '../../models/table';
import { TsDate } from '../../utils/date';
import { getUserList } from '../../services/user/user';

const { Content } = Layout;
const delInfo = "你确定要删除吗?";

export class UserManageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            search: "",
            total: 0
        };

        this.onPageChange = this.onPageChange.bind(this);

        this.columns = [new TableColumn("编号", "ID", "ID"),
        new TableColumn("用户名", "Account", "Account"),
        new TableColumn("创建时间", "CreatedAt", "CreatedAt", (text, record) => {
            return (new TsDate(text)).Format("yyyy-MM-dd");
        }),
        new TableColumn("操作", "action", "", (text, record) => (
            <span>
                <Link to={`/cop/create/${record.ID}`}>编辑</Link>
                <Divider type="vertical" />
                <Popconfirm placement="topLeft" title={delInfo} onConfirm={() => this.onDelete(record.ID)} okText="确定" cancelText="取消">
                    <a href="#">删除</a>
                </Popconfirm>
            </span>
        ))];
    }

    componentDidMount() {
        this.userList(this.props.match.params.page);
    }

    componentWillReceiveProps(nextProps) {
        this.userList(nextProps.match.params.page);
    }

    userList(page) {
        if (!page) {
            return;
        }
        this.setState({
            loading: true
        })
        getUserList(page, this.state.search).then((data) => {
            this.setState({
                data: data.Data,
                total: data.Total,
                loading: false
            });
        })
    }

    onPageChange(page, pagesize) {
        this.props.history.push({ pathname: "/layout/manager/user/list/" + page })
    }

    render() {
        if (!this.props.match.params.page) {
            return <Redirect push to="/layout/manager/user/list/1" />;
        }
        return (<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <div style={{ marginBottom: 20, textAlign: "right" }}><Button type="primary" size="large" ><Link to="/layout/manager/user/new">创建新用户</Link></Button></div>
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={false}
                    loading={this.state.loading}
                    rowKey={"ID"}
                />
                <Pagination
                    style={{ textAlign: "right", marginTop: "20px" }}
                    current={+this.props.match.params.page}
                    pageSize={10}
                    total={this.state.total}
                    onChange={this.onPageChange} />
            </div>
        </Content>)
    }
}