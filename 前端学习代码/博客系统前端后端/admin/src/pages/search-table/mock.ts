import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'workflow|4': /[A-Z][a-z][-][0-9]/,
      period: `${Random.date('m')} Min`,
      'statistic|1-4': /[1-9]/,
      status: Random.pick(['success', 'pending', 'failed']),
      createdTime: Random.datetime(),
      deadline: Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/policy'), (params) => {
      const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = page as number;
      const ps = pageSize as number;

      return {
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      };
    });
  },
});
