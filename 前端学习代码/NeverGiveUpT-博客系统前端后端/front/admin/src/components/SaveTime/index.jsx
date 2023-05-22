import React from 'react';
import { Alert, Button, Affix } from 'antd';
import { SaveOutlined, RedoOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';
import { FormattedMessage, useIntl } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

const SaveTime = (props) => {
  const intl = useIntl();

  const { time, onSave, onRefresh, onBack } = props;
  const timeMessage =
    intl.formatMessage({
      id: 'component.saveTime.saveTime',
    }) + moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
  const message = time
    ? timeMessage
    : intl.formatMessage({
        id: 'component.saveTime.noAction',
      });
  return (
    <FooterToolbar
      extra={
        <div className="save-time">
          <span>{message}</span>
          <div>
            {onBack && (
              <Button
                onClick={onBack}
                className="save-btn"
                size="small"
                type="primary"
                danger
                icon={<DoubleLeftOutlined />}
              >
                <FormattedMessage id="component.saveTime.return" />
              </Button>
            )}
            {onRefresh && (
              <Button
                onClick={onRefresh}
                className="save-btn"
                size="small"
                icon={<RedoOutlined />}
              >
                <FormattedMessage id="component.saveTime.refresh" />
              </Button>
            )}
            {onSave && (
              <Button
                onClick={onSave}
                className="save-btn"
                size="small"
                type="primary"
                icon={<SaveOutlined />}
              >
                <FormattedMessage id="component.saveTime.save" />
              </Button>
            )}
          </div>
        </div>
      }
    ></FooterToolbar>
  );
};

export default SaveTime;
