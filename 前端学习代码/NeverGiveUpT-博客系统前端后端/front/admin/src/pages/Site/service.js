import request from '@/utils/request';
import { replacePage } from '@/utils/utils';

export async function queryHomeConfig(data) {
  return request('/api/config/home', {
    method: 'GET',
    data,
  });
}

export async function addHomeConfig(params) {
  return request('/api/config/home', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHomeConfig(params) {
  return request('/api/config/home', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

// header footer 配置
export async function queryHeaderFooterConfig(data) {
  return request('/api/config/hf', {
    method: 'GET',
    data,
  });
}

export async function addHeaderFooterConfig(params) {
  return request('/api/config/hf', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHeaderFooterConfig(params) {
  return request('/api/config/hf', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
const introduction = {
  query: async (params) => {
    return request('/api/config/right/introduction', {
      method: 'GET',
      data: {
        ...params,
      },
    });
  },
  create: async (params) => {
    return request('/api/config/right/introduction', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  },
  update: async (params) => {
    return request('/api/config/right/introduction', {
      method: 'PUT',
      data: {
        ...params,
      },
    });
  },
};

const ad = {
  query: async (params) => {
    return request('/api/config/right/ad', {
      method: 'GET',
      data: {
        ...params,
      },
    });
  },
  create: async (params) => {
    return request('/api/config/right/ad', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  },
  update: async (params) => {
    return request('/api/config/right/ad', {
      method: 'PUT',
      data: {
        ...params,
      },
    });
  },
};

const recommend = {
  query: async (params) => {
    return request('/api/config/right/recommend?project=' + params.project, {
      method: 'GET',
    });
  },
  create: async (params) => {
    return request('/api/config/right/recommend', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  },
  update: async (params) => {
    return request('/api/config/right/recommend', {
      method: 'PUT',
      data: {
        ...params,
      },
    });
  },
  remove: async (params) => {
    return request('/api/config/right/recommend', {
      method: 'DELETE',
      data: {
        ...params,
      },
    });
  },
};

export const fetchRight = {
  introduction,
  ad,
  recommend,
};

export async function queryResume(params) {
  const res = await request('/api/resume', {
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

export async function removeResume(params) {
  return request('/api/resume', {
    method: 'delete',
    data: {
      ...params,
    },
  });
}

export async function createResume(params) {
  return request('/api/resume', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateResume(params) {
  return request('/api/resume', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryResumeEdit(params) {
  return request(`/api/resume/${params.id}/edit`, {
    method: 'GET',
  });
}

export async function updateResumeStatus(params) {
  return request('/api/resume/status', {
    method: 'put',
    data: {
      ...params,
    },
  });
}


export async function queryWedding(params) {
  const res = await request('/api/wedding', {
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