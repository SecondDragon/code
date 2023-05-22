import React, { useState, useEffect } from 'react';
import { Upload, message, Input, Modal, Row, Col, Button, Form } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'umi';

import { upload } from './service';

import './UploadImageItem.less';

const UploadImageItem = (props) => {
  const intl = useIntl();

  const {
    imgUrl,
    link,
    icon,
    index = 0,

    onRemove,
    onAdd,
    onChange,

    showImg,
    showLink,
    showIcon,
    showAction,

    showReduce = false,
    showAdd = true,
    customClass,
  } = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(imgUrl || '');
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setImageUrl(imgUrl);
    form.setFields([
      {
        name: 'imgUrl',
        value: imgUrl,
      },
    ]);
  }, [imgUrl]);

  const beforeUpload = async (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error(
        intl.formatMessage({
          id: 'component.uploadImage.image_format',
        }),
      );
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(
        intl.formatMessage({
          id: 'component.uploadImage.image_size',
        }),
      );
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    if (res) {
      setImageUrl(res[0].url);
      onChange({
        index,
        field: 'imgUrl',
        value: res[0].url,
      });
      setLoading(false);
    }
    return false;
  };

  const handleChangeLink = (e) => {
    onChange({
      index,
      field: 'link',
      value: e.target.value,
    });
  };

  const handleChangeIcon = (e) => {
    onChange({
      index,
      field: 'icon',
      value: e.target.value,
    });
  };

  const handleRemove = (index) => {
    onRemove(index);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">
        <FormattedMessage id="component.uploadImage.choose_image" />
      </div>
    </div>
  );

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    const values = await form.validateFields(); //校验
    if (values) {
      const getValues = form.getFieldsValue(); // 获取最新文本值
      onChange({
        index,
        field: 'imgUrl',
        value: getValues.imgUrl,
      });
      handleCancel();
    }
  };

  return (
    <div className={customClass}>
      <Row style={{ marginBottom: 20 }}>
        {showImg && (
          <Col style={{ display: 'flex', flexDirection: 'column' }}>
            <Upload
              name="file"
              listType="picture-card"
              className="uploader"
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="file" style={{ width: '100%', maxHeight: 74 }} />
              ) : (
                uploadButton
              )}
            </Upload>
            <Button onClick={() => setVisible(true)} type="default" style={{ width: '93%' }}>
              <FormattedMessage id="component.uploadImage.input_link" />
            </Button>
          </Col>
        )}

        {(showLink || showIcon) && (
          <div className="input">
            {showLink && (
              <Col>
                <Input
                  value={link}
                  onChange={handleChangeLink}
                  className="link"
                  addonBefore={intl.formatMessage({
                    id: 'component.uploadImage.link',
                  })}
                />
              </Col>
            )}

            {showIcon && (
              <Col style={{ marginTop: 10 }}>
                <Input
                  value={icon}
                  onChange={handleChangeIcon}
                  className="icon"
                  addonBefore="icon"
                />
              </Col>
            )}
          </div>
        )}
        {showAction && (
          <Col className="action">
            {showReduce && (
              <MinusCircleFilled
                onClick={() => handleRemove(index)}
                style={{ color: '#ff4d4f', fontSize: 30, marginLeft: 10 }}
              />
            )}
            {showAdd && (
              <PlusCircleFilled
                onClick={onAdd}
                style={{ color: '#096dd9', fontSize: 30, marginLeft: 10 }}
              />
            )}
          </Col>
        )}
      </Row>
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        visible={visible}
        title={intl.formatMessage({
          id: 'component.uploadImage.file_link',
        })}
      >
        <Form form={form}>
          <Form.Item
            name="imgUrl"
            rules={[
              // {
              //   required: true,
              //   message: intl.formatMessage({
              //     id: 'component.uploadImage.p_file_link',
              //   }),
              // },
              {
                type: 'url',
                message: intl.formatMessage({
                  id: 'component.uploadImage.file_link_error_tip',
                }),
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'component.uploadImage.p_file_link',
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadImageItem;
