import request from '@/utils/request';
import { replacePage } from '@/utils/utils';
import moment from 'moment';

export async function queryArticles(params) {
  console.log(params);
  if (params.tags) {
    params.tags = params.tags.join(',');
  }
  if (params.categories === '全部') {
    delete params.categories;
  }
  if (params.createTime) {
    params.createStartTime = moment(params.createTime[0]).unix();
    params.createEndTime = moment(params.createTime[1]).unix();
    delete params.createTime;
  }

  if (params.updateTime) {
    params.updateStartTime = moment(params.updateTime[0]).unix();
    params.updateEndTime = moment(params.updateTime[1]).unix();
    delete params.updateTime;
  }

  const res = await request('/api/articles', {
    params: replacePage(params),
  });
  return new Promise((resolve, reject) => {
    if (res.code === 0) {
      res.data &&
        resolve({
          data: res.data.list,
          current: res.data.page,
          total: res.data.totalCount,
          success: true,
          pageSize: res.data.pageSize,
        });
    } else {
      resolve({
        data: [],
        current: params.current,
        total: 0,
        success: false,
        pageSize: params.pageSize,
      });
    }
  });
}

export async function addArticles(params) {
  return request('/api/articles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryArticlesEdit(params) {
  return request(`/api/articles/${params.id}/edit`, {
    method: 'GET',
  });
}

export async function removeArticles(params) {
  return request('/api/articles', {
    method: 'delete',
    data: {
      ...params,
    },
  });
}

export async function updateArticles(params) {
  return request('/api/articles', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateArticlesStatus(params) {
  return request('/api/articles/status', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateArticlesPublishStatus(params) {
  return request('/api/articles/publishStatus', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function updateSort(params) {
  return request('/api/articles/sort', {
    method: 'put',
    data: {
      ...params,
    },
  });
}
export async function updateArticlesCollectStatus(params) {
  return request('/api/articles/collectStatus', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

