import React, { useState, useEffect } from "react";
import './Task.less';
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag, message } from 'antd';
import { addTask, removeTask, completeTask } from '@/api';
import { connect } from 'react-redux';
import action from '@/store/actions';

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

const Task = function Task(props) {
    /* 获取基于属性传递进来的公共状态 & ActionCreator */
    let { taskList, queryAllList, deleteTaskById, updateTaskById } = props;

    /* 表格列的数据 */
    const columns = [{
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
                    onConfirm={removeHandle.bind(null, id)}>
                    <Button type="link">删除</Button>
                </Popconfirm>

                {+state !== 2 ? <Popconfirm title="您确把此任务设置为完成吗？"
                    onConfirm={updateHandle.bind(null, id)}>
                    <Button type="link">完成</Button>
                </Popconfirm> : null}
            </>;
        }
    }];

    /* 定义需要的状态 */
    let [selectedIndex, setSelectedIndex] = useState(0),
        [tableData, setTableData] = useState([]),
        [tableLoading, setTableLoading] = useState(false),
        [modalVisible, setModalVisible] = useState(false),
        [confirmLoading, setConfirmLoading] = useState(false);
    let [formIns] = Form.useForm();

    /* 关于TABLE和数据的处理 */
    // 第一次渲染完毕，判断redux中是否有全部任务；如果没有，则进行异步的派发！！
    useEffect(() => {
        (async () => {
            if (!taskList) {
                setTableLoading(true);
                await queryAllList();
                setTableLoading(false);
            }
        })();
    }, []);

    // 依赖于redux中的全部任务 & 选中的状态信息，从全部任务中，筛选出表格需要的数据
    useEffect(() => {
        if (!taskList) {
            setTableData([]);
            return;
        }
        if (selectedIndex !== 0) {
            taskList = taskList.filter(item => {
                return +item.state === +selectedIndex;
            });
        }
        setTableData(taskList);
    }, [taskList, selectedIndex]);

    /* 关于Modal和表单的处理 */
    const closeModal = () => {
        setModalVisible(false);
        setConfirmLoading(false);
        formIns.resetFields();
    };
    const submit = async () => {
        try {
            await formIns.validateFields();
            let { task, time } = formIns.getFieldsValue();
            time = time.format('YYYY-MM-DD HH:mm:ss');
            setConfirmLoading(true);
            let { code } = await addTask(task, time);
            if (+code === 0) {
                closeModal();
                queryAllList(); //派发任务，重新获取全部任务信息，同步到redux中
                message.success('恭喜您，操作成功了！');
            } else {
                message.error('很遗憾，操作失败了，请稍后再试！');
            }
        } catch (_) { }
        setConfirmLoading(false);
    };

    /* 关于删除和完成的操作 */
    const removeHandle = async (id) => {
        try {
            let { code } = await removeTask(id);
            if (+code === 0) {
                deleteTaskById(id); //派发任务，删除redux中的数据
                message.success('恭喜您，操作成功了！');
            } else {
                message.error('很遗憾，操作失败了，请稍后再试！');
            }
        } catch (_) { }
    };
    const updateHandle = async (id) => {
        try {
            let { code } = await completeTask(id);
            if (+code === 0) {
                updateTaskById(id); //派发任务， 修改redux中的数据
                message.success('恭喜您，操作成功了！');
            } else {
                message.error('很遗憾，操作失败了，请稍后再试！');
            }
        } catch (_) { }
    };

    return <div className="task-box">
        {/* 头部 */}
        <div className="header">
            <h2 className="title">TASK OA 任务管理系统</h2>
            <Button type="primary" onClick={() => {
                setModalVisible(true);
            }}>新增任务</Button>
        </div>

        {/* 标签 */}
        <div className="tag-box">
            {['全部', '未完成', '已完成'].map((item, index) => {
                return <Tag key={index}
                    color={index === selectedIndex ? '#1677ff' : ''}
                    onClick={() => {
                        setSelectedIndex(index);
                    }}>
                    {item}
                </Tag>;
            })}
        </div>

        {/* 表格 */}
        <Table columns={columns}
            dataSource={tableData}
            loading={tableLoading}
            pagination={false}
            rowKey="id" />

        {/* 对话框 & 表单 */}
        <Modal title="新增任务窗口" open={modalVisible} confirmLoading={confirmLoading} keyboard={false} maskClosable={false} okText="确认提交" onCancel={closeModal} onOk={submit}>
            <Form layout="vertical"
                initialValues={{ task: '', time: '' }}
                validateTrigger="onBlur"
                form={formIns}>
                <Form.Item label="任务描述" name="task"
                    rules={[
                        { required: true, message: '任务描述是必填项' },
                        { min: 6, message: '输入的内容至少6位及以上' }
                    ]}>
                    <Input.TextArea rows={4}></Input.TextArea>
                </Form.Item>
                <Form.Item label="预期完成时间" name="time"
                    rules={[
                        { required: true, message: '预期完成时间是必填项' }
                    ]}>
                    <DatePicker showTime />
                </Form.Item>
            </Form>
        </Modal>
    </div>
};
export default connect(
    state => state.task,
    action.task
)(Task);