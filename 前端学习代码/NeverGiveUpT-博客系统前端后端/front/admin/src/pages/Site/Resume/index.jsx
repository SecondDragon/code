import React, { useRef } from 'react';
import { Tooltip, message, Popconfirm, Button, Switch, Avatar } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl, history } from 'umi';

import moment from 'moment';
import { queryResume, removeResume, updateResumeStatus } from '../service';

const Resume = () => {
  const actionRef = useRef();
  const intl = useIntl();

  const handleRemove = async (params) => {
    try {
      const res = await removeResume({ id: params._id });
      if (res.code === 0) {
        message.success(res.msg);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'site.resume.update_error_tip',
        }),
      );
    }
  };
  const handleAdd = () => {
    history.push({
      pathname: '/site/resume/edit',
    });
  };

  const goEdit = (id) => {
    history.push({
      pathname: '/site/resume/edit',
      query: {
        id,
      },
    });
  };

  const handleUpdateStatus = async (status, params) => {
    try {
      const res = await updateResumeStatus({ id: params._id, status });
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
          id: 'site.resume.enable_error_tip',
        }),
      );
      return false;
    }
  };

  let columns = [
    {
      title: intl.formatMessage({
        id: 'common.avatar',
      }),
      dataIndex: 'avatar',
      render: (_, record) => {
        return record.avatar ? <Avatar src={record.avatar} /> : '';
      },
    },
    {
      title: intl.formatMessage({
        id: 'site.resume.name',
      }),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({
        id: 'site.resume.experience',
      }),
      dataIndex: 'experience',
      render: (_, record) => {
        return (
          record.experience +
          intl.formatMessage({
            id: 'site.resume.year',
          })
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'site.resume.jobName',
      }),
      dataIndex: 'jobName',
    },
    {
      title: intl.formatMessage({
        id: 'site.resume.summary',
      }),
      dataIndex: 'summary',
      render: (_, record) => {
        if (record.summary && record.summary.length > 20) {
          return (
            <Tooltip title={record.summary}>
              <span>{record.summary.slice(0, 20)}...</span>
            </Tooltip>
          );
        }
        return record.summary;
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.createTime',
      }),
      dataIndex: 'createTime',
      render: (_, record) =>
        record.createTime === 0
          ? '-'
          : moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
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
        id: 'common.status',
      }),
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.status}
            onChange={(checked) => handleUpdateStatus(checked, record)}
          />
        );
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.action',
      }),
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => {
        return (
          <>
            <a style={{ marginRight: 10 }}>
              <EditOutlined style={{ fontSize: 16 }} onClick={() => goEdit(record._id)} />
            </a>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage(
                {
                  id: 'site.resume.remove_tip',
                },
                {
                  name: record.name,
                },
              )}
              onConfirm={() => handleRemove(record)}
            >
              <a>
                <DeleteOutlined style={{ color: '#ff4d4f' }} />
              </a>
            </Popconfirm>
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
          <Button type="primary" onClick={() => handleAdd()}>
            <PlusOutlined /> <FormattedMessage id="site.resume.add" />
          </Button>,
        ]}
        search={false}
        request={(params, sorter, filter) => queryResume({ ...params })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Resume;
