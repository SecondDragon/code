import React, { useState, useEffect } from 'react';
import {
  Form,
  Grid,
  Message,
  Select
} from '@arco-design/web-react';
import Save from '../../../../components/Save';
import UploadImage from '../../../../components/UploadImage';
import { queryAd, addAd, updateAd } from '../../../../api/site/right';
import { showPositions } from '../../../../const';


const Row = Grid.Row;
const Col = Grid.Col;

const Tab1 = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState();



  const loadData = async (isRefresh?: boolean) => {
    const res: any = await queryAd();
    if (isRefresh) {
      Message.success('刷新成功');
    }
    const data = res.data;
    console.log(data);
    form.setFieldsValue(data);
    setTime(data.updateTime);
  }

  useEffect(() => {
    loadData();
  }, [])


  const onRefresh = () => {
    loadData(true);
  }

  const onSave = async () => {
    await form.validate();
    const values = await form.getFields();
    console.log("values", values);

    const postData = values;
    postData.imgs = postData.imgs.map(item => {
      return {
        imgUrl: item.imgUrl,
        link: item.link,
        // _id: item._id
      }
    })

    console.log("postData", postData);
    const func = values._id ? updateAd : addAd;
    const res: any = await func(postData);
    if (res.data) {
      loadData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');

    }

  }


  return <><Save time={time} onRefresh={onRefresh} onSave={onSave} />
    <Form form={form} ><Row>

      <Col span={12}>
        <Form.Item label="广告图片(1-3张)" field="imgs" rules={[{ required: true, message: '请添加广告图片' }]}>
          <UploadImage max={3} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="展示位置" field="showPosition" rules={[{ required: true, message: '请选择展示位置' }]}>
          <Select mode='multiple' placeholder="请选择展示位置">
            {showPositions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
    </Form>
  </>
}

export default Tab1;