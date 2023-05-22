import { message } from 'antd';
import { TBaseCourse, TCourseQuery, TCoursesQuery } from '@/utils/types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from '../graphql/course';

export const useCourses = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });

  const refetchHandler = async (params: {
    name?: string;
    pageSize?: number;
    current?: number;
  }) => {
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getCourses.page.total,
      data: res?.getCourses.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getCourses.page,
    data: data?.getCourses.data,
  };
};

export const useEditCourseInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_COURSE);

  const handleEdit = async (
    id: number,
    params: TBaseCourse,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitCourseInfo.code === 200) {
      message.success(res.data.commitCourseInfo.message);
      callback(true);
      return;
    }
    message.error(res.data.commitCourseInfo.message);
  };

  return [handleEdit, loading];
};

export const useCourse = () => {
  const [get, { loading }] = useLazyQuery(GET_COURSE);

  const getCourse = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });

    return res.data.getCourseInfo.data;
  };

  return { getCourse, loading };
};

export const useCourseInfo = (id: string) => {
  const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
    variables: {
      id,
    },
  });

  return { data: data?.getCourseInfo.data, loading, refetch };
};
