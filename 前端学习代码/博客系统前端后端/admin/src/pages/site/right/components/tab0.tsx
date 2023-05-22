import React, { useState, useEffect } from 'react';
import { Input, Form, Grid, Message, Select } from '@arco-design/web-react';
import Save from '../../../../components/Save';
import UploadImage from '../../../../components/UploadImage';
import { queryIntroduction, addIntroduction, updateIntroduction } from '../../../../api/site/right';
import { getList } from '../../../../api/tags';
import { showPositions } from '../../../../const';

const Row = Grid.Row;
const Col = Grid.Col;

const Tab0 = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();
  const [tagsArr, setTagsArr] = useState([]);

  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryIntroduction();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    console.log(data);
    form.setFieldsValue(data);
    setTime(data.updateTime);
  };

  const getTags = async () => {
    const res: any = await getList({
      page: 1,
      pageSize: 9999,
    });
    setTagsArr(res.data.list?.map((item) => item.name) || []);
  };
  useEffect(() => {
    loadData();
    getTags();
  }, []);

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    await form.validate();
    const values = await form.getFields();
    console.log('values', values);

    const postData = values;
    postData.friendLink = postData.friendLink.map((item) => {
      return {
        icon: item.icon,
        link: item.link,
        // _id: item._id,
      };
    });

    console.log('postData', postData);
    const func = values._id ? updateIntroduction : addIntroduction;
    const res: any = await func(postData);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');
    }
  };

  return (
    <>
      <Save time={time} onRefresh={onRefresh} onSave={onSave} />
      <Form form={form}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="昵称"
              field="nickName"
              rules={[
                { required: true, message: '请输入昵称' },
                {
                  minLength: 2,
                  message: '至少2个字符',
                },
                {
                  maxLength: 20,
                  message: '最多20个字符',
                },
              ]}
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>

            <Form.Item
              label="简介"
              field="desc"
              rules={[{ required: true, message: '请输入简介' }]}
            >
              <Input placeholder="请输入简介" />
            </Form.Item>
            <Form.Item
              label="标签"
              field="tags"
              rules={[{ required: true, message: '请选择标签' }]}
            >
              <Select mode="multiple" placeholder="请选择标签">
                {tagsArr.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="展示位置"
              field="showPosition"
              rules={[{ required: true, message: '请选择展示位置' }]}
            >
              <Select mode="multiple" placeholder="请选择展示位置">
                {showPositions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="友情链接(1-4个)"
              field="friendLink"
              rules={[{ required: true, message: '请添加友情链接' }]}
            >
              <UploadImage max={4} showImg={false} showIcon />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Tab0;
