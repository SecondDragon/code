import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { GET_STUDENTS } from '@/graphql/student';
import { useQuery } from '@apollo/client';
import { TStudentQuery } from '../utils/types';

export const useStudents = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const {
    loading, error, data, refetch,
  } = useQuery<TStudentQuery>(
    GET_STUDENTS,
    {
      variables: {
        page: {
          pageNum,
          pageSize,
        },
      },
    },
  );

  return {
    loading,
    error,
    refetch,
    page: data?.getStudents.page,
    data: data?.getStudents.data,
  };
};
