import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ModalForm, PageContainer, ProFormText, ProTable, ProFormUploadButton } from '@ant-design/pro-components';
import { Button, message, Image, Popconfirm } from 'antd';
import errorImage from '@/assets/error.png';
import _ from '@/assets/utils';
import HOME_API from '@/services/home';
import styled from 'styled-components';
const StyledUploadBox = styled.div`
    .ant-upload-wrapper{
        height: 110px;
    }
`;

const Banner = function Banner() {
    /* 定义表格列 */
    const columns = [{
        title: '轮播图',
        dataIndex: 'carouselUrl',
        with: '20%',
        render: (dom) => {
            return <Image
                width={60}
                height={60}
                src={dom}
                fallback={errorImage}
            />;
        }
    }, {
        title: "跳转连接",
        dataIndex: 'redirectUrl',
        width: '20%',
        render: (dom) => {
            return <Button type="link"
                style={{ padding: 0 }}
                onClick={() => window.open(dom)}>
                {dom}
            </Button>;
        }
    }, {
        title: '排序值',
        dataIndex: 'carouselRank',
        with: '10%',
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        with: '20%',
        render: (dom) => {
            if (!dom) return '--';
            return _.formatTime(dom, '{0}-{1}-{2}');
        }
    }, {
        title: '操作',
        render: (_, record) => {
            let { carouselId, carouselUrl, carouselRank, redirectUrl } = record;
            return [
                <Popconfirm key="delete" title="确定要删除这条记录吗？"
                    onConfirm={() => {
                        handleRemove([carouselId]);
                    }}>
                    <a href="#">删除</a>
                </Popconfirm>,
                <Button key="update" type="link"
                    onClick={() => {
                        // 防止第一次加载组件，直接点击修改，如果按照异步操作，ModelForm还没有渲染解析，我们是获取不到实例信息的
                        flushSync(() => {
                            setModelVisible(true);
                            setCarouselId(carouselId);
                        });
                        // 给Form内部的三个字段赋值
                        modelFormIns.current.setFields([{
                            name: 'carouselUrl',
                            value: carouselUrl
                        }, {
                            name: 'carouselRank',
                            value: carouselRank
                        }, {
                            name: 'redirectUrl',
                            value: redirectUrl
                        }]);
                        // 给FileList赋值
                        setFileList([{
                            url: carouselUrl
                        }]);
                    }}>
                    修改
                </Button>
            ];
        }
    }];

    /* 定义状态 */
    const [modelVisible, setModelVisible] = useState(false),
        [carouselId, setCarouselId] = useState(null),
        [fileList, setFileList] = useState([]),
        [selectList, setSelectList] = useState([]),
        modelFormIns = useRef(),
        tableIns = useRef();

    /* Model关闭处理 */
    const modelOpenChange = (bool) => {
        if (bool) return;
        // 即将关闭Model层
        setModelVisible(false);
        setCarouselId(null);
        setFileList([]);
        setTimeout(() => {
            modelFormIns.current.resetFields();
        }, 500);
    };

    /* 表格数据的处理 */
    const queryTableData = async ({ pageSize, current }) => {
        let tableData = [],
            total = 0;
        try {
            let { resultCode, data } = await HOME_API.carouselsList(current, pageSize);
            if (+resultCode === 200) {
                total = +data.totalCount;
                tableData = data.list;
            }
        } catch (_) { }
        // 不论请求成功还是失败，都让表格进行渲染
        return {
            success: true,
            data: tableData,
            total
        };
    };

    /* 文件上传的方法 */
    const onBeforeUpload = ({ size }) => {
        if (size > 1024 * 1024) {
            message.warning('上传的图片不能超过1MB大小~');
            return false;
        }
        return true;
    };
    const onUploadChange = ({ file, fileList }) => {
        let response = file?.response,
            status = file?.status;
        if (status === 'done' && response) {
            let { resultCode, data } = response;
            if (+resultCode === 200) {
                modelFormIns.current.setFieldValue('carouselUrl', data);
            }
        }
        if (status === "removed") {
            modelFormIns.current.setFieldValue('carouselUrl', "");
        }
        setFileList(fileList);
    };

    /* 提交信息 */
    const submit = async (values) => {
        // 区分新增还是修改
        let requestFunc = HOME_API.carouselsInsert,
            tip = '新增';
        if (carouselId) {
            requestFunc = HOME_API.carouselsUpdate;
            tip = '修改';
            values.carouselId = carouselId;
        }
        try {
            let { resultCode } = await requestFunc(values);
            if (+resultCode !== 200) {
                message.error(`很遗憾，${tip}信息失败了，请稍后再试~`);
                return;
            }
            message.success(`恭喜您，${tip}信息成功！`);
            modelOpenChange(false);
            tableIns.current.reload();
        } catch (_) { }
    };

    /* 删除操作 */
    const handleRemove = async (ids) => {
        try {
            let { resultCode } = await HOME_API.carouselsRemove(ids);
            if (+resultCode !== 200) {
                message.error('很遗憾，删除失败，请稍后再试！');
                return;
            }
            message.error('恭喜您，删除成功！');
            tableIns.current.reload();
        } catch (_) { }
    };

    return <PageContainer>
        {/* 表格区域 */}
        <ProTable
            request={queryTableData}
            columns={columns}
            rowKey="carouselId"
            search={false}
            toolBarRender={() => {
                return [
                    <Button key="new" type="primary"
                        onClick={() => setModelVisible(true)}>
                        <PlusOutlined /> 新增
                    </Button>,
                    <Button key="delete" type="primary" danger
                        onClick={async () => {
                            if (selectList.length === 0) {
                                message.warning('请至少选择一项进行删除~');
                                return;
                            }
                            await handleRemove(selectList);
                        }}>
                        <MinusOutlined /> 批量删除
                    </Button>
                ];
            }}
            options={{
                density: false,
                reload: true,
                setting: true
            }}
            pagination={{
                pageSize: 10,
                hideOnSinglePage: false,
                showTotal: false,
                showQuickJumper: false,
                showSizeChanger: false
            }}
            rowSelection={{
                onChange: (selectedIds) => setSelectList(selectedIds)
            }}
            actionRef={tableIns}
        />

        {/* 弹出框 */}
        <ModalForm
            title={`${carouselId ? '修改' : '新增'}轮播图信息`}
            width="500px"
            layout='horizontal'
            open={modelVisible}
            onOpenChange={modelOpenChange}
            formRef={modelFormIns}
            labelCol={{ span: 5 }}
            validateTrigger="onBlur"
            initialValues={{
                carouselUrl: '',
                carouselRank: '200',
                redirectUrl: 'https://www.baidu.com/'
            }}
            onFinish={submit}
        >
            <StyledUploadBox>
                <ProFormUploadButton
                    name="carouselUrl"
                    label="上传图片"
                    rules={[
                        { required: true, message: '请您先上传图片' }
                    ]}
                    max={1}
                    fieldProps={{
                        action: '/api/upload/file',
                        headers: {
                            token: _.storage.get('tk')
                        },
                        accept: 'image/*',
                        listType: 'picture-card',
                        fileList,
                        beforeUpload: onBeforeUpload,
                        onChange: onUploadChange
                    }}
                />
            </StyledUploadBox>

            <ProFormText
                label="排序值"
                name="carouselRank"
                placeholder="范围1~200之间"
                rules={[
                    {
                        required: true,
                        validator: (_, value) => {
                            if (isNaN(value)) return Promise.reject('请输入有效数字');
                            if (value < 1 || value > 200) return Promise.reject('输入的值必须在1~200之间');
                            return Promise.resolve();
                        }
                    }
                ]}
            />
            <ProFormText
                label="跳转连接"
                name="redirectUrl"
                placeholder="请输入正确的网址"
                rules={[
                    { required: true, message: '请输入跳转连接' },
                    { pattern: /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/, message: '请输入正确的网址' }
                ]}
            />
        </ModalForm>
    </PageContainer>;
};
export default Banner;