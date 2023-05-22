import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Switch, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from 'umi';
import './index.less';

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import { queryHomeConfig, addHomeConfig, updateHomeConfig } from '../service';

const Home = () => {
  const intl = useIntl();

  const initBackgroundImages = [
    {
      field: 'archiveBgImg',
      name: intl.formatMessage({
        id: 'site.archiveBgImg',
      }),
    },
    {
      field: 'categoriesBgImg',
      name: intl.formatMessage({
        id: 'site.categoriesBgImg',
      }),
    },
    {
      field: 'categoriesDetailBgImg',
      name: intl.formatMessage({
        id: 'site.categoriesDetailBgImg',
      }),
    },
    {
      field: 'tagsBgImg',
      name: intl.formatMessage({
        id: 'site.tagsBgImg',
      }),
    },
    {
      field: 'tagsDetailBgImg',
      name: intl.formatMessage({
        id: 'site.tagsDetailBgImg',
      }),
    },
    {
      field: 'aboutBgImg',
      name: intl.formatMessage({
        id: 'site.aboutBgImg',
      }),
    },
  ];
  const [backgroundImages, setBackgroundImages] = useState(initBackgroundImages);
  const [params, setParams] = useState({
    introduction: '',
    effects: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh) => {
    const res = await queryHomeConfig();
    if (isRefresh) {
      message.success(
        intl.formatMessage({
          id: 'common.refresh_success',
        }),
      );
    }
    let data = res.data;

    if (!data) return;
    backgroundImages.map((item) => {
      item.imgs = [
        {
          imgUrl: data[item.field],
        },
      ];
      return item;
    });
    setBackgroundImages(backgroundImages);
    setParams({
      ...data,
    });
  };
  const [showTip, setShowTip] = useState(false);

  const validateParams = (postData) => {
    console.log(backgroundImages);
    let flag = false;
    for (let i in backgroundImages) {
      if (!backgroundImages[i].imgs) {
        message.error(
          intl.formatMessage(
            {
              id: 'site.p_upload',
            },
            {
              name: 'backgroundImages[i].name',
            },
          ),
        );
        flag = false;
        return;
      } else {
        flag = true;
      }
    }
    if (!flag) {
      return flag;
    }

    if (!postData.introduction) {
      message.error(
        intl.formatMessage({
          id: 'site.p_introduction',
        }),
      );
      return false;
    }
    if (postData.introduction.length < 2) {
      message.error(
        intl.formatMessage({
          id: 'site.p_introduction_pattern',
        }),
      );
      return false;
    }
    return true;
  };

  const onRefresh = () => {
    loadData(true);
  };

  const onSave = async () => {
    let postData = {
      ...params,
    };
    if (validateParams(postData)) {
      const callFunc = postData._id ? updateHomeConfig : addHomeConfig;
      const res = await callFunc(params);
      if (res.data) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    }
  };
  const onChange = useCallback((imgs, index) => {
    setBackgroundImages((preState) => {
      preState[index]['imgs'] = imgs;
      return [...preState];
    });
    setParams((preState) => {
      const field = backgroundImages[index].field;
      return {
        ...preState,
        [field]: imgs[0].imgUrl,
      };
    });
  });

  const onChangeIntroduction = (e) => {
    e.persist();
    setParams((preState) => {
      return {
        ...preState,
        introduction: e.target.value.slice(0, 100),
      };
    });
  };

  const handlChangeToggle = (field, value) => {
    setParams((preState) => {
      return {
        ...preState,
        [field]: value,
      };
    });
  };

  return (
    <PageContainer>
      <Card>
        <SaveTime onSave={onSave} onRefresh={onRefresh} time={params.updateTime} />
        <div className="field-content">
          <Row>
            {backgroundImages.map((item, index) => {
              return (
                <Col key={item.field} span={4}>
                  <div className="field-item">
                    <div className="field-titles">
                      <Badge status="error" text={item.name} />
                    </div>
                    <UploadImage
                      value={item.imgs}
                      showLink={false}
                      showAction={false}
                      onChange={(imgs) => onChange(imgs, index)}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col span={12}>
              <div className="field-item">
                <div className="field-titles">
                  <Badge
                    status="error"
                    text={intl.formatMessage({
                      id: 'site.introduction',
                    })}
                  />
                </div>
                <Input.TextArea
                  value={params.introduction}
                  onFocus={() => setShowTip(true)}
                  onBlur={() => setShowTip(false)}
                  onChange={(e) => onChangeIntroduction(e)}
                  allowClear={true}
                  rows={6}
                />
                {showTip && (
                  <p className="field-tip">
                    {intl.formatMessage(
                      {
                        id: 'common.num',
                      },
                      {
                        name: (
                          <span className="field-tip-num">{100 - params.introduction.length}</span>
                        ),
                      },
                    )}
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <div className="field-item">
                <div className="field-titles">
                  <Badge>
                    <FormattedMessage id="site.effects" />
                  </Badge>
                  <Switch
                    className="field-switch"
                    checkedChildren={intl.formatMessage({
                      id: 'common.open',
                    })}
                    unCheckedChildren={intl.formatMessage({
                      id: 'common.close',
                    })}
                    checked={params.effects}
                    onChange={(checked) => handlChangeToggle('effects', checked)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Home;
