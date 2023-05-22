import { ICourse } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button } from 'antd';

interface IProps {
  onEditHandler: (id: string) => void
  onOrderTimeHandler: (id: string) => void
}

export const getColumns: ({
  onEditHandler,
  onOrderTimeHandler,
}: IProps) => ProColumns<ICourse, 'text'>[] = ({
  onEditHandler,
  onOrderTimeHandler,
}) => [
  {
    title: '课程标题',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '限制人数',
    dataIndex: 'limitNumber',
    width: 75,
    search: false,
  },
  {
    title: '持续时长',
    dataIndex: 'duration',
    width: 75,
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (text, entity) => [
      <Button
        key="edit"
        type="link"
        onClick={() => onEditHandler(entity.id)}
      >
        编辑
      </Button>,
      <Button
        key="orderTime"
        type="link"
        onClick={() => onOrderTimeHandler(entity.id)}
      >
        可约时间
      </Button>],
  },
];
