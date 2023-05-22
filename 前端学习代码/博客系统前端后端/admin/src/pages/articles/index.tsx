import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Card,
  Form,
  Message,
  Popconfirm,
  Select,
  Badge,
  Avatar,
  Tag,
  Breadcrumb,
  Switch,
  DatePicker,
  Grid,
  Radio,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../history';

import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import {
  getList,
  remove,
  updateStatus,
  updatePublishStatus,
  updateCollectStatus,
} from '../../api/articles';
import { publishStatusOptions, statusOptions } from '../../const';
import dayjs from 'dayjs';
import { getList as getTagsList } from '../../api/tags';
import { getList as getCategoriesList } from '../../api/categories';

const Row = Grid.Row;
const Col = Grid.Col;

function Articles() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [tagsArr, setTagsArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);

  const getTags = async () => {
    const res: any = await getTagsList({
      page: 1,
      pageSize: 9999,
    });
    const list = res.data.list?.map((item) => {
      item.key = item._id;
      item.value = item.name;
      return item;
    });
    setTagsArr(list);
  };

  const getCategories = async () => {
    const res: any = await getCategoriesList({
      page: 1,
      pageSize: 9999,
    });
    const list = res.data.list?.map((item) => {
      item.key = item._id;
      item.value = item.name;
      return item;
    });
    setCategoriesArr(list);
  };

  useEffect(() => {
    getTags();
    getCategories();
  }, []);

  // 发布状态修改
  const onChangePublishStatus = async (record) => {
    const postData = {
      id: record._id,
      publishStatus: record.publishStatus === 1 ? 2 : 1,
    };
    const res: any = await updatePublishStatus(postData);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('文章状态修改失败，请重试！');
    }
  };

  // 查看
  const onView = (record) => {
    history.push('/articles/edit?id=' + record._id);
  };

  // 文章状态修改
  const onStatusChange = async (checked, record) => {
    const postData = {
      id: record._id,
      status: checked ? 1 : 2,
    };
    const res: any = await updateStatus(postData);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('文章状态修改失败，请重试！');
    }
  };
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
    },

    {
      title: '封面',
      dataIndex: 'cover',
      render: (_, record: any) => {
        return (
          <Avatar shape="square">
            <img src={record.cover} />
          </Avatar>
        );
      },
    },
    {
      title: '简介',
      dataIndex: 'introduction',
    },
    {
      title: '分类',
      dataIndex: 'categories',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        let result = [];
        for (let i = 0; i < record.tags.length; i += 3) {
          result.push(record.tags.slice(i, i + 3)); // i=0 0-3 i=3 3-6
        }
        return result.map((item, index) => {
          return (
            <div style={{ marginBottom: 10 }} key={index}>
              {item.map((sub) => (
                <Tag style={{ marginRight: 10 }} key={sub}>
                  {sub}
                </Tag>
              ))}
            </div>
          );
        });
      },
    },
    {
      title: '查看/评论/点赞/收藏	',
      dataIndex: 'views',
      render: (_, record) => {
        return `${record.views}/${record.comment}/${record.like}/${record.collect}`;
      },
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <Switch
            checkedText="启用"
            uncheckedText="停用"
            checked={record.status === 1}
            onChange={(checked) => onStatusChange(checked, record)}
          />
        );
      },
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      render: (_, record) => {
        const texts = {
          1: '已发布',
          2: '未发布',
        };
        const enums = {
          1: 'success',
          2: 'error',
        };
        return <Badge status={enums[record.publishStatus]} text={texts[record.publishStatus]} />;
      },
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        return dayjs(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (_, record) => {
        return record.updateTime
          ? dayjs(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },

    {
      title: '操作',
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button onClick={() => onChangePublishStatus(record)} type="text" size="small">
            {record.publishStatus === 1 ? '下线' : '发布'}
          </Button>
          <Button onClick={() => onView(record)} type="text" size="small">
            查看
          </Button>
          {record.publishStatus === 2 && (
            <>
              <Button onClick={() => onUpdate(record)} type="text" size="small">
                修改
              </Button>
              <Popconfirm title="Are you sure you want to delete?" onOk={() => onDelete(record)}>
                <Button type="text" status="danger" size="small">
                  删除
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  const articlesState = useSelector((state: ReducerState) => state.articles);

  const { data, pagination, loading, formParams } = articlesState;

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

  const onReset = () => {
    form.resetFields();
    fetchData();
  };

  const onSearch = async () => {
    const values = await form.getFields();
    const postData = values;
    if (postData.tags) {
      postData.tags = postData.tags.join(',');
    }
    if (postData.createTime) {
      postData.createStartTime = dayjs(postData.createTime[0]).unix();
      postData.createEndTime = dayjs(postData.createTime[1]).unix();
      delete postData.createTime;
    }

    if (postData.updateTime) {
      postData.updateStartTime = dayjs(postData.updateTime[0]).unix();
      postData.updateEndTime = dayjs(postData.updateTime[1]).unix();
      delete postData.updateTime;
    }
    console.log('postData', postData);

    fetchData(1, pagination.pageSize, postData);
  };

  const onAdd = () => {
    history.push(`/articles/edit`);
  };

  const onUpdate = (row) => {
    history.push(`/articles/edit?id=${row._id}`);
  };

  const onDelete = async (row) => {
    const res: any = await remove({
      id: row._id,
    });
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('删除失败，请重试！');
    }
  };

  const handleUpdateCollectStatus = async (isCollect) => {
    const res: any = await updateCollectStatus({
      isCollect,
    });
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('一键操作失败，请重试！');
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button onClick={onAdd} type="primary">
              添加文章
            </Button>

            <Radio.Group
              onChange={handleUpdateCollectStatus}
              type="button"
              name="lang"
              style={{ marginLeft: 20 }}
            >
              <Radio value={true}>一键开启收藏</Radio>
              <Radio value={false}>一键关闭收藏</Radio>
            </Radio.Group>
          </div>
        </div>

        <Form
          form={form}
          initialValues={{
            categories: '',
            status: '0',
            publishStatus: '0',
          }}
          {...layout}
          style={{ marginBottom: 20 }}
          layout="horizontal"
        >
          <Row>
            <Col span={6}>
              <Form.Item field="title" label="文章标题">
                <Input placeholder="请输入文章标题" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="categories" label="分类">
                <Select placeholder="请选择分类">
                  {[
                    {
                      key: '',
                      value: '全部',
                    },
                    ...categoriesArr,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.value}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="tags" label="标签">
                <Select mode="multiple" placeholder="请选择标签">
                  {tagsArr.map((item) => (
                    <Select.Option key={item.key} value={item.value}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="status" label="文章状态">
                <Select placeholder="请选择文章状态">
                  {[
                    {
                      key: '0',
                      value: '全部',
                    },
                    ...statusOptions,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item field="publishStatus" label="发布状态">
                <Select placeholder="请选择文章发布状态" defaultValue="">
                  {[
                    {
                      key: '0',
                      value: '全部',
                    },
                    ...publishStatusOptions,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="createTime" label="创建时间">
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item field="updateTime" label="修改时间">
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
            <Col span={5} offset={1}>
              <Form.Item>
                <Button onClick={onReset}>重置</Button>
                <Button onClick={onSearch} style={{ marginLeft: 20 }} type="primary">
                  搜索
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

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

export default Articles;
