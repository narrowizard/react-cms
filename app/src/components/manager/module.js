import React from 'react';
import { TableColumn } from '../../models/table';
import { Modal, Icon, Layout, Table, Divider, Button, Popconfirm, message } from 'antd';
import { getModules, newModule, updateModule } from '../../services/layout/menu';
import { ModuleNew } from './module_new';
const { Content } = Layout;

export class ModuleManageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            showDialog: false,
            mode: "create",
            curData: null,
        }

        this.columns = [new TableColumn("编号", "ID", "ID"),
        new TableColumn("模块图标", "Icon", "Icon", (text, record) => {
            return <Icon type={text} />
        }),
        new TableColumn("模块名称", "Name", "Name"),
        new TableColumn("模块地址", "URL", "URL"),
        new TableColumn("操作", "action", "", (text, record) => {
            return (<span>
                <a onClick={() => { this.onEditClick(record) }}>编辑</a>
                <Divider type="vertical" />
                <a onClick={() => { this.onNewClick(record) }}>添加子模块</a>
            </span>)
        })];

        this.onNewClick = this.onNewClick.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.onDialogChange = this.onDialogChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        this.setState({
            loading: true
        })
        getModules().then((data) => {
            this.setState({
                data: data,
                loading: false
            })
        });
    }

    onNewClick(pdata) {
        var temp = {
            parentid: 0,
            pName: "顶级模块"
        }
        if (pdata && pdata.Name) {
            temp.parentid = pdata.ID;
            temp.pName = pdata.Name;
        }
        this.setState({
            curData: temp,
            mode: "create",
            showDialog: true
        })
    }

    onEditClick(pdata) {
        var temp = {
            name: pdata.Name,
            url: pdata.URL,
            icon: pdata.Icon,
            id: pdata.ID
        }
        this.setState({
            curData: temp,
            mode: "edit",
            showDialog: true
        })
    }

    onDialogChange(key, value) {
        var temp = this.state.curData;
        temp[key] = value;
        this.setState({
            curData: temp
        })
    }

    hideDialog() {
        this.setState({
            showDialog: false
        })
    }

    onSubmit() {
        if (this.state.mode === "create") {
            newModule(this.state.curData.parentid, this.state.curData.name, this.state.curData.url, this.state.curData.icon).then((data) => {
                message.success("模块创建成功!");
                this.hideDialog();
                this.refreshData();
            });
        } else if (this.state.mode === "edit") {
            updateModule(this.state.curData.id, this.state.curData.name, this.state.curData.url, this.state.curData.icon).then((data) => {
                message.success("模块修改成功!");
                this.hideDialog();
                this.refreshData();
            });
        }
    }

    render() {
        return (<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <div style={{ marginBottom: 24 }}><Button type="primary" size="large" onClick={this.onNewClick} >创建模块</Button></div>
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={false}
                    loading={this.state.loading}
                    rowKey={"ID"}
                />
            </div>
            <Modal
                title="模块信息"
                visible={this.state.showDialog}
                okText="提交"
                cancelText="取消"
                onCancel={this.hideDialog}
                onOk={this.onSubmit}
            >
                <ModuleNew mode={this.state.mode} curData={this.state.curData} onChange={this.onDialogChange} />
            </Modal>
        </Content>)
    }
}