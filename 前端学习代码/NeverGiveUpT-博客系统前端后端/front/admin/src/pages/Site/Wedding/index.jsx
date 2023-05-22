import React, { useRef } from 'react';
import { Tooltip, message, Popconfirm, Button, Switch, Avatar } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl, history } from 'umi';

import moment from 'moment';
import { queryWedding } from '../service';
import copy from 'copy-to-clipboard';

const Wedding = () => {
  const actionRef = useRef();
  const intl = useIntl();
  const copyLink = (msg) => {
    copy(msg);
    message.success(
      intl.formatMessage({
        id: 'common.copy_success',
      }),
    );
  };

  let columns = [
    {
      title: intl.formatMessage({
        id: 'site.wedding.name',
      }),
      dataIndex: 'name',
      width: 100,
    },

    {
      title: intl.formatMessage({
        id: 'site.wedding.phone',
      }),
      hideInSearch: true,
      dataIndex: 'phone',
      width: 100,
    },
    {
      title: intl.formatMessage({
        id: 'site.wedding.type',
      }),
      initialValue: '0',
      dataIndex: 'type',
      width: 100,

      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'common.all',
          }),
        },
        1: {
          text: intl.formatMessage({
            id: 'common.boy',
          }),
        },
        2: {
          text: intl.formatMessage({
            id: 'common.girl',
          }),
        },
      },
      render: (_, record) => {
        return record.type === 2
          ? intl.formatMessage({
              id: 'common.girl',
            })
          : intl.formatMessage({
              id: 'common.boy',
            });
      },
    },
    {
      title: intl.formatMessage({
        id: 'site.wedding.message',
      }),
      hideInSearch: true,
      dataIndex: 'message',
    },

    {
      title: intl.formatMessage({
        id: 'common.createTime',
      }),
      hideInSearch: true,
      dataIndex: 'createTime',
      width: 200,
      render: (_, record) =>
        record.createTime === 0
          ? '-'
          : moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
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
          <Tooltip title="复制祝福语">
            <CopyOutlined style={{ fontSize: 20 }} onClick={() => copyLink(record.message)} />
          </Tooltip>
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
        toolBarRender={(action, { selectedRows }) => []}
        request={(params, sorter, filter) => queryWedding({ ...params })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Wedding;
