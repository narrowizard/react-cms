import React from 'react';
import { Icon, Card, Input, Button, message, Spin, Select } from 'antd';
import { getIcons } from '../../services/layout/menu';
const Option = Select.Option;

export class ModuleNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loadingInfo: false,
            icons: []
        };

        this.onFormChange = this.onFormChange.bind(this);
        this.onIconChange = this.onIconChange.bind(this);
    }

    componentDidMount() {
        getIcons().then((data) => {
            this.setState({
                icons: data
            })
        })
    }

    onFormChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    onIconChange(value) {
        this.props.onChange("icon", value);
    }

    render() {
        var options = this.state.icons.map((item) => {
            return <Option key={item} value={item}><Icon type={item} /> {item}</Option>
        })
        return (<div>
            {this.props.mode === "create" ? (<div><label>父模块</label>
                <Input value={this.props.curData.pName} disabled={true} /></div>) : null}
            <label>模块名称</label>
            <Input value={this.props.curData.name} name="name" onChange={this.onFormChange} placeholder="请输入模块名称" />
            <label>模块URL</label>
            <Input value={this.props.curData.url} name="url" onChange={this.onFormChange} placeholder="请输入模块URL" />
            <label>模块图标</label>
            <Select
                showSearch
                style={{ display: "block" }}
                placeholder="选择模块图标"
                optionFilterProp="children"
                onChange={this.onIconChange}
                value={this.props.curData.icon}
                filterOption={(input, option) => {
                    return option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
            >
                {options}
            </Select>
        </div>);
    }
}