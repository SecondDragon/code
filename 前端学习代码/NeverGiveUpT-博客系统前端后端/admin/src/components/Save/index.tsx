import React from 'react';
import { Card, Link, Button } from '@arco-design/web-react';
import { IconClockCircle, IconRefresh, IconSave, IconArrowLeft } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import history from '../../history';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';
import dayjs from 'dayjs';

const Save = (props) => {
  const { time, showBack, onRefresh, onSave, onBack, onPublish } = props;
  const message = time
    ? `上次保存时间：${dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')}`
    : '暂无操作';
  const goBack = () => {
    history.goBack();
  };
  const { collapsed, settings } = useSelector((state: ReducerState) => state.global);

  const width = collapsed ? `calc(100% - 48px)` : `calc(100% - ${settings.menuWidth}px)`;
  return (
    <Card bordered={false} className={styles.card} style={{ width }}>
      <div className={styles.box}>
        <Link icon={<IconClockCircle />}>{message}</Link>
        {showBack && (
          <Button
            onClick={onBack || goBack}
            className={styles.btn}
            type="outline"
            icon={<IconArrowLeft />}
          >
            返回
          </Button>
        )}
        {onRefresh && (
          <Button onClick={onRefresh} className={styles.btn} type="outline" icon={<IconRefresh />}>
            刷新
          </Button>
        )}
        {onSave && (
          <Button onClick={onSave} className={styles.btn} type="primary" icon={<IconSave />}>
            保存
          </Button>
        )}
        {onPublish && (
          <Button onClick={onPublish} className={styles.btn} type="primary" icon={<IconSave />}>
            发布
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Save;
