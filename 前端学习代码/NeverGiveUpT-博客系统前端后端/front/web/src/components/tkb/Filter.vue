<template>
  <div>
    <!-- 顶部筛选 -->
    <mu-row class="filter">
      <mu-col>
        <mu-button
          ref="categoryRef"
          @click="openCategory = true"
          class="filter-nav"
          >分类
          <span v-show="categoryName">-{{ categoryName }}</span>
        </mu-button></mu-col
      >
      <mu-col v-show="type && type === 'VIDEO'">
        <mu-button ref="labelRef" @click="openLabel = true" class="filter-nav"
          >标签
          <span v-show="labelName">-{{ labelName }}</span>
        </mu-button></mu-col
      >
      <mu-col>
        <mu-button ref="sortRef" @click="openSort = true" class="filter-nav">
          {{ fil ? "罩杯" : "排序" }}
          <span v-show="recommendName">-{{ recommendName }}</span>
        </mu-button></mu-col
      >
    </mu-row>

    <!-- 分类下拉 -->
    <mu-popover :open.sync="openCategory" :trigger="triggerCategory">
      <mu-list>
        <mu-list-item
          @click="clickFilter(item, 'categoryId', 'categoryName')"
          button
          v-for="item in categoryList"
          :key="item.id"
        >
          <mu-list-item-title
            :style="{ color: categoryId === item.id ? '#00e676' : '' }"
            >{{ item.name }}</mu-list-item-title
          >
        </mu-list-item>
      </mu-list>
    </mu-popover>

    <!-- 标签下拉 -->
    <mu-popover :open.sync="openLabel" :trigger="triggerLabel">
      <mu-list>
        <mu-list-item
          @click="clickFilter(item, 'labelId', 'labelName')"
          button
          v-for="item in labelList"
          :key="item.id"
        >
          <mu-list-item-title
            :style="{ color: labelId === item.id ? '#00e676' : '' }"
            >{{ item.name }}</mu-list-item-title
          >
        </mu-list-item>
      </mu-list>
    </mu-popover>

    <!-- 排序下拉 -->
    <mu-popover :open.sync="openSort" :trigger="triggerSort">
      <mu-list>
        <mu-list-item
          @click="clickFilter(item, 'recommendType', 'recommendName')"
          button
          v-for="item in sortList"
          :key="item.id"
        >
          <mu-list-item-title
            :style="{ color: recommendType === item.id ? '#00e676' : '' }"
            >{{ item.name }}</mu-list-item-title
          >
        </mu-list-item>
      </mu-list>
    </mu-popover>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "ALBUM",
    },
    fil: {
      type: String,
    },
  },
  data() {
    return {
      openLabel: false,
      triggerLabel: null,
      labelList: [],
      labelId: "",
      labelName: "",

      openCategory: false,
      triggerCategory: null,
      triggerSort: null,
      openSort: false,
      categoryList: [],
      categoryId: null,
      categoryName: "",
      recommendType: "",
      recommendName: "",
      sortList: [
        {
          id: "NEW",
          name: "最新",
        },
        {
          id: "HOT",
          name: "最热",
        },
        {
          id: "MOST_PLAY",
          name: "推荐",
        },
      ],
    };
  },
  mounted() {
    this.triggerCategory = this.$refs.categoryRef.$el;
    this.triggerSort = this.$refs.sortRef.$el;
    this.triggerLabel = this.$refs.labelRef.$el;
    if (this.fil && this.fil === "stars") {
      this.categoryList = [
        {
          id: "",
          name: "全部",
        },
        {
          id: "JK",
          name: "日韩女优",
        },
        {
          id: "EA",
          name: "欧美女星",
        },
      ];
      this.sortList = [this.categoryList[0]];
      for (let i = 65; i < 73; i++) {
        const id = String.fromCharCode(i);
        this.sortList.push({
          id,
          name: id + "罩杯",
        });
      }
    } else {
      this.getCategory();
      if (this.type === "VIDEO") {
        this.getLabels();
      }
    }
  },
  methods: {
    async getCategory() {
      const res = await this.$axios.get(`/tkb/category?type=${this.type}`);
      this.categoryList = res.data;
      this.categoryList.unshift({
        id: "",
        name: "全部",
      });
    },
    async getLabels() {
      const res = await this.$axios.get(`/tkb/labels?type=${this.type}`);
      this.labelList = res.data;
      this.labelList.unshift({
        id: "",
        name: "全部",
      });
    },
    clickFilter(item, field, fieldName) {
      this[field] = item.id;
      this[fieldName] = item.name;
      this.openSort = false;
      this.openCategory = false;
      this.openLabel = false;
      this.$emit("onFilter", field, item.id);
    },
  },
};
</script>
<style lang="less" scoped>
.filter {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  z-index: 1;
  .filter-nav {
    width: 100%;
  }
}
</style>