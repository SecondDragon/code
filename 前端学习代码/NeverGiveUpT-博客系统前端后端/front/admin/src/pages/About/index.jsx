import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, Input, Row, Col, Badge, Tag, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import './index.less';
import { FormattedMessage, useIntl } from 'umi';

import SaveTime from '@/components/SaveTime';
import UploadImage from '@/components/UploadImage';
import { queryAbout, addAbout, updateAbout } from './service';
import { randomColor } from '@/utils/utils';

const About = () => {
  const intl = useIntl();
  const [params, setParams] = useState({
    tags: [],
    desc: '',
    showResume: false,
    showTkb: false,
    tkbApi: '',
    tkbOrigin: '',
    tkbStatic: '',
    tkbResources: '',
    tkbCryptoKey: '', // crypto md5 秘钥
    tkbSlat: '', //加盐字符串
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh) => {
    const res = await queryAbout();
    if (isRefresh) {
      message.success(
        intl.formatMessage({
          id: 'common.refresh_success',
        }),
      );
    }
    const data = res.data;
    if (!data) return;
    const tags = data.tags.map((item) => {
      return {
        name: item,
        color: randomColor(),
      };
    });
    setParams({
      ...data,
      tags,
    });
  };
  const [showTip, setShowTip] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const validateParams = (postData) => {
    if (postData.imgs.length === 0) {
      message.error(
        intl.formatMessage({
          id: 'about.p_upload_image',
        }),
      );
      return false;
    }
    let flag = false;
    postData.imgs.forEach((item, index) => {
      if (!item.imgUrl) {
        message.error(
          intl.formatMessage(
            {
              id: 'about.p_upload_image_n',
            },
            {
              name: index + 1,
            },
          ),
        );
        flag = false;
      } else {
        flag = true;
      }
    });
    if (!flag) {
      return false;
    }

    if (!postData.desc) {
      message.error(
        intl.formatMessage({
          id: 'about.p_input_desc',
        }),
      );
      return false;
    }
    if (postData.tags.length === 0) {
      message.error(
        intl.formatMessage({
          id: 'about.p_input_1_tag',
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
    let imgs = [];
    let tags = [];
    if (params.imgs) {
      imgs = params.imgs.map((item) => {
        const obj = {
          imgUrl: item.imgUrl,
          link: item.link,
        };
        return obj;
      });
    }
    if (params.tags) {
      tags = params.tags.map((item) => item.name);
    }
    let postData = {
      ...params,
      imgs,
      tags,
    };
    if (validateParams(postData)) {
      const func = postData._id ? updateAbout : addAbout;
      const res = await func(postData);
      if (res.data) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    }
  };
  const onChange = useCallback((imgs) => {
    setParams((preState) => {
      return {
        ...preState,
        imgs,
      };
    });
  });
  const onChangeDesc = (e) => {
    e.persist();
    setParams((preState) => {
      return {
        ...preState,
        desc: e.target.value.slice(0, 5000),
      };
    });
  };

  const onChangeTKB = (e, field) => {
    e.persist(); // 不调用就获取不到e.target
    setParams((preState) => {
      return {
        ...preState,
        [field]: e.target.value,
      };
    });
  };

  const handleCloseTag = (removedTag) => {
    setParams((preState) => {
      const tags = preState.tags.filter((tag) => tag !== removedTag);
      return {
        ...preState,
        tags,
      };
    });
  };

  const handleShowResume = (showResume) => {
    setParams((preState) => {
      return {
        ...preState,
        showResume,
      };
    });
  };
  const handleShowTkb = (showTkb) => {
    setParams((preState) => {
      return {
        ...preState,
        showTkb,
      };
    });
  };

  const saveInputRef = useRef();

  const showInput = () => {
    setInputVisible(() => {
      saveInputRef.current && saveInputRef.current.focus();
      return true;
    });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    const removeRepeat = (arr) => {
      let map = new Map();
      for (let item of arr) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      return [...map.values()];
    };

    setParams((preState) => {
      let newTags = [...preState.tags];
      if (inputValue && newTags.length < 20) {
        newTags.push({
          name: inputValue,
          color: randomColor(),
        });
        // 去重
        newTags = removeRepeat(newTags);
      }
      return {
        ...preState,
        tags: newTags,
      };
    });
    setInputValue('');
    setInputVisible(false);
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        color={tag.color}
        onClose={(e) => {
          e.preventDefault();
          handleCloseTag(tag);
        }}
      >
        {tag.name}
      </Tag>
    );
    return (
      <span className="tags-item" key={tag.name}>
        {tagElem}
      </span>
    );
  };
  const tagChild = params.tags ? params.tags.map(forMap) : null;

  return (
    <div>
      <Card>
        <SaveTime onSave={onSave} onRefresh={onRefresh} time={params.updateTime} />
        <div className="field-content">
          <Row>
            <Col span={12}>
              <Row>
                <Col>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tags" />} />
                      <span>
                        <FormattedMessage id="about.tags_num" />
                      </span>
                    </div>
                    <Card>
                      <TweenOneGroup
                        enter={{
                          scale: 0.8,
                          opacity: 0,
                          type: 'from',
                          duration: 100,
                          onComplete: (e) => {
                            e.target.style = '';
                          },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                      >
                        {tagChild}
                        {inputVisible && (
                          <Input
                            ref={saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 100 }}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                          />
                        )}
                        {!inputVisible && (
                          <Tag onClick={showInput} className="site-tag-plus">
                            <PlusOutlined />
                            <FormattedMessage id="about.add" />
                          </Tag>
                        )}
                      </TweenOneGroup>
                    </Card>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.desc" />} />
                    </div>
                    <Input.TextArea
                      value={params.desc}
                      onFocus={() => setShowTip(true)}
                      onBlur={() => setShowTip(false)}
                      onChange={(e) => onChangeDesc(e)}
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
                              <span className="field-tip-num">{5000 - params.desc.length}</span>
                            ),
                          },
                        )}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item" style={{ display: 'flex' }}>
                    <div className="field-title">
                      <Badge>
                        <FormattedMessage id="about.showResume" />
                      </Badge>
                      <Switch
                        className="field-switch"
                        checkedChildren={<FormattedMessage id="common.show" />}
                        unCheckedChildren={<FormattedMessage id="common.hide" />}
                        checked={params.showResume}
                        onChange={(checked) => handleShowResume(checked)}
                      />
                    </div>
                    <div className="field-title" style={{ marginLeft: 20 }}>
                      <Badge>
                        <FormattedMessage id="about.showTkb" />
                      </Badge>
                      <Switch
                        className="field-switch"
                        checkedChildren={<FormattedMessage id="common.show" />}
                        unCheckedChildren={<FormattedMessage id="common.hide" />}
                        checked={params.showTkb}
                        onChange={(checked) => handleShowTkb(checked)}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tkbApi" />} />
                    </div>
                    <Input value={params.tkbApi} onChange={(e) => onChangeTKB(e, 'tkbApi')} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tkbOrigin" />} />
                    </div>
                    <Input value={params.tkbOrigin} onChange={(e) => onChangeTKB(e, 'tkbOrigin')} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tkbStatic" />} />
                    </div>
                    <Input value={params.tkbStatic} onChange={(e) => onChangeTKB(e, 'tkbStatic')} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tkbResources" />} />
                    </div>
                    <Input
                      value={params.tkbResources}
                      onChange={(e) => onChangeTKB(e, 'tkbResources')}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tkbCryptoKey" />} />
                    </div>
                    <Input
                      value={params.tkbCryptoKey}
                      onChange={(e) => onChangeTKB(e, 'tkbCryptoKey')}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.tkbSlat" />} />
                    </div>
                    <Input value={params.tkbSlat} onChange={(e) => onChangeTKB(e, 'tkbSlat')} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col offset={2} span={10}>
              <Row>
                <Col>
                  <div className="field-item">
                    <div className="field-title">
                      <Badge status="error" text={<FormattedMessage id="about.img" />} />
                      <span>
                        <FormattedMessage id="about.img_num" />
                      </span>
                    </div>
                    <UploadImage value={params.imgs} max={3} onChange={onChange} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default About;
