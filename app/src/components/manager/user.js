import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Layout, Table, Divider, Button, Pagination, Popconfirm, message, Input } from 'antd';
import { TableColumn } from '../../models/table';
import { TsDate } from '../../utils/date';
import { getUserList, deleteUser, updateUser } from '../../services/user/user';

const { Content } = Layout;
const { Search } = Input;
const delInfo = "你确定要删除吗?";

const STATUS = {};
STATUS[1] = "正常";
STATUS[2] = "禁用";

export class UserManageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            search: "",
            total: 0
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.columns = [new TableColumn("编号", "ID", "ID"),
        new TableColumn("用户名", "Account", "Account"),
        new TableColumn("创建时间", "CreatedAt", "CreatedAt", (text, record) => {
            return (new TsDate(text)).Format("yyyy-MM-dd");
        }),
        new TableColumn("更新时间", "UpdatedAt", "UpdatedAt", (text, record) => {
            return (new TsDate(text)).Format("yyyy-MM-dd");
        }),
        new TableColumn("状态", "Status", "Status", (text, record) => {
            return STATUS[text];
        }),
        new TableColumn("操作", "action", "", (text, record) => (
            <span>
                <Link to={`/layout/manager/user/new/${record.ID}`}>编辑</Link>
                <Divider type="vertical" />
                <Popconfirm placement="topLeft" title={`你确定要${record.Status === 1 ? "禁用" : "启用"}用户${record.Account}吗?`} onConfirm={() => this.onChangeStatus(record)} okText="确定" cancelText="取消">
                    <a href="#">{record.Status === 1 ? "禁用" : "启用"}</a>
                </Popconfirm>
                <Divider type="vertical" />
                <Popconfirm placement="topLeft" title={delInfo} onConfirm={() => this.onDelete(record.ID)} okText="确定" cancelText="取消">
                    <a href="#">删除</a>
                </Popconfirm>
            </span>
        ))];
    }

    componentDidMount() {
        this.refreshCurPage();
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

    refreshCurPage() {
        this.userList(this.props.match.params.page);
    }

    onPageChange(page, pagesize) {
        this.props.history.push({ pathname: "/layout/manager/user/list/" + page })
    }

    onSearchChange(event) {
        this.setState({
            search: event.target.value
        });
    }

    onSearch(value) {
        this.refreshCurPage();
    }

    onDelete(id) {
        deleteUser(id).then((data) => {
            message.success("删除成功.");
            this.refreshCurPage();
        });
    }

    onChangeStatus(user) {
        var status = user.Status === 1 ? 2 : 1;
        updateUser(user.ID, status).then((data) => {
            message.success("状态修改成功.");
            this.refreshCurPage();
        });
    }

    render() {
        if (!this.props.match.params.page) {
            return <Redirect push to="/layout/manager/user/list/1" />;
        }
        return (<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Search
                placeholder="输入用户名搜索"
                onSearch={this.onSearch}
                onChange={this.onSearchChange}
                style={{ marginBottom: 20, width: 200 }}
            />
            <div style={{ float: "right" }}><Button type="primary" size="large" ><Link to="/layout/manager/user/new">创建新用户</Link></Button></div>
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