import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Switch, message, Radio, Form } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from 'umi';

import './index.less';
import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';

const layout = {
  labelCol: {
    span: 6,
  },
};

import {
  queryHeaderFooterConfig,
  addHeaderFooterConfig,
  updateHeaderFooterConfig,
} from '../service';

const HeaderFooter = () => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [type, setType] = useState(2);
  const [updateTime, setUpdateTime] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh) => {
    const res = await queryHeaderFooterConfig();
    if (isRefresh) {
      message.success(
        intl.formatMessage({
          id: 'common.refresh_success',
        }),
      );
    }
    let data = res.data;

    if (!data) return;
    const typeVal = data?.header?.title ? 2 : 1;
    form.setFieldsValue({
      ...data,
      type: typeVal,
      header: {
        ...data.header,
        logoImgs: [{ imgUrl: data.header.logo }],
      },
    });
    setType(typeVal);
    setUpdateTime(data.updateTime);
    setUpdateId(data._id);
  };

  const onSave = async () => {
    let values = await form.validateFields();
    if (values) {
      if (type === 1) {
        values.header.logo = values.header.logoImgs[0].imgUrl;
      }
      delete values.type;
      values._id = updateId;
      const callFunc = updateId ? updateHeaderFooterConfig : addHeaderFooterConfig;
      const res = await callFunc(values);
      if (res.data) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    }
  };

  return (
    <PageContainer>
      <Form form={form} {...layout} className="field-content">
        <Card title={<FormattedMessage id="site.headerConfig" />}>
          <Row>
            <Col span={12}>
              <Form.Item
                name={['header', 'openSearch']}
                label={<FormattedMessage id="site.openSearch" />}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={intl.formatMessage({
                    id: 'common.yes',
                  })}
                  unCheckedChildren={intl.formatMessage({
                    id: 'common.no',
                  })}
                />
              </Form.Item>
              <Form.Item
                name={['header', 'login']}
                label={<FormattedMessage id="site.login" />}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={intl.formatMessage({
                    id: 'common.yes',
                  })}
                  unCheckedChildren={intl.formatMessage({
                    id: 'common.no',
                  })}
                />
              </Form.Item>

              <Form.Item
                name={['header', 'register']}
                label={<FormattedMessage id="site.register" />}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={intl.formatMessage({
                    id: 'common.yes',
                  })}
                  unCheckedChildren={intl.formatMessage({
                    id: 'common.no',
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Logo" name="type">
                <Radio.Group onChange={(e) => setType(e.target.value)}>
                  <Radio value={1}>
                    <FormattedMessage id="site.image" />
                  </Radio>
                  <Radio value={2}>
                    <FormattedMessage id="site.title" />
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {type === 1 && (
                <Form.Item
                  label={<FormattedMessage id="component.uploadImage.choose_image" />}
                  name={['header', 'logoImgs']}
                >
                  <UploadImage showLink={false} showAction={false} />
                </Form.Item>
              )}
              {type === 2 && (
                <Form.Item
                  label={<FormattedMessage id="site.input_text" />}
                  name={['header', 'title']}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'site.p_input_text',
                      }),
                    },
                    {
                      max: 20,
                      message: intl.formatMessage({
                        id: 'site.p_title_pattern',
                      }),
                    },
                  ]}
                >
                  <Input
                    placeholder={intl.formatMessage({
                      id: 'site.p_title_pattern',
                    })}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 40 }} title={<FormattedMessage id="site.footerConfig" />}>
          <Form.Item
            name={['footer', 'copyright']}
            labelCol={{ span: 2 }}
            label="Copyright"
            rules={[
              {
                required: true,
                message: 'Copyright',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['footer', 'extra']}
            labelCol={{ span: 2 }}
            label={intl.formatMessage({
              id: 'site.extra',
            })}
          >
            <Input />
          </Form.Item>
        </Card>
      </Form>
      <SaveTime onSave={onSave} onRefresh={() => loadData(true)} time={updateTime} />
    </PageContainer>
  );
};

export default HeaderFooter;
