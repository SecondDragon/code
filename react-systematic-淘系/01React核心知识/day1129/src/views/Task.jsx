import React from "react";
import './Task.less';
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag, message } from 'antd';
import { getTaskList, addTask, removeTask, completeTask } from '@/api';
import { flushSync } from 'react-dom';

/* 对日期处理的方法 */
const zero = function zero(text) {
    text = String(text);
    return text.length < 2 ? '0' + text : text;
};
const formatTime = function formatTime(time) {
    let arr = time.match(/\d+/g),
        [, month, day, hours = '00', minutes = '00'] = arr;
    return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
};

class Task extends React.Component {
    /* 表格列的数据 */
    columns = [{
        title: '编号',
        dataIndex: 'id',
        align: 'center',
        width: '8%'
    }, {
        title: '任务描述',
        dataIndex: 'task',
        ellipsis: true,
        width: '50%'
    }, {
        title: '状态',
        dataIndex: 'state',
        align: 'center',
        width: '10%',
        render: text => +text === 1 ? '未完成' : '已完成'
    }, {
        title: '完成时间',
        dataIndex: 'time',
        align: 'center',
        width: '15%',
        render: (_, record) => {
            let { state, time, complete } = record;
            if (+state === 2) time = complete;
            return formatTime(time);
        }
    }, {
        title: '操作',
        render: (_, record) => {
            let { id, state } = record;
            return <>
                <Popconfirm title="您确定要删除此任务吗？"
                    onConfirm={this.handleRemove.bind(null, id)}>
                    <Button type="link">删除</Button>
                </Popconfirm>

                {+state !== 2 ? <Popconfirm title="您确把此任务设置为完成吗？"
                    onConfirm={this.handleUpdate.bind(null, id)}>
                    <Button type="link">完成</Button>
                </Popconfirm> : null}
            </>;
        }
    }];

    /* 初始组件的状态 */
    state = {
        tableData: [],
        tableLoading: false,
        modalVisible: false,
        confirmLoading: false,
        selectedIndex: 0
    };

    /* 对话框和表单处理 */
    // 关闭对话框 & 清除表单中的内容
    closeModal = () => {
        this.setState({
            modalVisible: false,
            confirmLoading: false
        });
        this.formIns.resetFields();
    };

    // 新增任务
    submit = async () => {
        try {
            // 表单校验
            await this.formIns.validateFields();
            // 获取Form收集的信息
            let { task, time } = this.formIns.getFieldsValue();
            time = time.format('YYYY-MM-DD HH:mm:ss');
            // 向服务器发送请求
            this.setState({ confirmLoading: true });
            let { code } = await addTask(task, time);
            if (+code !== 0) {
                message.error('很遗憾，当前操作失败，请稍后再试!');
            } else {
                this.closeModal();
                this.queryData();
                message.success('恭喜您，当前操作成功!');
            }
        } catch (_) { }
        this.setState({ confirmLoading: false });
    };

    /* 关于TABLE数据的处理 */
    // 从服务器获取指定状态的任务
    queryData = async () => {
        let { selectedIndex } = this.state;
        try {
            this.setState({ tableLoading: true });
            let { code, list } = await getTaskList(selectedIndex);
            if (+code !== 0) list = [];
            this.setState({
                tableData: list
            });
        } catch (_) { }
        this.setState({ tableLoading: false });
    };

    // 选中状态切换
    changeIndex = (index) => {
        if (this.state.selectedIndex === index) return;
        /* this.setState({
            selectedIndex: index
        }, () => {
            this.queryData();
        }); */

        flushSync(() => {
            this.setState({
                selectedIndex: index
            });
        });
        this.queryData();
    };

    // 删除
    handleRemove = async (id) => {
        try {
            let { code } = await removeTask(id);
            if (+code !== 0) {
                message.error('很遗憾，操作失败，请稍后再试!');
            } else {
                this.queryData();
                message.success('恭喜您，操作成功!');
            }
        } catch (_) { }
    };

    // 完成
    handleUpdate = async (id) => {
        try {
            let { code } = await completeTask(id);
            if (+code !== 0) {
                message.error('很遗憾，操作失败，请稍后再试!');
            } else {
                this.queryData();
                message.success('恭喜您，操作成功!');
            }
        } catch (_) { }
    };

    /* 周期函数 */
    componentDidMount() {
        // 第一次渲染完毕后，立即发送数据请求，获取真实的数据
        this.queryData();
    }

    render() {
        let { tableData, tableLoading, modalVisible, confirmLoading, selectedIndex } = this.state;

        return <div className="task-box">
            {/* 头部 */}
            <div className="header">
                <h2 className="title">TASK OA 任务管理系统</h2>
                <Button type="primary" onClick={() => {
                    this.setState({
                        modalVisible: true
                    });
                }}>新增任务</Button>
            </div>

            {/* 标签 */}
            <div className="tag-box">
                {['全部', '未完成', '已完成'].map((item, index) => {
                    return <Tag key={index}
                        color={selectedIndex === index ? '#1677ff' : ''}
                        onClick={this.changeIndex.bind(null, index)}>
                        {item}
                    </Tag>;
                })}
            </div>

            {/* 表格 */}
            <Table dataSource={tableData}
                columns={this.columns}
                loading={tableLoading}
                pagination={false}
                rowKey="id" />

            {/* 对话框 & 表单 */}
            <Modal title="新增任务窗口" open={modalVisible} confirmLoading={confirmLoading} keyboard={false} maskClosable={false} okText="确认提交" onCancel={this.closeModal} onOk={this.submit}>
                <Form ref={x => this.formIns = x} layout="vertical" initialValues={{ task: '', time: '' }}>
                    <Form.Item label="任务描述" name="task" validateTrigger="onBlur"
                        rules={[
                            { required: true, message: '任务描述是必填项' },
                            { min: 6, message: '输入的内容至少6位及以上' }
                        ]}>
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="预期完成时间" name="time" validateTrigger="onBlur"
                        rules={[
                            { required: true, message: '预期完成时间是必填项' }
                        ]}>
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
    }
}

export default Task;