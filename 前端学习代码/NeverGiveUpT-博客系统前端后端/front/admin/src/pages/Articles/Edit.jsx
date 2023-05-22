import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Affix,
  Row,
  Col,
  Switch,
  InputNumber,
  message,
} from 'antd';
import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import Editor from 'for-editor';

import './Edit.less';
import { queryCategories } from '@/pages/Categories/service';
import { queryTags } from '@/pages/Tags/service';
import { addArticles, updateArticles, queryArticlesEdit } from './service';
import { upload } from '@/components/UploadImage/service';

import { history, FormattedMessage, useIntl } from 'umi';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const selectLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;

const ArticlesEdit = (props) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [params, setParams] = useState({
    content: '',
    disabled: false,
  });
  const [form] = Form.useForm();
  const editorRef = useRef();
  const intl = useIntl();

  const loadTagsOrCategories = async (func) => {
    const res = await func({
      pageSize: 100,
    });
    if (res.data) {
      const data = res.data.map((item) => item.name);
      if (func === queryTags) {
        setTags(data);
      } else {
        setCategories(data);
      }
    }
  };

  const loadArticlesInfo = async (type, id, isRefresh) => {
    const res = await queryArticlesEdit({ id });
    if (res.data) {
      let data = res.data;
      data.cover = [
        {
          imgUrl: data.cover,
        },
      ];
      setParams({
        ...data,
        content: data.content,
        disabled: type === '3',
      });
      form.setFieldsValue({ ...data });
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

  useEffect(() => {
    loadTagsOrCategories(queryTags);
    loadTagsOrCategories(queryCategories);
  }, []);

  useEffect(() => {
    const { type, id } = props.match.params;
    if (type !== '1') {
      loadArticlesInfo(type, id);
    }
  }, []);

  const onRefresh = () => {
    const { type, id } = props.match.params;
    if (type !== '1') {
      loadArticlesInfo(type, id, true);
    }
  };

  const onFinish = async (publishStatus) => {
    const values = await form.validateFields(); //校验
    if (values) {
      const getValues = form.getFieldsValue(); // 获取最新文本值
      const postData = {
        ...params,
        ...getValues,
        createTime: getValues.createTime * 1,
        publishStatus,
        status: 1,
        cover: getValues.cover[0].imgUrl,
      };
      const callFunc = postData._id ? updateArticles : addArticles;
      const res = await callFunc(postData);
      if (res.code === 0) {
        history.goBack();
        message.success(
          publishStatus === 1
            ? intl.formatMessage({
                id: 'articles.publish_success',
              })
            : intl.formatMessage({
                id: 'articles.save_draft_success',
              }),
        );
      } else {
        message.error(res.msg);
      }
    }
  };

  const addImg = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await upload(formData);
    if (res) {
      editorRef.current.$img2Url(file.name, res[0].url);
    }
  };
  return (
    <Card>
      <SaveTime time={params.updateTime} onRefresh={onRefresh} onBack={() => history.goBack()} />
      <Form
        form={form}
        className="edit-form"
        name="basic"
        initialValues={{
          isComment: true,
          isLike: true,
          isCollect: false,
          isReward: false,
          views: 1,
          like: 1,
          collect: 1,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          {...layout}
          label={intl.formatMessage({
            id: 'articles.title',
          })}
          name="title"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'articles.p_title',
              }),
            },
            {
              pattern: /.{2,200}/,
              message: intl.formatMessage({
                id: 'articles.p_title_pattern',
              }),
            },
          ]}
        >
          <Input
            disabled={params.disabled}
            placeholder={intl.formatMessage({
              id: 'articles.p_title_pattern',
            })}
          />
        </Form.Item>

        <Form.Item {...layout} label="创建时间" name="createTime">
          <Input disabled={params.disabled} />
        </Form.Item>

        <Form.Item
          {...layout}
          label={intl.formatMessage({
            id: 'articles.introduction',
          })}
          name="introduction"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'articles.p_introduction',
              }),
            },
            {
              pattern: /.{10,500}/,
              message: intl.formatMessage({
                id: 'articles.p_introduction_pattern',
              }),
            },
          ]}
        >
          <Input.TextArea
            disabled={params.disabled}
            placeholder={intl.formatMessage({
              id: 'articles.p_introduction_pattern',
            })}
            rows={5}
          />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              {...selectLayout}
              label={intl.formatMessage({
                id: 'articles.cover',
              })}
              name="cover"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'articles.p_cover',
                  }),
                },
              ]}
            >
              <UploadImage showAction={false} showLink={false} />
            </Form.Item>

            <Form.Item
              {...selectLayout}
              label={intl.formatMessage({
                id: 'articles.categories',
              })}
              name="categories"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'articles.p_categories',
                  }),
                },
              ]}
            >
              <Select
                disabled={params.disabled}
                placeholder={intl.formatMessage({
                  id: 'articles.p_categories',
                })}
              >
                {categories.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              {...selectLayout}
              label={intl.formatMessage({
                id: 'articles.tags',
              })}
              name="tags"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'articles.p_tags',
                  }),
                },
              ]}
            >
              <Select
                disabled={params.disabled}
                placeholder={intl.formatMessage({
                  id: 'articles.p_tags',
                })}
                mode="tags"
              >
                {tags.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.comment',
              })}
              name="isComment"
              valuePropName="checked"
            >
              <Switch
                disabled={params.disabled}
                checkedChildren={intl.formatMessage({
                  id: 'common.open',
                })}
                unCheckedChildren={intl.formatMessage({
                  id: 'common.close',
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.like',
              })}
              name="isLike"
              valuePropName="checked"
            >
              <Switch
                disabled={params.disabled}
                checkedChildren={intl.formatMessage({
                  id: 'common.open',
                })}
                unCheckedChildren={intl.formatMessage({
                  id: 'common.close',
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.collect',
              })}
              name="isCollect"
              valuePropName="checked"
            >
              <Switch
                disabled={params.disabled}
                checkedChildren={intl.formatMessage({
                  id: 'common.open',
                })}
                unCheckedChildren={intl.formatMessage({
                  id: 'common.close',
                })}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.reward',
              })}
              name="isReward"
              valuePropName="checked"
            >
              <Switch
                disabled={params.disabled}
                checkedChildren={intl.formatMessage({
                  id: 'common.open',
                })}
                unCheckedChildren={intl.formatMessage({
                  id: 'common.close',
                })}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.viewsNum',
              })}
              name="views"
            >
              <InputNumber disabled={params.disabled} />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.likeNum',
              })}
              name="like"
            >
              <InputNumber disabled={params.disabled} />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                id: 'common.rewardNum',
              })}
              name="collect"
            >
              <InputNumber disabled={params.disabled} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label=""
          name="content"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'articles.p_content',
              }),
            },
          ]}
        >
          <Editor
            ref={editorRef}
            disabled={params.disabled}
            placeholder={intl.formatMessage({
              id: 'articles.p_content',
            })}
            height="auto"
            value={params.content}
            addImg={(file) => addImg(file)}
          />
        </Form.Item>

        <Affix style={{ position: 'fixed', top: document.body.clientHeight / 2 - 100, right: 48 }}>
          <div className="submit-btn">
            <Form.Item>
              <Button onClick={() => onFinish(2)} className="btn">
                <FormattedMessage id="articles.save_draft" />
              </Button>
            </Form.Item>

            <Form.Item>
              <Button onClick={() => onFinish(1)} className="btn publish">
                <FormattedMessage id="articles.publish" />
              </Button>
            </Form.Item>
          </div>
        </Affix>
      </Form>
    </Card>
  );
};

export default ArticlesEdit;
