import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Table, Divider, Button, Pagination, Popconfirm, message } from 'antd';
import { TableColumn } from '../../models/table';
import { TsDate } from '../../utils/date';

const { Content } = Layout;
const delInfo = "你确定要删除吗?";

export class UserManageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
        }

        this.columns = [new TableColumn("编号", "ID", "ID"),
        new TableColumn("用户名", "UserName", "UserName"),
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

    render() {
        return (<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <div style={{ marginBottom: 20, textAlign: "right" }}><Button type="primary" size="large" ><Link to="/layout/manager/user/new">创建新用户</Link></Button></div>
            <div>
                <Table
                    columns={this.columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{"合作模式描述：" + record.Remark}</p>}
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