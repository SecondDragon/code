const Controller = require("egg").Controller;

class TkbController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async category() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin } = (await service.web.about.index()).data;
    const res = await ctx.curl(
      `${tkbApi}/m/category?page=${data.page || PAGE}&pageSize=${
        data.pageSize || PAGE_SIZE
      }&type=${data.type || "ALBUM"}`,
      {
        headers: {
          Origin: tkbOrigin,
        },
      }
    );
    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: JSON.parse(res.data),
      },
    });
  }

  async imageAlbums() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin, tkbStatic } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/image/albums?page=${data.page || PAGE}&pageSize=${
      data.pageSize || PAGE_SIZE
    }&recommendType=${data.recommendType || "NEW"}`;
    if (data.categoryId) {
      url += `&categoryId=${data.categoryId}`;
    }
    if (data.title) {
      url += `&title=${data.title}`;
    }
    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.content.map((item) => {
      item.imgUrl = `${tkbStatic}/${item.batch}/${item.url}/${item.thumbnail}`;
      return item;
    });

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async imageList() {
    const { ctx, service } = this;
    const data = ctx.request.query;

    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin, tkbStatic } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/image/list?page=${data.page || PAGE}&pageSize=${
      data.pageSize || PAGE_SIZE
    }&batch=${data.batch}&url=${data.url}`;

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.content.map((item) => {
      item.imgUrl = `${tkbStatic}/${data.batch}/${item.url}/${item.thumbnail}`;
      return item;
    });

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async imageAlbum() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { tkbApi, tkbOrigin } = (await service.web.about.index()).data;

    let url = `${tkbApi}/image/album?batch=${data.batch}&url=${data.url}`;

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async novelList() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin, tkbStatic } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/novel/list?page=${data.page || PAGE}&pageSize=${
      data.pageSize || PAGE_SIZE
    }&recommendType=${data.recommendType || "NEW"}`;
    if (data.categoryId) {
      url += `&categoryId=${data.categoryId}`;
    }
    if (data.title) {
      url += `&title=${data.title}`;
    }

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.content.map((item) => {
      item.imgUrl = `${tkbStatic}/novel/${item.batch}/${item.thumbnail}`;
      return item;
    });

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async novelChapters() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { tkbApi, tkbOrigin } = (await service.web.about.index()).data;
    let url = `${tkbApi}/novel/chapters?page=0&pageSize=20&batch=${data.batch}`;

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async novel() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { tkbOrigin, tkbResources } = (await service.web.about.index()).data;

    let url = `${tkbResources}/novel/${data.batch}/${data.cbatch}.txt`;

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = res.data.toString();
    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async starList() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin, tkbStatic } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/star/list?page=${data.page || PAGE}&pageSize=${
      data.pageSize || PAGE_SIZE
    }`;

    if (data.braSize) {
      url += `&braSize=${data.braSize}`;
    }
    if (data.category) {
      url += `&category=${data.category}`;
    }
    if (data.title) {
      url += `&title=${data.title}`;
    }
    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.content.map((item) => {
      item.imgUrl = `${tkbStatic}/other/${item.thumbnail}`;
      return item;
    });

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async starGet() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { tkbApi, tkbOrigin, tkbStatic } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/star/get?name=${data.name}`;
    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.imgUrl = `${tkbStatic}/other/${dataObj.thumbnail}`;
    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async vList() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin, tkbStatic, tkbResources } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/v/list?page=${data.page || PAGE}&pageSize=${
      data.pageSize || PAGE_SIZE
    }`;

    // 明星列表需要的参数
    if (data.star) {
      url += `&star=${data.star}`;
    }

    // 视频列表需要的参数
    if (data.recommendType) {
      url += `&recommendType=${data.recommendType}`;
    }
    if (data.categoryId) {
      url += `&categoryId=${data.categoryId}`;
    }

    if (data.labelId) {
      url += `&labelId=${data.labelId}`;
    }

    if (data.title) {
      url += `&title=${data.title}`;
    }

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.content.map((item) => {
      item.imgUrl = `${tkbStatic}/${item.batch}/${item.url}/thumbnail.jpg`;
      item.previewUrl = `${tkbResources}/${item.batch}/${item.url}/output_preview.mp4`;

      return item;
    });

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async vGet() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const {
      tkbApi,
      tkbOrigin,
      tkbStatic,
      tkbCryptoKey,
      tkbSlat,
      tkbResources,
    } = (await service.web.about.index()).data;

    let url = `${tkbApi}/v/get?batch=${data.batch}&url=${data.url}`;
    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.imgUrl = `${tkbStatic}/${dataObj.batch}/${dataObj.url}/thumbnail.jpg`;
    dataObj.tkbCryptoKey = tkbCryptoKey;
    dataObj.tkbSlat = tkbSlat;
    dataObj.tkbResources = tkbResources;

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async vListSimilar() {
    const { ctx, service } = this;
    const data = ctx.request.query;

    const { PAGE, PAGE_SIZE } = ctx.app.config;
    const { tkbApi, tkbOrigin, tkbStatic, tkbResources } = (
      await service.web.about.index()
    ).data;

    let url = `${tkbApi}/v/list/similar?page=${data.page || PAGE}&pageSize=${
      data.pageSize || PAGE_SIZE
    }&batch=${data.batch}&url=${data.url}`;

    const res = await ctx.curl(url, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    let dataObj = JSON.parse(res.data);
    dataObj.content.map((item) => {
      item.imgUrl = `${tkbStatic}/${item.batch}/${item.url}/thumbnail.jpg`;
      item.previewUrl = `${tkbResources}/${item.batch}/${item.url}/output_preview.mp4`;
      return item;
    });

    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: dataObj,
      },
    });
  }

  async mLabels() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const { tkbApi, tkbOrigin } = (await service.web.about.index()).data;
    const res = await ctx.curl(`${tkbApi}/m/labels?type=${data.type}`, {
      headers: {
        Origin: tkbOrigin,
      },
    });
    this.ctx.helper.success({
      ctx,
      res: {
        ...res,
        data: JSON.parse(res.data),
      },
    });
  }
}

module.exports = TkbController;
