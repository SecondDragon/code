<template>
  <div class="right-config">
    <mu-card v-if="!hideIntroduction" class="slider-card">
      <mu-avatar class="avatar" size="100">
        <img v-lazy="avatar" alt />
      </mu-avatar>
      <div class="title">{{introduction.nickName}}</div>
      <div class="desc">{{introduction.desc}}</div>
      <div class="tags">
        <mu-chip
          class="chip"
          v-for="item in tagsArr"
          :key="item.name"
          :color="item.color"
        >{{item.name}}</mu-chip>
      </div>
      <div class="friend-link-box">
        <p class="friend-link-title">友情链接</p>
        <div class="friend-links">
          <mu-button
            v-for="item in links"
            :key="item.icon"
            fab
            small
            :color="item.color"
            @click="goLink(item)"
          >
            <mu-avatar size="40">
              <img :src="item.icon" alt />
            </mu-avatar>
          </mu-button>
        </div>
      </div>
    </mu-card>

    <mu-card v-if="!hideAd && ad" class="slider-card card-ad">
      <div class="ad">广告</div>
      <mu-carousel style="height:120px" hide-controls>
        <mu-carousel-item v-for="item in ad.imgs" :key="item._id">
          <img style="width:100%;cursor:pointer;" v-lazy="item.imgUrl" @click="goLink(item)" />
        </mu-carousel-item>
      </mu-carousel>
    </mu-card>

    <mu-card
      v-if="suggest.movie.length > 0 || suggest.teleplay.length > 0 || suggest.music.length > 0"
      class="slider-card"
    >
      <div v-if="suggest.movie.length > 0" class="friend-link-box">
        <p class="friend-link-title">电影推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip
              class="chip"
              v-for="item in suggest.movie"
              :key="item.name"
              :color="item.color"
              @click="goLink(item)"
            >{{item.name}}</mu-chip>
          </div>
        </div>
      </div>

      <div v-if="suggest.teleplay.length > 0" class="friend-link-box">
        <p class="friend-link-title">电视剧推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip
              class="chip"
              v-for="item in suggest.teleplay"
              :key="item.name"
              :color="item.color"
              @click="goLink(item)"
            >{{item.name}}</mu-chip>
          </div>
        </div>
      </div>

      <div v-if="suggest.music.length > 0" class="friend-link-box">
        <p class="friend-link-title">音乐推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip
              class="chip"
              v-for="item in suggest.music"
              :key="item.name"
              :color="item.color"
              @click="goLink(item)"
            >{{item.name}}</mu-chip>
          </div>
        </div>
      </div>
    </mu-card>

    <!-- <mu-card class="slider-card card-ad">
      <img src="http://www.nevergiveupt.top/qianduanxiaokezhan.png" alt="">
    </mu-card> -->

  </div>
</template>
<script>
import { randomColor, Icon } from "@/utils";
export default {
  props: {
    showPosition: {
      type: String
    }
  },
  computed: {
    tagsArr() {
      return this.introduction.tags
        ? this.introduction.tags.map(item => {
            return {
              name: item,
              color: randomColor()
            };
          })
        : [];
    },
    links() {
      return this.introduction.friendLink
        ? this.introduction.friendLink.map(item => {
            return {
              ...item,
              color: randomColor(),
              icon: Icon[item.icon]
            };
          })
        : [];
    },
    suggest() {
      if (!this.recommend) {
        return {
          music: [],
          movie: [],
          teleplay: []
        };
      } else {
        const data = this.recommend.map(item => {
          return {
            ...item,
            color: randomColor()
          };
        });
        return {
          movie: data.filter(
            item =>
              item.project === "1" &&
              item.showPosition.includes(this.showPosition)
          ),
          teleplay: data.filter(
            item =>
              item.project === "2" &&
              item.showPosition.includes(this.showPosition)
          ),
          music: data.filter(
            item =>
              item.project === "3" &&
              item.showPosition.includes(this.showPosition)
          )
        };
      }
    }
  },
  data() {
    return {
      avatar: this.avatar,
      ad: {},
      introduction: {},
      recommend: [],
      hideAd: false,
      hideIntroduction: false,
      hideRecommend: false
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const res = await this.$axios.get("/rightConfig");
      if (res.data) {
        this.ad = res.data.ad ;
        this.introduction = res.data.introduction;
        this.recommend = res.data.recommend;

        this.hideAd = this.ad && !this.ad.showPosition.includes(this.showPosition);
        this.hideIntroduction = !this.introduction.showPosition.includes(
          this.showPosition
        );
      }
    },
    goLink(item) {
      window.open(item.link);
    }
  }
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