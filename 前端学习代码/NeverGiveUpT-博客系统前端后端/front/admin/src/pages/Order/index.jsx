import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Button,
  message,
  Form,
  Switch,
  Input,
  Space,
  Popconfirm,
  Modal,
  DatePicker,
  Tooltip,
  Typography,
  Table,
  InputNumber,
  Statistic,
  Descriptions,
} from 'antd';
import { DeleteOutlined, PlusOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryOrder, addOrder, removeOrder, updateOrder } from './service';
import { FormattedMessage, useIntl } from 'umi';
import moment from 'moment';
const { Text } = Typography;
const layout = {
  labelCol: {
    span: 6,
  },
};
let updateId = '';
const Order = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDetail, setModalVisibleDetail] = useState(false);
  const actionRef = useRef();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [formDetail] = Form.useForm();
  const [statistic, setStatistic] = useState({
    totalAmounts: 0,
    totalBrokerage: 0,
    finishedTotalBorrow: 0,
    noTotalBorrow: 0,
  });

  const handleAdd = async (params) => {
    try {
      let func = addOrder;
      if (updateId) {
        func = updateOrder;
      }
      const res = await func({ id: updateId, ...params });
      if (res.code === 0) {
        message.success(res.msg);
        return true;
      }
    } catch (error) {
      message.error('新增失败');
      return false;
    }
  };

  const updateTagsStatus = async (status, record) => {
    const res = await updateOrder({ id: record._id, status });
    if (res.code === 0) {
      message.success(res.msg);
      actionRef.current?.reload();
    }
  };

  const handleEdit = (record) => {
    updateId = record._id;
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleRemove = async (params) => {
    try {
      const res = await removeOrder({ id: params._id });
      if (res.code === 0) {
        message.success(res.msg);
        actionRef.current?.reload();
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'categories.remove_error_tip',
        }),
      );
      return false;
    }
  };

  const handleDetail = (record) => {
    updateId = record._id;
    if (record.details) {
      let data = [];
      record.details.forEach((item) => {
        data.push({
          ...item,
          payTime: moment(item.payTime * 1000),
        });
      });
      console.log('data', data);
      formDetail.setFields([
        {
          name: 'details',
          value: data,
        },
      ]);
    }

    setModalVisibleDetail(true);
  };

  let columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      width: 140,
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '文件夹名称',
      dataIndex: 'fileName',
      hideInSearch: true,
    },
    {
      title: '项目来源',
      dataIndex: 'source',
    },
    {
      title: '报价金额',
      dataIndex: 'totalAmount',
      hideInSearch: true,
      render: (_, record) => {
        return record.totalAmount?.toFixed(2);
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: '平台抽成',
      dataIndex: 'brokerage',
      hideInSearch: true,
      render: (_, record) => {
        return record.brokerage?.toFixed(2);
      },
    },
    {
      title: '实际收款',
      hideInSearch: true,
      render: (_, record) => {
        let money = 0;
        record.details.forEach((item) => {
          money += item.amount;
        });
        return money.toFixed(2);
      },
    },

    {
      title: '未收款',
      hideInSearch: true,
      render: (_, record) => {
        let money = 0;
        record.details.forEach((item) => {
          money += item.amount;
        });
        return (record.totalAmount - record.brokerage - money).toFixed(2);
      },
    },
    {
      title: '是否完成',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => {
        let title = [];
        if (record.details && record.details.length) {
          record.details.forEach((item) => {
            title.push(
              <div key={item.periods}>
                {item.periods}：{item.amount}元
              </div>,
            );
          });
          return (
            <Tooltip color={'#f50'} title={title}>
              <Switch
                checked={record.status}
                checkedChildren={intl.formatMessage({
                  id: 'common.yes',
                })}
                unCheckedChildren={intl.formatMessage({
                  id: 'common.no',
                })}
                onChange={(checked) => updateTagsStatus(checked, record)}
              />
            </Tooltip>
          );
        } else {
          return (
            <Switch
              checked={record.status}
              checkedChildren={intl.formatMessage({
                id: 'common.yes',
              })}
              unCheckedChildren={intl.formatMessage({
                id: 'common.no',
              })}
              onChange={(checked) => updateTagsStatus(checked, record)}
            />
          );
        }
      },
      filters: [
        {
          text: '已完成',
          value: true,
        },
        {
          text: '未完成',
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },

    {
      title: intl.formatMessage({
        id: 'common.createTime',
      }),
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({
        id: 'common.updateTime',
      }),
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) =>
        record.updateTime === 0
          ? '-'
          : moment(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: intl.formatMessage({
        id: 'common.action',
      }),
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <a>
              <EditOutlined
                style={{ fontSize: 20, marginRight: 10 }}
                onClick={() => handleEdit(record)}
              />
            </a>

            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage(
                {
                  id: 'categories.remove_tip',
                },
                {
                  name: record.name,
                },
              )}
              onConfirm={() => handleRemove(record)}
            >
              <a>
                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
              </a>
            </Popconfirm>
            <Button
              onClick={() => handleDetail(record)}
              style={{ marginLeft: 10 }}
              type="primary"
              size="small"
            >
              付款明细
            </Button>
          </>
        );
      },
    },
  ];
  columns = columns.map((col) => {
    col.align = 'center';
    return col;
  });

  const onCancel = () => {
    updateId = '';
    setModalVisible(false);
    form.resetFields();
  };

  const onCancelDetail = () => {
    updateId = '';
    setModalVisibleDetail(false);
    formDetail.resetFields();
  };

  const onOk = async () => {
    const values = await form.validateFields();
    if (values) {
      const success = await handleAdd(values);
      if (success) {
        onCancel();
        actionRef.current?.reload();
      }
    }
  };

  const onOkDetail = async () => {
    const values = await formDetail.validateFields();
    if (values) {
      values.details = values.details.map((item) => {
        item.payTime = moment(item.payTime).unix();
        return item;
      });
      const success = await handleAdd(values);
      if (success) {
        onCancelDetail();
        actionRef.current?.reload();
      }
    }
  };

  return (
    <PageContainer>
      <FooterToolbar style={{ paddingTop: 16 }}>
        <Descriptions
          column={4}
          labelStyle={{
            alignItems: 'center',
          }}
        >
          <Descriptions.Item label="共计报价金额">
            <Statistic
              value={statistic.totalAmounts}
              prefix="￥"
              valueStyle={{ color: '#1890ff' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="共计平台抽成">
            <Statistic
              value={statistic.totalBrokerage}
              prefix="￥"
              valueStyle={{ color: '#faad14' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="已收款">
            <Statistic
              value={statistic.finishedTotalBorrow}
              prefix="￥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="未收款">
            <Statistic
              value={statistic.noTotalBorrow}
              prefix="￥"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Descriptions.Item>
        </Descriptions>
      </FooterToolbar>
      <ProTable
        scroll={{ x: 1800 }}
        actionRef={actionRef}
        rowKey="_id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined /> 添加订单
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const res = await queryOrder({ ...params });
          const pageData = res.data;
          let totalAmounts = 0; // 报价金额之和
          let totalBrokerage = 0; // 平台抽成之和
          let finishedTotalBorrow = 0; // 已完成实际收款
          let noTotalBorrow = 0; // 未完成实际收款

          pageData.forEach(({ totalAmount, brokerage, status, details }) => {
            totalAmounts += totalAmount;
            totalBrokerage += brokerage;

            let realAmount = 0;
            details.forEach((item) => {
              realAmount += item.amount;
            });

            finishedTotalBorrow += realAmount; // 已收款
            noTotalBorrow += totalAmount - brokerage - realAmount; // 未收款
            setStatistic({
              totalAmounts: totalAmounts.toFixed(2),
              totalBrokerage: totalBrokerage.toFixed(2),
              finishedTotalBorrow: finishedTotalBorrow.toFixed(2),
              noTotalBorrow: noTotalBorrow.toFixed(2),
            });
          });

          return res;
        }}
        columns={columns}
        // 表格中统计
        // summary={(pageData) => {
        //   let totalAmounts = 0; // 报价金额之和
        //   let totalBrokerage = 0; // 平台抽成之和
        //   let finishedTotalBorrow = 0; // 已完成实际收款
        //   let noTotalBorrow = 0; // 未完成实际收款

        //   pageData.forEach(({ totalAmount, brokerage, status, details }) => {
        //     totalAmounts += totalAmount;
        //     totalBrokerage += brokerage;

        //     let realAmount = 0;
        //     details.forEach((item) => {
        //       realAmount += item.amount;
        //     });

        //     finishedTotalBorrow += realAmount; // 已收款
        //     noTotalBorrow += totalAmount - brokerage - realAmount; // 未收款
        //     if (status) {
        //       // 已完成实际收款 = 实际收款
        //       finishedTotalBorrow += realAmount;
        //     } else {
        //       // 未完成实际收款 = 报价金额 - 平台抽成 - 实际收款
        //       noTotalBorrow += totalAmount - brokerage - realAmount;
        //     }
        //   });
        //   return (
        //     <>
        //       <Table.Summary.Row style={{ fontWeight: 500 }}>
        //         <Table.Summary.Cell>共计报价金额：</Table.Summary.Cell>
        //         <Table.Summary.Cell>
        //           <Text type="warning">￥{totalAmounts.toFixed(2)}</Text>
        //         </Table.Summary.Cell>
        //         <Table.Summary.Cell>共计平台抽成：</Table.Summary.Cell>
        //         <Table.Summary.Cell colSpan={8}>
        //           <Text type="warning">￥{totalBrokerage.toFixed(2)}</Text>
        //         </Table.Summary.Cell>
        //       </Table.Summary.Row>

        //       <Table.Summary.Row style={{ fontWeight: 500 }}>
        //         <Table.Summary.Cell>已收款：</Table.Summary.Cell>
        //         <Table.Summary.Cell>
        //           <Text type="success">￥{finishedTotalBorrow.toFixed(2)}</Text>
        //         </Table.Summary.Cell>
        //         <Table.Summary.Cell>未收款：</Table.Summary.Cell>
        //         <Table.Summary.Cell colSpan={8}>
        //           <Text type="danger">￥{noTotalBorrow.toFixed(2)}</Text>
        //         </Table.Summary.Cell>
        //       </Table.Summary.Row>
        //     </>
        //   );
        // }}
        pagination={{
          defaultPageSize: 100,
          pageSizeOptions: [100, 200, 300, 500],
        }}
      />

      <Modal destroyOnClose title="添加订单" visible={modalVisible} onCancel={onCancel} onOk={onOk}>
        <Form form={form} {...layout}>
          <Form.Item
            label="项目名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="文件夹名称" name="fileName">
            <Input />
          </Form.Item>
          <Form.Item
            label="项目来源"
            name="source"
            rules={[
              {
                required: true,
                message: '请输入项目来源',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="总金额"
            name="totalAmount"
            rules={[
              {
                required: true,
                message: '请输入总金额',
              },
            ]}
          >
            <Input addonAfter="元" />
          </Form.Item>
          <Form.Item label="平台抽成" name="brokerage">
            <Input addonAfter="元" />
          </Form.Item>
          <Form.Item label="是否完成" name="status" valuePropName="checked">
            <Switch
              checkedChildren={intl.formatMessage({
                id: 'common.yes',
              })}
              unCheckedChildren={intl.formatMessage({
                id: 'common.no',
              })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        destroyOnClose
        title="付款明细"
        visible={modalVisibleDetail}
        onCancel={onCancelDetail}
        onOk={onOkDetail}
        width={1200}
      >
        <Form form={formDetail} name="dynamic_form_nest_item" autoComplete="off">
          <Form.List name="details">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'periods']}
                      fieldKey={[fieldKey, 'periods']}
                      rules={[{ required: true, message: '请输入第几期' }]}
                    >
                      <Input placeholder="期数" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'amount']}
                      fieldKey={[fieldKey, 'amount']}
                      rules={[{ required: true, message: '请输入付款金额' }]}
                    >
                      <InputNumber placeholder="金额" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'payTime']}
                      fieldKey={[fieldKey, 'payTime']}
                      rules={[{ required: true, message: '请选择收款时间' }]}
                    >
                      <DatePicker showTime placeholder="收款时间" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'payWay']}
                      fieldKey={[fieldKey, 'payWay']}
                      rules={[{ required: true, message: '请输入支付方式' }]}
                    >
                      <Input placeholder="支付方式" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'orderNumber']}
                      fieldKey={[fieldKey, 'orderNumber']}
                    >
                      <Input placeholder="订单号" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'remark']}
                      fieldKey={[fieldKey, 'remark']}
                    >
                      <Input placeholder="备注" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加期数
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Order;
