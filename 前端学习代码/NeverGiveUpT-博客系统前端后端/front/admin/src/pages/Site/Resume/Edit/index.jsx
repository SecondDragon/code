import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Form,
  message,
  Button,
  Space,
  Radio,
  DatePicker,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, history } from 'umi';
import Editor from 'for-editor';
import moment from 'moment';
import { genderList, jobStatusList, educationList, jobTypeList, tagsList } from '@/const';
import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';

import './index.less';
import { createResume, updateResume, queryResumeEdit } from '../../service';

const baseInfoLayout = {
  labelCol: {
    span: 6,
  },
};
const jobLayout = {
  labelCol: {
    span: 8,
  },
};
const experiencesLayout = {
  labelCol: {
    span: 2,
  },
};

const Edit = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [updateTime, setUpdateTime] = useState(null);

  const getResumeEdit = async (id, isRefresh) => {
    const res = await queryResumeEdit({ id });
    if (res.data) {
      let data = res.data;
      data.experiences?.map((item) => {
        item.time = [moment(item.startTime * 1000), moment(item.endTime * 1000)];
      });
      data.projectExp?.map((item) => {
        item.time = [moment(item.startTime * 1000), moment(item.endTime * 1000)];
      });
      if (data.avatar) {
        data.avatar = [
          {
            imgUrl: data.avatar,
          },
        ];
      }
      setUpdateTime(data.updateTime);
      form.setFieldsValue(data);
      if (isRefresh) {
        message.success(
          intl.formatMessage({
            id: 'common.refresh_success',
          }),
        );
      }
    } else {
      message.error(res.msg);
    }
  };

  const onRefresh = (bool) => {
    const { id } = props.location.query;
    if (id) {
      getResumeEdit(id, bool);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onSave = async () => {
    const { id } = props.location.query;
    const result = await form.validateFields();
    if (result) {
      const values = form.getFieldsValue();
      values.experiences?.map((item) => {
        item.startTime = moment(item.time[0]).unix();
        item.endTime = moment(item.time[1]).unix();
        return item;
      });
      values.projectExp?.map((item) => {
        item.startTime = moment(item.time[0]).unix();
        item.endTime = moment(item.time[1]).unix();
        return item;
      });
      const postData = {
        id,
        ...values,
        education: values.education || '',
        avatar: values.avatar ? values.avatar[0].imgUrl : '',
      };
      const callFunc = postData.id ? updateResume : createResume;
      const res = await callFunc(postData);
      if (res.code === 0) {
        message.success(
          intl.formatMessage({
            id: 'site.resume.create_success',
          }),
        );
        history.goBack();
      } else {
        message.error(res.msg);
      }
    }
  };

  return (
    <PageContainer>
      <SaveTime
        time={updateTime}
        onRefresh={() => onRefresh(true)}
        onSave={onSave}
        onBack={() => history.goBack()}
      />
      <Form form={form}>
        <Card title="基本信息">
          <Row>
            <Col span={6}>
              <Form.Item
                {...baseInfoLayout}
                label="姓名"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...baseInfoLayout}
                label="性别"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ]}
              >
                <Radio.Group options={genderList}></Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...baseInfoLayout}
                label="状态"
                name="jobStatus"
                rules={[
                  {
                    required: true,
                    message: '请选择求职状态',
                  },
                ]}
              >
                <Select placeholder="请选择求职状态">
                  {jobStatusList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...baseInfoLayout} label="学历" name="education">
                <Select allowClear>
                  {educationList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                {...baseInfoLayout}
                label="邮箱"
                name="email"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱',
                  },
                  {
                    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: '邮箱格式错误',
                  },
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...baseInfoLayout}
                label="经验"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: '请输入工作年限',
                  },
                  {
                    pattern: /^([0-9]{1,2})$/,
                    message: '请输入0-99的整数',
                  },
                ]}
              >
                <Input placeholder="请输入工作年限" suffix="年" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...baseInfoLayout}
                label="手机号"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误',
                  },
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...baseInfoLayout} label="微信号" name="weChat">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item {...baseInfoLayout} label="头像" name="avatar">
                <UploadImage showLink={false} showAction={false} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="期望职位" style={{ marginTop: 20 }}>
          <Row>
            <Col span={6}>
              <Form.Item
                {...jobLayout}
                label="职位名称"
                name="jobName"
                rules={[
                  {
                    required: true,
                    message: '请输入职位名称',
                  },
                ]}
              >
                <Input placeholder="请输入职位名称" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...jobLayout}
                label="工作城市"
                name="city"
                rules={[
                  {
                    required: true,
                    message: '请输入工作城市',
                  },
                ]}
              >
                <Input placeholder="请输入工作城市" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...jobLayout}
                label="期望薪资"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: '请输入期望薪资',
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: '请输入数字',
                  },
                ]}
              >
                <Input prefix="￥" placeholder="请输入期望薪资" suffix="K" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...jobLayout}
                label="求职类型"
                name="jobType"
                rules={[
                  {
                    required: true,
                    message: '请选择求职类型',
                  },
                ]}
              >
                <Select placeholder="请选择求职类型">
                  {jobTypeList.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="工作经历" style={{ marginTop: 20 }}>
          <Form.List name="experiences">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" direction="vertical" className="space">
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="在职时间"
                      name={[field.name, 'time']}
                      fieldKey={[field.fieldKey, 'time']}
                      rules={[{ required: true, message: '请选择在职时间' }]}
                    >
                      <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="公司名称"
                      name={[field.name, 'companyName']}
                      fieldKey={[field.fieldKey, 'companyName']}
                      rules={[{ required: true, message: '请输入公司名称' }]}
                    >
                      <Input placeholder="请输入公司名称" />
                    </Form.Item>
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="技术栈"
                      name={[field.name, 'technologyStack']}
                      fieldKey={[field.fieldKey, 'technologyStack']}
                      rules={[{ required: true, message: '请输入技术栈' }]}
                    >
                      <Input placeholder="请输入技术栈" />
                    </Form.Item>

                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="工作内容"
                      name={[field.name, 'projectContent']}
                      fieldKey={[field.fieldKey, 'projectContent']}
                      rules={[{ required: true, message: '请输入工作内容' }]}
                    >
                      <Editor height="auto" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2 }}>
                      <Button
                        type="dashed"
                        danger
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      >
                        删除
                      </Button>
                    </Form.Item>
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    新增
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="项目经历" style={{ marginTop: 20 }}>
          <Form.List name="projectExp">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" direction="vertical" className="space">
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="在职时间"
                      name={[field.name, 'time']}
                      fieldKey={[field.fieldKey, 'time']}
                      rules={[{ required: true, message: '请选择在职时间' }]}
                    >
                      <DatePicker.RangePicker />
                    </Form.Item>
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="项目名称"
                      name={[field.name, 'projectName']}
                      fieldKey={[field.fieldKey, 'projectName']}
                      rules={[{ required: true, message: '请输入项目名称' }]}
                    >
                      <Input placeholder="请输入项目名称" />
                    </Form.Item>
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="项目角色"
                      name={[field.name, 'job']}
                      fieldKey={[field.fieldKey, 'job']}
                    >
                      <Input placeholder="请输入项目角色" />
                    </Form.Item>
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="所在部门"
                      name={[field.name, 'department']}
                      fieldKey={[field.fieldKey, 'department']}
                    >
                      <Input placeholder="请输入所在部门" />
                    </Form.Item>

                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="项目描述"
                      name={[field.name, 'projectDesc']}
                      fieldKey={[field.fieldKey, 'projectDesc']}
                      rules={[{ required: true, message: '请输入项目描述' }]}
                    >
                      <Editor height="auto" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      {...experiencesLayout}
                      {...field}
                      label="项目标签"
                      name={[field.name, 'projectTags']}
                      fieldKey={[field.fieldKey, 'projectTags']}
                    >
                      <Select mode="tags">
                        {tagsList.map((item) => (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="作品图片"
                      {...experiencesLayout}
                      {...field}
                      name={[field.name, 'pictures']}
                      fieldKey={[field.fieldKey, 'pictures']}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (value && value.length > 1) {
                              const required = value.every((item) => {
                                return item.imgUrl;
                              });
                              return required ? Promise.resolve() : Promise.reject('请上传图片');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <UploadImage customClass="inline-upload" showLink={false} max={10} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2 }}>
                      <Button
                        type="dashed"
                        danger
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      >
                        删除
                      </Button>
                    </Form.Item>
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    新增
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="个人总结" style={{ marginTop: 20 }}>
          <Form.Item name="summary">
            <Editor height="auto" />
          </Form.Item>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default Edit;
