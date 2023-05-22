<template>
  <div class="right-config">
    <mu-card class="slider-card">
      <mu-avatar class="avatar" size="100">
        <img v-lazy="avatar" alt />
      </mu-avatar>
      <div class="title">NeverGiveUpT</div>
      <div class="desc">专注于WEB和移动前端开发</div>
      <div class="tags">
        <mu-chip class="chip">Vue</mu-chip>
        <mu-chip class="chip">React</mu-chip>
        <mu-chip class="chip">4年开发经验</mu-chip>
      </div>
      <div class="friend-link-box">
        <p class="friend-link-title">友情链接</p>
        <div class="friend-links">
          <mu-button class="link" fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/github.png" alt />
            </mu-avatar>
          </mu-button>
          <mu-button class="link" fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/sf.jpeg" alt />
            </mu-avatar>
          </mu-button>
          <mu-button class="link" fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/zhihu.jpg" alt />
            </mu-avatar>
          </mu-button>
        </div>
      </div>
    </mu-card>

    <mu-card class="slider-card card-ad">
      <div class="ad">广告</div>
      <mu-carousel style="height: 120px" hide-controls>
        <mu-carousel-item>
          <img
            style="width: 100%; cursor: pointer"
            src="https://img.alicdn.com/tfs/TB1v0eeB4z1gK0jSZSgXXavwpXa-2880-574.png"
          />
        </mu-carousel-item>
      </mu-carousel>
    </mu-card>

    <mu-card class="slider-card">
      <div class="friend-link-box">
        <p class="friend-link-title">电影推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">唐人街探案3</mu-chip>
          </div>
        </div>
      </div>

      <div class="friend-link-box">
        <p class="friend-link-title">电视剧推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">赘婿</mu-chip>
          </div>
        </div>
      </div>

      <div class="friend-link-box">
        <p class="friend-link-title">音乐推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">半生雪</mu-chip>
          </div>
        </div>
      </div>
    </mu-card>

    <mu-card class="slider-card card-ad">
      <img src="http://www.nevergiveupt.top/qianduanxiaokezhan.png" alt="" />
    </mu-card>
  </div>
</template>
<script>
export default {
  props: {
    showPosition: {
      type: String,
    },
  },
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.right-config {
  width: 4rem;
}
.slider-card {
  position: relative;
  margin-top: 16px;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
  .avatar {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }
  .title {
    font-size: 20px;
    color: #00e676;
  }
  .desc {
    font-size: 14px;
    margin: 10px 0;
  }
  .tags {
    .chip {
      margin: 0 10px 10px 0;
    }
  }
  .friend-link-box {
    .friend-link-title {
      position: relative;
      &::before {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .friend-links {
      display: flex;
      justify-content: space-around;
    }
  }
  .ad {
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 8px;
    font-size: 12px;
  }
}
.card-ad {
  padding: 8px;
}
</style>