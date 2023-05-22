import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, message, Form, Input, Popconfirm, Modal } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryCategories, addCategories, removeCategories, updateCategories } from './service';
import { FormattedMessage, useIntl } from 'umi';
import moment from 'moment';

const EditableContext = React.createContext();
const layout = {
  labelCol: {
    span: 6,
  },
};

const Categories = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const actionRef = useRef();
  const intl = useIntl();
  const [form] = Form.useForm();

  const handleAdd = async (params) => {
    try {
      const res = await addCategories({ ...params });
      if (res.code === 0) {
        message.success(res.msg);
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'categories.create_error_tip',
        }),
      );
      return false;
    }
  };

  const handleUpdate = async (params) => {
    try {
      const res = await updateCategories({ id: params._id, name: params.name });
      if (res.code === 0) {
        message.success(res.msg);
        actionRef.current?.reload();
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'categories.update_error_tip',
        }),
      );
      return false;
    }
  };

  const handleRemove = async (params) => {
    try {
      const res = await removeCategories({ id: params._id });
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

  let columns = [
    {
      title: intl.formatMessage({
        id: 'categories.name',
      }),
      dataIndex: 'name',
      editable: true,
      width: '30%',
      rules: [
        {
          required: true,
          message: intl.formatMessage({
            id: 'categories.name_required',
          }),
        },
        {
          pattern: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
          message: intl.formatMessage({
            id: 'categories.name_pattern',
          }),
        },
      ],
    },
    {
      title: intl.formatMessage({
        id: 'common.articlesNum',
      }),
      dataIndex: 'articleNum',
      hideInSearch: true,
      hideInForm: true,
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
      width: 100,
      render: (_, record) => {
        return record.articleNum === 0 && !record.status ? (
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
        ) : (
          <DeleteOutlined style={{ fontSize: 20 }} />
        );
      },
    },
  ];
  columns = columns.map((col) => {
    col.align = 'center';
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleUpdate,
      }),
    };
  });

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleUpdate,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
        inputRef.current.oldValue = record.name;
      }
    }, [editing]);

    const toggleEdit = () => {
      if (record.status) {
        return message.info(
          intl.formatMessage({
            id: 'categories.not_update',
          }),
        );
      } else {
        if (record.articleNum > 0) {
          return message.info(
            intl.formatMessage({
              id: 'categories.not_update_have_article',
            }),
          );
        }
      }
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const update = async (e) => {
      try {
        const values = await form.validateFields();
        if (inputRef.current.oldValue !== values.name) {
          handleUpdate({ ...record, ...values });
        }
        toggleEdit();
      } catch (error) {}
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                {
                  id: 'common.p_input',
                },
                {
                  name: title,
                },
              ),
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={update} onBlur={update} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const onCancel = () => {
    setModalVisible(false);
    form.resetFields();
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

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="_id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="categories.add" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryCategories({ ...params })}
        columns={columns}
        components={components}
        rowClassName={() => 'editable-row'}
      />

      <Modal
        destroyOnClose
        title={intl.formatMessage({
          id: 'categories.add',
        })}
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onOk}
      >
        <Form form={form} {...layout}>
          <Form.Item
            label={<FormattedMessage id="categories.name" />}
            name="name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'categories.p_name',
                }),
              },
              {
                min: 2,
                max: 20,
                message: intl.formatMessage(
                  {
                    id: 'common.p_pattern',
                  },
                  {
                    min: 2,
                    max: 20,
                  },
                ),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage(
                {
                  id: 'common.p_pattern',
                },
                {
                  min: 2,
                  max: 20,
                },
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Categories;
