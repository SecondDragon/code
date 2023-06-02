import React, { useEffect, useState } from 'react';
import {
  Input,
  Breadcrumb,
  Card,
  Form,
  Grid,
  Switch,
  Message,
  Radio
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import Save from '../../../components/Save';
import UploadImage from '../../../components/UploadImage';
import { queryHeaderFooter, addHeaderFooter, updateHeaderFooter } from '../../../api/site/hf';


const Row = Grid.Row;
const Col = Grid.Col;


const HeaderFooter = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState(0);
  const [time, setTime] = useState();

  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryHeaderFooter();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    console.log(data);

    if (!data) {
      form.setFieldsValue({
        header: {
          openSearch: false,
          login: false,
          register: false,
        }
      });
      return;
    };
    if (data.header.logo) {
      debugger
      setType(1);
      form.setFieldsValue({
        type: 1,
        ...data,
        header: {...data.header,logo:[{
          imgUrl: data.header.logo
        }]},
        // logo: [{
        //   imgUrl: data.header.logo
        // }],
      });
    } else {
      console.log("---+++++", data);

      setType(2);

      form.setFieldsValue({ ...data, type: 2, });
    }

    setTime(data.updateTime);
  }
  useEffect(() => {
    loadData();
  }, [])

  const onRefresh = () => {
    loadData(true);
  }

  const onSave = async () => {
    debugger
    await form.validate();
    const values = await form.getFields();
    console.log("values-------------------------------", values);

    const postData = values;
    if (type === 1) {
      postData.header.logo = postData.header.logo[0].imgUrl;
    } else { 
      delete postData.header.logo
    }
    debugger
    console.log("postData", postData);
    const func = values._id ? updateHeaderFooter : addHeaderFooter;
    const res: any = await func(postData);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');

    }

  }



  const onRadioChange = (value) => {
    setType(value)
  }
  return <>
    <Save time={time} onRefresh={onRefresh} onSave={onSave} />

    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>Header/Footer配置</Breadcrumb.Item>
      </Breadcrumb>
      <Form form={form} >
        <Card hoverable title="Header配置">
          <Row>
            <Col span={12}>

              <Form.Item label="是否开启搜索" field="header.openSearch" triggerPropName="checked" rules={[{ required: true, message: '请选择是否开启搜索' }]}>
                <Switch checkedText='开启' uncheckedText='关闭' />
              </Form.Item>

              <Form.Item label="是否开启登录" field="header.login" triggerPropName="checked" rules={[{ required: true, message: '请选择是否开启登录' }]}>
                <Switch checkedText='开启' uncheckedText='关闭' />
              </Form.Item>

              <Form.Item label="是否开启注册" field="header.register" triggerPropName="checked" rules={[{ required: true, message: '请选择是否开启注册' }]}>
                <Switch checkedText='开启' uncheckedText='关闭' />
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item label="Logo" field="type" rules={[{ required: true, message: '请添加Logo图片' }]}>
                <Radio.Group onChange={onRadioChange}>
                  <Radio value={1}>图片</Radio>
                  <Radio value={2}>文本</Radio>
                </Radio.Group>
              </Form.Item>
              {
                type === 1 && <Form.Item label="选择图片" field="header.logo" rules={[{ required: true, message: '请添加Logo图片' }]}>
                  <UploadImage showLink={false} showAction={false} />
                </Form.Item>
              }
              {
                type === 2 && <Form.Item label="文本" field="header.title" rules={[{ required: true, message: '请输入文本' }, {
                  maxLength: 20, message: '不能超过20个字符'
                }]}>
                  <Input placeholder="请输入文本" />
                </Form.Item>
              }

            </Col>
          </Row>

        </Card>
        <Card style={{ marginTop: 20 }} hoverable title="Footer配置">
          <Form.Item labelCol={{ span: 2 }} label="Copyright" field="footer.copyright" rules={[{ required: true, message: '请输入Copyright' }]}>
            <Input placeholder="请输入文本" />
          </Form.Item>
          <Form.Item labelCol={{ span: 2 }} label="额外信息" field="footer.extra">
            <Input placeholder="请输入额外信息" />
          </Form.Item>
        </Card>
      </Form>
    </div>
  </>
}

export default HeaderFooter;