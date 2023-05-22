import { PageContainer } from '@ant-design/pro-components';
import { useStudents } from '@/services/student';
import {
  Card, Pagination, Space,
} from 'antd';
import { IStudent } from '@/utils/types';
import style from './index.module.less';

const Student = () => {
  const {
    loading, data, page, refetch,
  } = useStudents();

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  return (
    <div className={style.container}>
      <PageContainer
        loading={loading}
        header={{
          title: '学员管理',
        }}
      >
        <Card>
          {
          data?.map((item: IStudent) => (
            <Card
              key={item.id}
              hoverable
              className={style.card}
              cover={(
                <div
                  className={style.avatar}
                  style={{ backgroundImage: `url(${item.avatar || 'http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/1675623073445.jpg'} )` }}
                />
              )}
            >
              <Card.Meta
                title={item.name || '无名氏'}
                description={<Space>{[item.account || '无账号', item.tel || '无手机号']}</Space>}
              />
            </Card>
          ))
        }
          <div className={style.page}>
            <Pagination
              pageSize={page?.pageSize}
              current={page?.pageNum}
              total={page?.total}
              onChange={onPageChangeHandler}
            />
          </div>
        </Card>
      </PageContainer>
    </div>
  );
};

export default Student;
