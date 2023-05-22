import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Button,
  message,
  Switch,
  Form,
  InputNumber,
  Popconfirm,
  Avatar,
  Tooltip,
  Badge,
  Tag,
  Radio,
} from 'antd';
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  ToTopOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { history, FormattedMessage, useIntl } from 'umi';
import { randomColor } from '@/utils/utils';
import {
  queryArticles,
  updateArticlesStatus,
  updateArticlesPublishStatus,
  removeArticles,
  updateSort,
  updateArticlesCollectStatus,
} from './service';
import { queryCategories } from '@/pages/Categories/service';
import { queryTags } from '@/pages/Tags/service';
import moment from 'moment';
import './index.less';

const Articles = () => {
  const actionRef = useRef();
  const EditableContext = React.createContext();
  const [categories, setCategories] = useState({});
  const intl = useIntl();
  const [tags, setTags] = useState([
    intl.formatMessage({
      id: 'common.all',
    }),
  ]);

  const loadTagsOrCategories = async (func) => {
    const res = await func({
      pageSize: 100,
    });
    if (res.data) {
      let data = res.data.map((item) => item.name);
      if (func === queryCategories) {
        data = [
          intl.formatMessage({
            id: 'common.all',
          }),
          ...data,
        ];
      }
      const obj = {};
      data.forEach((item) => {
        obj[item] = {
          text: item,
        };
      });
      if (func === queryTags) {
        setTags(obj);
      } else {
        setCategories(obj);
      }
    }
  };

  useEffect(() => {
    loadTagsOrCategories(queryTags);
    loadTagsOrCategories(queryCategories);
  }, []);

  /**
   *
   * @param {*} type 类型 1=添加 2=修改 3=预览
   * @param {*} id 修改和预览的文章id
   */
  const goEdit = (type, id) => {
    history.push(`/articles/${type}/${id ? id : 0}`);
  };

  const handleCollect = async (e) => {
    const isCollect = e.target.value;
    try {
      const res = await updateArticlesCollectStatus({ isCollect });
      if (res.code === 0) {
        message.success(res.msg);
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'articles.all_collect_error_tip',
        }),
      );
    }
  };

  const handleUpdateStatus = async (status, params, actionRef) => {
    try {
      const res = await updateArticlesStatus({ id: params._id, status: status ? 1 : 2 });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'articles.enable_error_tip',
        }),
      );
      return false;
    }
  };

  const handlePublish = async (params, actionRef) => {
    try {
      const res = await updateArticlesPublishStatus({
        id: params._id,
        publishStatus: params.publishStatus === 1 ? 2 : 1,
      });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'articles.publish_error_tip',
        }),
      );
      return false;
    }
  };

  const handleRemove = async (params, actionRef) => {
    try {
      const res = await removeArticles({
        id: params._id,
      });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'articles.remove_error_tip',
        }),
      );
      return false;
    }
  };

  const handleUpdateSort = async (params, actionRef) => {
    try {
      let postData = { id: params._id, sort: params.sort * 1, top: params.top };
      const res = await updateSort(postData);
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'articles.update_sort_error_tip',
        }),
      );
      return false;
    }
  };

  const someTitle = () => {
    return (
      <>
        <FormattedMessage id="common.view" /> /
        <FormattedMessage id="common.comment" /> /
        <FormattedMessage id="common.like" /> /
        <FormattedMessage id="common.collect" />
      </>
    );
  };

  let columns = [
    {
      title: intl.formatMessage({
        id: 'articles.title',
      }),
      dataIndex: 'title',
      formItemProps: {
        placeholder: intl.formatMessage({
          id: 'articles.p_title',
        }),
        autoComplete: 'off',
      },
      width: 100,
      fixed: 'left',
      render: (_, record) => {
        return (
          <Tooltip title={record.title}>
            <span>{record.title.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.cover',
      }),
      dataIndex: 'cover',
      hideInSearch: true,
      width: 100,
      render: (_, record) => {
        return <Avatar shape="square" src={record.cover} />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.introduction',
      }),
      dataIndex: 'introduction',
      hideInSearch: true,
      width: 100,
      render: (_, record) => {
        return (
          <Tooltip title={record.introduction}>
            <span>{record.introduction.slice(0, 10)}</span>
          </Tooltip>
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.categories',
      }),
      dataIndex: 'categories',
      width: 100,
      valueEnum: {
        ...categories,
      },
      initialValue: intl.formatMessage({
        id: 'common.all',
      }),
      formItemProps: {
        placeholder: intl.formatMessage({
          id: 'articles.p_choose_categories',
        }),
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.tags',
      }),
      dataIndex: 'tags',
      width: 200,
      formItemProps: {
        placeholder: intl.formatMessage({
          id: 'articles.p_choose_tags',
        }),
      },
      fieldProps: {
        mode: 'tags',
      },
      valueEnum: {
        ...tags,
      },
      render: (_, record) => {
        if (record.tags.length > 0) {
          let result = [];
          for (let i = 0; i < record.tags.length; i += 3) {
            result.push(record.tags.slice(i, i + 3));
          }
          return result.map((item, index) => {
            return (
              <div style={{ marginBottom: 10 }} key={index}>
                {item.map((sub) => (
                  <Tag key={sub} color={randomColor()}>
                    {sub}
                  </Tag>
                ))}
              </div>
            );
          });
        }
      },
    },
    {
      title: someTitle(),
      dataIndex: 'views',
      width: 200,
      hideInSearch: true,
      render: (_, record) => {
        return `${record.views}/${record.comment}/${record.like}/${record.collect}`;
      },
    },
    {
      title: intl.formatMessage({
        id: 'articles.articlesStatus',
      }),
      dataIndex: 'status',
      width: 100,
      initialValue: '0',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'common.all',
          }),
        },
        1: {
          text: intl.formatMessage({
            id: 'common.enable',
          }),
        },
        2: {
          text: intl.formatMessage({
            id: 'common.disable',
          }),
        },
      },
      render: (_, record) => {
        return (
          <Switch
            checkedChildren={intl.formatMessage({
              id: 'common.enable',
            })}
            unCheckedChildren={intl.formatMessage({
              id: 'common.disable',
            })}
            checked={record.status === 1}
            onChange={(checked) => handleUpdateStatus(checked, record, actionRef)}
          />
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'articles.publishStatus',
      }),
      dataIndex: 'publishStatus',
      width: 100,
      initialValue: '0',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'common.all',
          }),
        },
        1: {
          text: intl.formatMessage({
            id: 'common.published',
          }),
        },
        2: {
          text: intl.formatMessage({
            id: 'common.unpublished',
          }),
        },
      },
      render: (_, record) => {
        const text =
          record.publishStatus === 1
            ? intl.formatMessage({
                id: 'common.published',
              })
            : intl.formatMessage({
                id: 'common.unpublished',
              });
        return <Badge status={record.publishStatus === 1 ? 'success' : 'error'} text={text} />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'articles.sort',
      }),
      dataIndex: 'sort',
      hideInSearch: true,
      width: 100,
      editable: true,
    },

    {
      title: intl.formatMessage({
        id: 'common.createTime',
      }),
      dataIndex: 'createTime',
      width: 200,
      valueType: 'dateTimeRange',
      render: (_, record) => moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({
        id: 'common.updateTime',
      }),
      dataIndex: 'updateTime',
      width: 200,
      valueType: 'dateTimeRange',
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
            {/* 发布和下线 */}
            <Popconfirm
              placement="topLeft"
              title={
                record.publishStatus === 1
                  ? intl.formatMessage(
                      {
                        id: 'articles.publish_cancel_tip',
                      },
                      {
                        name: record.title,
                      },
                    )
                  : intl.formatMessage(
                      {
                        id: 'articles.publish_tip',
                      },
                      {
                        name: record.title,
                      },
                    )
              }
              onConfirm={() => handlePublish(record, actionRef)}
            >
              <a style={{ marginRight: 10 }}>
                {record.publishStatus === 1 ? (
                  <CloudDownloadOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
                ) : (
                  <CloudUploadOutlined style={{ fontSize: 20 }} />
                )}
              </a>
            </Popconfirm>

            {/* 预览 */}
            <a style={{ marginRight: 10 }}>
              <EyeOutlined
                style={{ color: '#52c41a', fontSize: 20 }}
                onClick={() => goEdit(3, record._id)}
              />
            </a>

            {/* 修改 */}
            {record.publishStatus === 2 && (
              <a style={{ marginRight: 10 }}>
                <EditOutlined style={{ fontSize: 20 }} onClick={() => goEdit(2, record._id)} />
              </a>
            )}

            {/* 删除 */}
            {record.publishStatus === 2 && (
              <Popconfirm
                placement="topLeft"
                title={intl.formatMessage(
                  {
                    id: 'articles.remove_tip',
                  },
                  {
                    name: record.title,
                  },
                )}
                onConfirm={() => handleRemove(record, actionRef)}
              >
                <a>
                  <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
                </a>
              </Popconfirm>
            )}
          </>
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
        handleUpdateSort,
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
    handleUpdateSort,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
        inputRef.current.oldValue = record.sort;
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const update = async (e) => {
      try {
        const values = await form.validateFields();
        if (inputRef.current.oldValue !== values.sort) {
          handleUpdateSort({ ...record, ...values }, actionRef);
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
          <InputNumber ref={inputRef} onPressEnter={update} onBlur={update} />
        </Form.Item>
      ) : (
        <>
          <div
            className="editable-cell-value-wrap"
            style={{
              paddingRight: 24,
            }}
            onClick={toggleEdit}
          >
            {children}
          </div>
          <ToTopOutlined
            onClick={() => handleUpdateSort({ ...record, top: true }, actionRef)}
            className="to-top"
          />
        </>
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

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="_id"
        toolBarRender={(action, { selectedRows }) => [
          <Radio.Group key="collect" buttonStyle="solid" onChange={handleCollect}>
            <Radio.Button value={true}>
              <FormattedMessage id="articles.open_collect" />
            </Radio.Button>
            <Radio.Button value={false}>
              <FormattedMessage id="articles.close_collect" />
            </Radio.Button>
          </Radio.Group>,
          <Button key="add" type="primary" onClick={() => goEdit(1)}>
            <PlusOutlined /> <FormattedMessage id="articles.createArticle" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryArticles({ ...params })}
        columns={columns}
        scroll={{ x: 1300 }}
        components={components}
        rowClassName={() => 'editable-row'}
      />
    </PageContainer>
  );
};

export default Articles;
