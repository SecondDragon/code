import React, { useEffect, useRef, useState } from 'react';
import {
  Input,
  Breadcrumb,
  Card,
  Form,
  Grid,
  Switch,
  Message,
  Select,
  InputNumber,
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import Save from '../../components/Save';
import UploadImage from '../../components/UploadImage';
import { queryArticles, create, update } from '../../api/articles';
import { getList as getCategoriesList } from '../../api/categories';
import { getList as getTagsList } from '../../api/tags';
import Editor from 'for-editor';
const Row = Grid.Row;
const Col = Grid.Col;
import { upload } from '../../api/common';
import history from '../../history';
import { useLocation } from 'react-router-dom';
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const formItemLayout2 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const Edit = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [tagsArr, setTagsArr] = useState([]);
  const editorRef = useRef<any>();
  const { search } = useLocation();
  let id = '';
  if (search) {
    id = search.split('id=')[1];
  }

  const loadData = async (isRefresh?: boolean) => {
    if (!id) return;
    const res: any = await queryArticles({ id });
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;

    if (!data) return;
    console.log('data', data);
    data.cover = [
      {
        imgUrl: data.cover,
      },
    ];
    form.setFieldsValue(data);
    setTime(data.updateTime);
  };

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

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async (publishStatus) => {
    await form.validate();
    const values = await form.getFields();
    values.cover = values.cover[0].imgUrl;
    values.publishStatus = publishStatus;
    values.status = 1;
    if (id) {
      values.id = id;
    }
    let func = id ? update : create;
    const res: any = await func(values);
    if (res.code === 0) {
      history.goBack();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');
    }
  };

  const onPublish = async () => {
    onSave(1);
  };

  const addImg = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    // const res = [
    //   {
    //     hash: 'FgOETQ8j4Zpygl6WWpZQ_75N20Sf',
    //     key: '3a4e66a577cde9b8e8c5550dc51aaaba.png',
    //     url: 'http://img.nevergiveupt.top/3a4e66a577cde9b8e8c5550dc51aaaba.png',
    //   },
    // ];
    if (res) {
      editorRef.current.$img2Url(file.name, res[0].url);
    }
  };

  return (
    <>
      <Save
        showBack
        time={time}
        onRefresh={id && onRefresh}
        onSave={() => onSave(2)}
        onPublish={onPublish}
      />

      <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>编辑文章</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
          <Form
            {...layout}
            form={form}
            initialValues={{
              isCollect: false,
              isReward: false,
              isComment: true,
              isLike: true,
              views: 1,
              like: 1,
              collect: 0,
              comment: 0,
            }}
          >
            <Form.Item
              label="文章标题"
              field="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>

            <Form.Item
              label="文章简介"
              field="introduction"
              rules={[
                { required: true, message: '请输入文章简介' },
                {
                  minLength: 10,
                  message: '至少10个字符',
                },
                {
                  maxLength: 500,
                  message: '不能超过500个字符',
                },
              ]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="文章封面"
                  field="cover"
                  rules={[{ required: true, message: '请添加文章封面' }]}
                  {...formItemLayout}
                >
                  <UploadImage showAction={false} showLink={false} />
                </Form.Item>

                <Form.Item
                  field="categories"
                  label="选个分类"
                  {...formItemLayout}
                  rules={[{ required: true, message: '请给文章选个分类' }]}
                >
                  <Select placeholder="请给文章选个分类">
                    {categoriesArr.map((item) => (
                      <Select.Option key={item.key} value={item.value}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  field="tags"
                  label="贴个标签"
                  {...formItemLayout}
                  rules={[{ required: true, message: '请给文章贴个标签' }]}
                >
                  <Select mode="multiple" placeholder="请给文章贴个标签">
                    {tagsArr.map((item) => (
                      <Select.Option key={item.key} value={item.value}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout2}
                      label="评论"
                      field="isComment"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="点赞"
                      field="isLike"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="收藏"
                      field="isCollect"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="打赏"
                      field="isReward"
                      triggerPropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout2}
                      label="查看数量"
                      field="views"
                      rules={[{ required: true, message: '请输入查看数量' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="点赞数量"
                      field="like"
                      rules={[{ required: true, message: '请输入点赞数量' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="收藏数量"
                      field="collect"
                      rules={[{ required: true, message: '请输入收藏数量' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Form.Item
              wrapperCol={{ span: 24 }}
              field="content"
              rules={[{ required: true, message: '请撰写文章' }]}
            >
              <Editor
                ref={(el) => (editorRef.current = el)}
                addImg={(file) => addImg(file)}
                placeholder="请撰写文章"
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Edit;
