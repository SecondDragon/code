<template>
  <div>
    <tkb-header title="小说" @search="search" :back="false"></tkb-header>
    <tkb-filter @onFilter="onFilter" type="NOVEL"></tkb-filter>
    <tkb-footer shift="books"></tkb-footer>

    <!-- 无数据 -->
    <div v-if="list && list.length === 0" class="no-data">
      <img :src="noData" alt="" />
    </div>

    <!-- 列表 -->
    <mu-load-more
      class="load-more"
      @refresh="refresh"
      :refreshing="refreshing"
      :loading="loading"
      @load="load"
    >
      <mu-list textline="three-line">
        <div v-for="item in list" :key="item.imgUrl">
          <mu-list-item
            @click="goBooksRead(item)"
            avatar
            :ripple="false"
            button
          >
            <mu-list-item-action class="item-img">
              <img :src="item.imgUrl" />
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>《{{ item.title }}》 </mu-list-item-title>
              <div class="sub-title">
                <div class="desc">{{ item.description }}</div>
                <div class="author">
                  <span>
                    <mu-icon
                      color="primary"
                      class="eye"
                      :size="16"
                      value="remove_red_eye"
                    ></mu-icon>
                    {{ item.playCount | filterPlayCount }}
                  </span>
                  <span>
                    <mu-icon
                      color="pink"
                      class="eye"
                      :size="16"
                      value="thumb_up"
                    ></mu-icon>
                    {{ item.praise }}
                  </span>
                  <span>
                    <mu-icon
                      color="blue"
                      class="eye"
                      :size="16"
                      value="thumb_down"
                    ></mu-icon>
                    {{ item.degrade }}
                  </span>
                  <span>作者：{{ item.auth }}</span>
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider style="margin: 10px 0"></mu-divider>
        </div>
      </mu-list>
    </mu-load-more>
  </div>
</template>
<script>
import TkbHeader from "@/components/tkb/Header";
import TkbFooter from "@/components/tkb/Footer";
import TkbFilter from "@/components/tkb/Filter";

export default {
  name: "books",
  components: {
    TkbHeader,
    TkbFooter,
    TkbFilter,
  },
  data() {
    return {
      list: null,
      refreshing: false,
      loading: false,
      page: 0,
      pageSize: 20,
      total: 0,
      recommendType: "NEW",
      categoryId: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search(keyword) {
      this.getList(keyword);
    },
    onFilter(field, id) {
      this[field] = id;
      this.page = 0;
      this.list = null;
      this.getList();
    },
    async getList(keyword) {
      this.$progress.start();
      let url = `/tkb/novel/list?recommendType=${this.recommendType}&page=${this.page}&pageSize=${this.pageSize}&categoryId=${this.categoryId}`;
      if (keyword) {
        url += `&title=${keyword}`;
      }
      const res = await this.$axios.get(url);

      if (res.data) {
        this.total = res.data.total;
        const result = res.data.content;
        if (this.page === 0) {
          this.list = result;
        } else {
          this.list = this.list.concat(result);
        }
        this.$progress.done();
      }
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.page = 0;
        this.getList();
      }, 2000);
    },
    load() {
      if (this.page * this.pageSize <= this.total) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.page += 1;
          this.getList();
        }, 2000);
      }
    },
    goPictureList(item) {
      this.$router.push({
        name: "pictureList",
        query: {
          batch: item.batch,
          url: item.url,
        },
      });
    },
    goBooksRead(item) {
      this.$router.push({
        name: "booksRead",
        query: {
          batch: item.batch,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.load-more {
  padding-top: 100px;
  padding-bottom: 60px;
  .item {
    margin-bottom: 20px;
    cursor: pointer;
    .sub {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        display: flex;
        align-items: center;
        .eye {
          margin-right: 4px;
        }
      }
    }
    .title {
      padding: 0 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.sub-title {
  font-size: 12px;
  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    span {
      display: flex;
      align-items: center;
    }
  }
}
.item-img {
  width: 1.32rem;
  height: 1.76rem;
  margin-right: 20px;
}
</style>