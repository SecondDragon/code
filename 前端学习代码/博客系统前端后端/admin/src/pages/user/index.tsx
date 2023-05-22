import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Message,
  Popconfirm,
  Image,
  Tag,
  Tooltip,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove } from '../../api/user';

function Categories() {
  const locale = useLocale();
  const dispatch = useDispatch();

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 160,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 60,
      render: (_, record) => {
        return <Image width={50} height={50} src={record.avatar}></Image>;
      },
    },
    {
      title: '来源',
      width: 60,
      dataIndex: 'provider',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: '收藏数量',
      dataIndex: 'articleIds',
      render: (_, record) => {
        return <Tag color="orange">{record.articleIds?.length}</Tag>;
      },
    },

    {
      title: '简介',
      width: 400,
      dataIndex: 'introduction',
      render: (text) => {
        return (
          <Tooltip position="tl" content={text}>
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
    },

    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Popconfirm title="Are you sure you want to delete?" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const userState = useSelector((state: ReducerState) => state.user);

  const { data, pagination, loading, formParams } = userState;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      };
      console.log(postData);
      const res: any = await getList(postData);
      console.log(res);
      if (res) {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: { pagination: { ...pagination, current, pageSize, total: res.data.totalCount } },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) {}
  }

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(nickName) {
    fetchData(1, pagination.pageSize, { nickName });
  }

  const onDelete = async (row) => {
    const res: any = await remove(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('删除失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入昵称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default Categories;
