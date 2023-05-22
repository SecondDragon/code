import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Tabs,
  Row,
  Col,
  Badge,
  Input,
  Select,
  Form,
  message,
  Table,
  Popconfirm,
  Tooltip,
  Avatar,
  Tag,
  Button,
  Modal,
  Radio,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'umi';

import moment from 'moment';
import copy from 'copy-to-clipboard';

import { showPositions, projects, showPositionsColorObj } from '@/const';

const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layoutEdit = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import './index.less';

import { queryTags } from '@/pages/Tags/service';
import { fetchRight } from '../service';

const Right = () => {
  const intl = useIntl();

  const searchProjects = [
    {
      key: '',
      value: intl.formatMessage({
        id: 'common.all',
      }),
    },
    ...projects,
  ];

  const [params, setParams] = useState({
    imgs: [
      {
        link: '',
        icon: '',
      },
    ],
  });

  const [params2, setParams2] = useState({
    imgs: [
      {
        imgUrl: '',
        link: '',
      },
    ],
    showPosition: [],
  });

  const [paramsEdit, setParamsEdit] = useState({
    imgs: [
      {
        imgUrl: '',
        link: '',
      },
    ],
  });

  const [tab, setTab] = useState('tab1');
  const [tags, setTags] = useState([]);

  const [project, setProject] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const loadTags = async () => {
    const res = await queryTags();
    let data = res.data;
    if (data) {
      data = data.map((item) => item.name);
      console.log(data);
      setTags(data);
    }
  };

  const loadData = async (isRefresh) => {
    switch (tab) {
      case 'tab1':
        const res = await fetchRight.introduction.query();
        if (isRefresh) {
          message.success(
            intl.formatMessage({
              id: 'common.refresh_success',
            }),
          );
        }
        let data = res.data;

        if (!data) return;
        data.imgs = data.friendLink;
        setParams({
          ...data,
        });
        formTab1.setFieldsValue({
          ...data,
        });
        break;
      case 'tab2':
        const res2 = await fetchRight.ad.query();
        if (isRefresh) {
          message.success(
            intl.formatMessage({
              id: 'common.refresh_success',
            }),
          );
        }
        const data2 = res2.data;
        if (!data2) return;
        setParams2({
          ...data2,
        });
        formTab2.setFieldsValue({
          ...data2,
        });
        break;

      case 'tab3':
        const res3 = await fetchRight.recommend.query({
          project,
        });
        if (isRefresh) {
          message.success(
            intl.formatMessage({
              id: 'common.refresh_success',
            }),
          );
        }
        const data3 = res3.data;
        if (!data3) return;
        data3.map((item) => (item.key = item._id));
        setDataSource(data3);
        break;
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    loadData();
  }, [tab, project]);

  const tabsChange = (key) => {
    setTab(key);
  };

  const onUploadImageChange = useCallback((imgs) => {
    setParams((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });

  const onUploadImageChange2 = useCallback((imgs) => {
    setParams2((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });

  const [formTab1] = Form.useForm();
  const [formTab2] = Form.useForm();
  const [formTabEdit] = Form.useForm();

  const validateTab1 = (postData) => {
    let flag = false;
    const friendLink = postData.imgs;
    for (let i in friendLink) {
      if (!friendLink[i].link) {
        message.error(
          intl.formatMessage(
            {
              id: 'site.right.p_n_jump_link',
            },
            {
              name: i * 1 + 1,
            },
          ),
        );
        return (flag = false);
      } else {
        flag = true;
      }
      if (!friendLink[i].icon) {
        message.error(
          intl.formatMessage(
            {
              id: 'site.right.p_n_icon',
            },
            {
              name: i * 1 + 1,
            },
          ),
        );
        return (flag = false);
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }
    return true;
  };

  const validateTab2 = (postData) => {
    let flag = false;
    const imgs = postData.imgs;
    for (let i in imgs) {
      if (!imgs[i].imgUrl) {
        message.error(
          intl.formatMessage(
            {
              id: 'site.right.p_n_image',
            },
            {
              name: i * 1 + 1,
            },
          ),
        );
        return (flag = false);
      } else {
        flag = true;
      }
      if (!imgs[i].link) {
        message.error(
          intl.formatMessage(
            {
              id: 'site.right.p_n_jump_link',
            },
            {
              name: i * 1 + 1,
            },
          ),
        );
        return (flag = false);
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }
    return true;
  };

  const validateEdit = (postData) => {
    let flag = false;
    const imgs = postData.imgs;
    for (let i in imgs) {
      if (!imgs[i].imgUrl) {
        message.error(
          intl.formatMessage({
            id: 'site.right.p_cover',
          }),
        );
        return (flag = false);
      } else {
        flag = true;
      }
      if (!imgs[i].link) {
        message.error(
          intl.formatMessage({
            id: 'site.right.p_jump_link',
          }),
        );
        return (flag = false);
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }
    return true;
  };

  const onSave = async () => {
    switch (tab) {
      case 'tab1':
        const values = await formTab1.validateFields(); //校验
        if (values) {
          const getValues = formTab1.getFieldsValue(); // 获取最新文本值
          params.friendLink = params.imgs;
          const postData = {
            ...params,
            ...getValues,
          };
          if (validateTab1(postData)) {
            delete postData.imgs;
            const callFunc = postData._id
              ? fetchRight.introduction.update
              : fetchRight.introduction.create;
            const res = await callFunc(postData);
            if (res.data) {
              message.success(res.msg);
            } else {
              message.error(res.msg);
            }
          }
        }
        break;
      case 'tab2':
        const values2 = await formTab2.validateFields(); //校验
        if (values2) {
          const getValues2 = formTab2.getFieldsValue(); // 获取最新文本值
          const postData2 = {
            ...params2,
            ...getValues2,
          };
          if (validateTab2(postData2)) {
            const callFunc = postData2._id ? fetchRight.ad.update : fetchRight.ad.create;
            const res2 = await callFunc(postData2);
            if (res2.data) {
              message.success(res2.msg);
            } else {
              message.error(res2.msg);
              s;
            }
          }
        }
        break;
      case 'tab3':
        break;
    }
  };

  const onRefresh = async () => {
    loadData(true);
  };

  const time = tab === 'tab1' ? params.updateTime : params2.updateTime;

  const columns = [
    {
      title: intl.formatMessage({
        id: 'site.right.type',
      }),
      dataIndex: 'project',
      key: 'project',
      render: (_, record) => {
        const count = projects[record.project - 1].value;
        let background = '#52c41a';
        if (record.project === '1') {
          background = 'purple';
        }
        if (record.project === '2') {
          background = 'pink';
        }
        return <Badge style={{ background }} count={count}></Badge>;
      },
    },
    {
      title: intl.formatMessage({
        id: 'site.name',
      }),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        if (record.name.length > 10) {
          return (
            <Tooltip title={record.name}>
              <span>{record.name.slice(0, 10)}...</span>
            </Tooltip>
          );
        }
        return record.name;
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.cover',
      }),
      dataIndex: 'cover',
      key: 'cover',
      render: (_, record) => {
        return <Avatar shape="square" src={record.cover} />;
      },
    },
    {
      title: intl.formatMessage({
        id: 'site.right.link',
      }),
      dataIndex: 'link',
      key: 'link',
      render: (_, record) => {
        return (
          <Tooltip title={record.link}>
            <a onClick={() => copyLink(record.link)}>
              <LinkOutlined color="#2db7f5" />
            </a>
          </Tooltip>
        );
      },
    },

    {
      title: 'Vip',
      dataIndex: 'isVip',
      key: 'isVip',
      render: (_, record) => {
        return record.isVip
          ? intl.formatMessage({
              id: 'common.yes',
            })
          : intl.formatMessage({
              id: 'common.no',
            });
      },
    },
    {
      title: intl.formatMessage({
        id: 'site.right.showPosition',
      }),
      dataIndex: 'showPosition',
      key: 'showPosition',
      width: 200,
      render: (_, record) => {
        if (record.showPosition.length > 0) {
          let result = [];
          for (let i = 0; i < record.showPosition.length; i += 3) {
            result.push(record.showPosition.slice(i, i + 3));
          }
          return result.map((item, index) => {
            return (
              <div style={{ marginBottom: 10 }} key={index}>
                {item.map((sub) => (
                  <Tag key={sub} color={showPositionsColorObj[sub]}>
                    {sub}
                  </Tag>
                ))}
              </div>
            );
          });
        }
      },
    },
    {
      title: intl.formatMessage({
        id: 'common.createTime',
      }),
      dataIndex: 'createTime',
      render: (_, record) =>
        record.createTime === 0
          ? '-'
          : moment(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({
        id: 'common.updateTime',
      }),
      dataIndex: 'updateTime',
      render: (_, record) =>
        record.updateTime === 0
          ? '-'
          : moment(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: intl.formatMessage({
        id: 'common.action',
      }),
      dataIndex: 'option',
      width: 100,
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage(
                {
                  id: 'site.right.remove_tip',
                },
                {
                  value: projects[record.project - 1].value,
                  name: record.name,
                },
              )}
              onConfirm={() => handleRemove(record)}
            >
              <DeleteOutlined style={{ color: '#ff4d4f' }} />
            </Popconfirm>
            <a style={{ marginLeft: 10 }}>
              <EditOutlined onClick={() => handleUpdate(record)} style={{ color: '#1890ff' }} />
            </a>
          </>
        );
      },
    },
  ];
  columns.map((item) => {
    item.align = 'center';
    return item;
  });

  const copyLink = (msg) => {
    copy(msg);
    message.success(
      intl.formatMessage({
        id: 'common.copy_success',
      }),
    );
  };

  const handleRemove = async (params) => {
    try {
      const res = await fetchRight.recommend.remove({ id: params._id });
      if (res.code === 0) {
        message.success(res.msg);
        loadData();
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'site.right.remove_error_tip',
        }),
      );
    }
  };
  const handleUpdate = (params) => {
    params.imgs = [
      {
        imgUrl: params.cover,
        link: params.link,
      },
    ];
    setParamsEdit(params);
    formTabEdit.setFieldsValue({
      ...params,
    });
    setShowModal(true);
  };

  const handleOk = async () => {
    const values = await formTabEdit.validateFields(); //校验
    if (values) {
      const getValues = formTabEdit.getFieldsValue(); // 获取最新文本值
      const postData = {
        ...paramsEdit,
        ...getValues,
      };
      if (validateEdit(postData)) {
        setConfirmLoading(true);
        postData.cover = postData.imgs[0].imgUrl;
        postData.link = postData.imgs[0].link;
        delete postData.imgs;
        const callFunc = postData._id ? fetchRight.recommend.update : fetchRight.recommend.create;
        const res = await callFunc(postData);
        if (res.data) {
          message.success(res.msg);
          setConfirmLoading(false);
          formTabEdit.resetFields();
          setShowModal(false);
          loadData();
        } else {
          setConfirmLoading(false);
          formTabEdit.resetFields();
          message.error(res.msg);
        }
      }
    }
  };
  const handleCancel = () => {
    formTabEdit.resetFields();
    setParamsEdit({
      imgs: null,
    });
    setShowModal(false);
  };

  return (
    <PageContainer>
      <Card>
        {tab !== 'tab3' && (
          <div style={{ marginBottom: 20 }}>
            <SaveTime time={time} onSave={onSave} onRefresh={onRefresh} />
          </div>
        )}

        <Tabs activeKey={tab} onChange={tabsChange}>
          <TabPane
            tab={intl.formatMessage({
              id: 'site.right.introduction',
            })}
            key="tab1"
          >
            <div className="field-content">
              <Row>
                <Col span={10}>
                  <Form form={formTab1} {...layout} name="params">
                    <Form.Item
                      label={intl.formatMessage({
                        id: 'site.right.nickName',
                      })}
                      name="nickName"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage(
                            {
                              id: 'common.p_pattern',
                            },
                            {
                              min: 2,
                              max: 20,
                            },
                          ),
                        },
                        {
                          min: 2,
                          message: intl.formatMessage(
                            {
                              id: 'common.p_min',
                            },
                            {
                              min: 2,
                            },
                          ),
                        },
                        {
                          max: 20,
                          message: intl.formatMessage(
                            {
                              id: 'common.p_max',
                            },
                            {
                              max: 20,
                            },
                          ),
                        },
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        placeholder={intl.formatMessage(
                          {
                            id: 'common.p_pattern',
                          },
                          {
                            min: 2,
                            max: 20,
                          },
                        )}
                      />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({
                        id: 'common.introduction',
                      })}
                      name="desc"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage(
                            {
                              id: 'common.p_pattern',
                            },
                            {
                              min: 2,
                              max: 100,
                            },
                          ),
                        },
                        {
                          min: 2,
                          message: intl.formatMessage(
                            {
                              id: 'common.p_min',
                            },
                            {
                              min: 2,
                            },
                          ),
                        },
                        {
                          max: 100,
                          message: intl.formatMessage(
                            {
                              id: 'common.p_max',
                            },
                            {
                              max: 100,
                            },
                          ),
                        },
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        placeholder={intl.formatMessage(
                          {
                            id: 'common.p_pattern',
                          },
                          {
                            min: 2,
                            max: 100,
                          },
                        )}
                      />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({
                        id: 'common.tags',
                      })}
                      name="tags"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({
                            id: 'site.right.p_choose_tags',
                          }),
                        },
                      ]}
                    >
                      <Select
                        placeholder={intl.formatMessage({
                          id: 'site.right.p_choose_tags_multiple',
                        })}
                        style={{ width: '100%' }}
                        mode="tags"
                      >
                        {tags.map((item) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({
                        id: 'site.right.showPosition',
                      })}
                      name="showPosition"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({
                            id: 'site.right.p_choose_showPosition',
                          }),
                        },
                      ]}
                    >
                      <Select
                        placeholder={intl.formatMessage({
                          id: 'site.right.p_choose_showPosition_multiple',
                        })}
                        style={{ width: '100%' }}
                        mode="multiple"
                      >
                        {showPositions.map((item) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col offset={2} span={12}>
                  <div className="field-item">
                    <div className="fields-title">
                      <Badge
                        status="error"
                        text={intl.formatMessage({
                          id: 'site.right.friendLink',
                        })}
                      />
                      <span>
                        <FormattedMessage id="site.right.friendLink_num" />
                      </span>
                    </div>
                    <UploadImage
                      showImg={false}
                      showIcon={true}
                      value={params.imgs}
                      max={4}
                      onChange={onUploadImageChange}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane
            tab={intl.formatMessage({
              id: 'site.right.ad_setting',
            })}
            key="tab2"
          >
            <Row>
              <Col span={10}>
                <div className="field-item">
                  <div className="fields-title" style={{ marginBottom: 10 }}>
                    <Badge
                      status="error"
                      text={intl.formatMessage({
                        id: 'site.right.ad_image',
                      })}
                    />
                    <span>
                      <FormattedMessage id="site.right.ad_image_num" />
                    </span>
                  </div>
                  <UploadImage value={params2.imgs} max={3} onChange={onUploadImageChange2} />
                </div>
              </Col>
              <Col offset={2} span={12}>
                <Form form={formTab2} {...layout} name="params2">
                  <Form.Item
                    label={intl.formatMessage({
                      id: 'site.right.showPosition',
                    })}
                    name="showPosition"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          id: 'site.right.p_choose_showPosition',
                        }),
                      },
                    ]}
                  >
                    <Select
                      placeholder={intl.formatMessage({
                        id: 'site.right.p_choose_showPosition_multiple',
                      })}
                      style={{ width: '100%' }}
                      mode="multiple"
                    >
                      {showPositions.map((item) => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={intl.formatMessage({
              id: 'site.right.recommend_setting',
            })}
            key="tab3"
          >
            <Row>
              <Col span={6}>
                <div className="search">
                  <Badge>
                    <FormattedMessage id="site.right.recommend_project" />:
                  </Badge>
                  <Select
                    onChange={(project) => setProject(project)}
                    value={project}
                    style={{ marginLeft: 10, width: '70%' }}
                  >
                    {searchProjects.map((item) => (
                      <Option value={item.key} key={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col offset={16}>
                <Button type="primary" onClick={() => setShowModal(true)}>
                  <PlusOutlined /> <FormattedMessage id="common.add" />
                </Button>
              </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} pagination={false} />

            <Modal
              title={
                paramsEdit._id
                  ? intl.formatMessage({
                      id: 'site.right.recommend_update',
                    })
                  : intl.formatMessage({
                      id: 'site.right.recommend_add',
                    })
              }
              visible={showModal}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Form form={formTabEdit} {...layoutEdit} name="paramsEdit">
                <Form.Item
                  label={intl.formatMessage({
                    id: 'site.right.recommend_project',
                  })}
                  name="project"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'site.right.p_recommend_project',
                      }),
                    },
                  ]}
                >
                  <Select
                    placeholder={intl.formatMessage({
                      id: 'site.right.p_recommend_project',
                    })}
                    style={{ width: '100%' }}
                  >
                    {projects.map((item) => (
                      <Option value={item.key} key={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'site.name',
                  })}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage(
                        {
                          id: 'common.p_pattern',
                        },
                        {
                          min: 2,
                          max: 50,
                        },
                      ),
                    },
                    {
                      min: 2,
                      message: intl.formatMessage(
                        {
                          id: 'common.p_min',
                        },
                        {
                          min: 2,
                        },
                      ),
                    },
                    {
                      max: 50,
                      message: intl.formatMessage(
                        {
                          id: 'common.p_max',
                        },
                        {
                          max: 50,
                        },
                      ),
                    },
                  ]}
                >
                  <Input
                    autoComplete="off"
                    placeholder={intl.formatMessage(
                      {
                        id: 'common.p_pattern',
                      },
                      {
                        min: 2,
                        max: 50,
                      },
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'site.right.showPosition',
                  })}
                  name="showPosition"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'site.right.p_choose_showPosition',
                      }),
                    },
                  ]}
                >
                  <Select
                    placeholder={intl.formatMessage({
                      id: 'site.right.p_choose_showPosition_multiple',
                    })}
                    style={{ width: '100%' }}
                    mode="multiple"
                  >
                    {showPositions.map((item) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({
                    id: 'site.right.platform',
                  })}
                  name="platform"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage(
                        {
                          id: 'common.p_pattern',
                        },
                        {
                          min: 2,
                          max: 20,
                        },
                      ),
                    },
                    {
                      min: 2,
                      message: intl.formatMessage(
                        {
                          id: 'common.p_min',
                        },
                        {
                          min: 2,
                        },
                      ),
                    },
                    {
                      max: 20,
                      message: intl.formatMessage(
                        {
                          id: 'common.p_max',
                        },
                        {
                          max: 20,
                        },
                      ),
                    },
                  ]}
                >
                  <Input
                    autoComplete="off"
                    placeholder={intl.formatMessage(
                      {
                        id: 'common.p_pattern',
                      },
                      {
                        min: 2,
                        max: 20,
                      },
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({
                    id: 'site.right.isVip',
                  })}
                  name="isVip"
                  initialValue={false}
                >
                  <Radio.Group>
                    <Radio value={true}>
                      <FormattedMessage id="common.yes" />
                    </Radio>
                    <Radio value={false}>
                      <FormattedMessage id="common.no" />
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    id: 'site.right.cover_link',
                  })}
                  name="imgs"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'site.right.p_cover_link',
                      }),
                    },
                  ]}
                >
                  <UploadImage value={paramsEdit.imgs} showAction={false} />
                </Form.Item>
              </Form>
            </Modal>
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Right;
