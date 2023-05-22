import React, { useState, useRef } from 'react';
import { Input, InputNumber, Switch } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { useIntl } from 'umi';

import './index.less';

const MenuItemConfig = (props) => {
  const { onChange, onRemove } = props;
  const intl = useIntl();

  const [params, setParams] = useState(() => {
    return {
      ...props,
    };
  });

  const handlChangeToggle = (status) => {
    setParams((preState) => {
      return {
        ...preState,
        status,
      };
    });
    onChange('status', status);
  };
  const mouseToggle = (deletable) => {
    const { editable } = params;
    if (editable) {
      setParams((preState) => {
        return {
          ...preState,
          deletable,
        };
      });
    }
  };

  const onChangeValue = (e, field) => {
    console.log(e,field)
    if (field !== 'sort') {
      const value = e.target.value.slice(0, 50);
      setParams((preState) => {
        return {
          ...preState,
          [field]: value,
        };
      });
      onChange(field, value);
    } else {
      setParams((preState) => {
        return {
          ...preState,
          [field]: e,
        };
      });
      onChange(field, e);
    }
  };
  console.log('params', params);
  return (
    <div
      className="item-config"
      onMouseEnter={() => mouseToggle(true)}
      onMouseLeave={() => mouseToggle(false)}
    >
      <Input
        value={params.menuName}
        disabled={params.disabled}
        style={{ flex: 1 }}
        placeholder={intl.formatMessage({
          id: 'site.name',
        })}
        onChange={(e) => onChangeValue(e, 'menuName')}
      />
      <Input
        value={params.router}
        disabled={params.disabled}
        style={{ flex: 1, marginLeft: 10 }}
        placeholder={intl.formatMessage({
          id: 'site.router',
        })}
        onChange={(e) => onChangeValue(e, 'router')}
      />
      <InputNumber
        value={params.sort}
        disabled={params.disabled}
        min={-9999}
        max={9999}
        parser={(value) => value.replace(/[^\d-]/, '')}
        style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
        placeholder={intl.formatMessage({
          id: 'common.sort',
        })}
        onChange={(e) => onChangeValue(e, 'sort')}
      />
      <Switch
        checkedChildren={intl.formatMessage({
          id: 'common.enable',
        })}
        unCheckedChildren={intl.formatMessage({
          id: 'common.disable',
        })}
        checked={params.status}
        disabled={params.disabled}
        onChange={(checked) => handlChangeToggle(checked)}
      />

      <div className="item-config-close">
        {params.deletable && (
          <CloseCircleTwoTone
            onClick={onRemove}
            className="item-config-close-btn"
            twoToneColor="#ff4d4f"
          />
        )}
      </div>
    </div>
  );
};

export default MenuItemConfig;
