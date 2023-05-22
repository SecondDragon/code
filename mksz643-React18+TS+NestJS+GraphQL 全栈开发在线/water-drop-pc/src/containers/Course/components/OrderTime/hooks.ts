import { useMemo } from 'react';
import { useCourseInfo, useEditCourseInfo } from '@/services/course';
import { IOrderTime, IWeekCourse, TWeek } from '@/utils/types';
import { DAYS, isWorkDay } from './constants';

export const useOrderTime = (id: string, currentDayKey: TWeek) => {
  const { data, loading, refetch } = useCourseInfo(id);
  const [edit, editLoading] = useEditCourseInfo();

  const orderTime = useMemo(
    () => (data?.reducibleTime || []).find((item) => item.week
     === currentDayKey)?.orderTime || [],
    [data, currentDayKey],
  );

  const onSaveHandler = (ot: IOrderTime[]) => {
    const rt = [...(data?.reducibleTime || [])];
    const index = rt.findIndex((item) => item.week === currentDayKey);
    if (index > -1) {
      rt[index] = {
        week: currentDayKey,
        orderTime: ot,
      };
    } else {
      rt.push({
        week: currentDayKey,
        orderTime: ot,
      });
    }
    edit(id, {
      reducibleTime: rt,
    }, () => refetch());
  };

  const onDeleteHandler = (key: number) => {
    const newData = orderTime.filter((item) => item.key !== key);
    onSaveHandler(newData);
  };

  const allWorkDaySyncHandler = () => {
    const rt: IWeekCourse[] = [];
    DAYS.forEach((item) => {
      if (isWorkDay(item.key)) {
        rt.push({
          week: item.key,
          orderTime,
        });
      }
    });
    edit(id, {
      reducibleTime: rt,
    }, () => refetch());
  };

  const allWeekSyncHandler = () => {
    const rt: IWeekCourse[] = [];
    DAYS.forEach((item) => {
      rt.push({
        week: item.key,
        orderTime,
      });
    });
    edit(id, {
      reducibleTime: rt,
    }, () => refetch());
  };

  return {
    orderTime,
    loading: loading || editLoading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  };
};
