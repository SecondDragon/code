import React, { useState, useRef } from 'react';
import { message, Popconfirm, Tooltip, Badge, Button, Modal, Radio } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from 'umi';

import { queryComment, updateCommentStatus, removeComment } from './service';
import moment from 'moment';

const Comment = () => {
  const actionRef = useRef();
  const intl = useIntl();
  const [params, setParams] = useState({
    visible: false,
    auditStatus: '',
    _id: '',
  });
  const MAP = new Map([
    [
      1,
      [
        'success',
        intl.formatMessage({
          id: 'common.pass',
        }),
      ],
    ],
    [
      2,
      [
        'error',
        intl.formatMessage({
          id: 'common.reject',
        }),
      ],
    ],
    [
      3,
      [
        'default',
        intl.formatMessage({
          id: 'common.unchecked',
        }),
      ],
    ],
  ]);

  const onOk = async () => {
    if (params.auditStatus === 3)
      return message.info(
        intl.formatMessage({
          id: 'comment.p_audit_type',
        }),
      );
    try {
      const res = await updateCommentStatus({ id: params._id, auditStatus: params.auditStatus });
      if (res.code === 0) {
        setParams((preState) => {
          return {
            ...preState,
            visible: false,
          };
        });
        message.success(res.msg);
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'comment.audit_error_tip',
        }),
      );
    }
  };

  const handleRemove = async (params, actionRef) => {
    try {
      const res = await removeComment({
        id: params._id,
      });
      if (res.code === 0) {
        message.success(res.msg);
        actionRef.current?.reload();
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'comment.remove_error_tip',
        }),
      );
    }
  };

  const showAuditModal = (record) => {
    setParams((preState) => {
      return {
        ...preState,
        visible: true,
        auditStatus: record ? record.auditStatus : 3,
        _id: record ? record._id : '0',
      };
    });
  };

  let columns = [
    {
      title: intl.formatMessage({
        id: 'articles.title',
      }),
      dataIndex: 'articleTitle',
      fixed: 'left',
      ellipsis: true, // 自动省略
    },
    {
      title: intl.formatMessage({
        id: 'comment.nickName',
      }),
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({
        id: 'comment.currentReplayContent',
      }),
      dataIndex: 'currentReplayContent',
      hideInSearch: true,
      ellipsis: true, // 自动省略
    },
    {
      title: intl.formatMessage({
        id: 'comment.targetReplayId',
      }),
      dataIndex: 'targetReplayId',
      hideInSearch: true,
      width: 250,
    },
    {
      title: intl.formatMessage({
        id: 'comment.targetReplayContent',
      }),
      dataIndex: 'targetReplayContent',
      hideInSearch: true,
      ellipsis: true, // 自动省略
    },

    {
      title: intl.formatMessage({
        id: 'comment.auditStatus',
      }),
      dataIndex: 'auditStatus',
      initialValue: '0',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'common.all',
          }),
        },
        1: {
          text: intl.formatMessage({
            id: 'common.pass',
          }),
        },
        2: {
          text: intl.formatMessage({
            id: 'common.reject',
          }),
        },
        3: {
          text: intl.formatMessage({
            id: 'common.unchecked',
          }),
        },
      },
      render: (_, record) => {
        record.auditStatus *= 1;

        return (
          <Badge status={MAP.get(record.auditStatus)[0]} text={MAP.get(record.auditStatus)[1]} />
        );
      },
    },

    {
      title: intl.formatMessage({
        id: 'comment.commentTime',
      }),
      dataIndex: 'commentTime',
      width: 200,
      hideInSearch: true,
      render: (_, record) => moment(record.commentTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: intl.formatMessage({
        id: 'comment.auditTime',
      }),
      dataIndex: 'auditTime',
      width: 200,
      hideInSearch: true,
      render: (_, record) =>
        record.auditTime === 0
          ? '-'
          : moment(record.auditTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: intl.formatMessage({
        id: 'common.action',
      }),
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage(
                {
                  id: 'comment.p_remove_tip',
                },
                {
                  name: record.articleTitle,
                },
              )}
              onConfirm={() => handleRemove(record)}
            >
              <a>
                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
              </a>
            </Popconfirm>
            <Button
              onClick={() => showAuditModal(record)}
              style={{ marginLeft: 10 }}
              type="primary"
              size="small"
            >
              <FormattedMessage id="comment.audit" />
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

  return (
    <PageContainer>
      <ProTable
        rowKey="_id"
        actionRef={actionRef}
        toolBarRender={(action, { selectedRows }) => [
          <Button key="audit" type="primary" onClick={() => showAuditModal(null)}>
            <FormattedMessage id="comment.all_audit" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryComment({ ...params })}
        columns={columns}
        scroll={{ x: 1800 }}
      />
      <Modal
        title={intl.formatMessage({
          id: 'comment.audit',
        })}
        visible={params.visible}
        onOk={onOk}
        onCancel={() =>
          setParams((preState) => {
            return {
              ...preState,
              visible: false,
            };
          })
        }
      >
        <Radio.Group
          value={params.auditStatus}
          onChange={(e) =>
            setParams((preState) => {
              return {
                ...preState,
                auditStatus: e.target.value,
              };
            })
          }
        >
          <Radio value={1}>
            <FormattedMessage id="common.pass" />
          </Radio>
          <Radio value={2}>
            <FormattedMessage id="common.reject" />
          </Radio>
        </Radio.Group>
      </Modal>
    </PageContainer>
  );
};

export default Comment;
