<template>
  <div class="resume">
    <mu-date-picker v-if="isPC" class="pc-date-picker"></mu-date-picker>
    <!-- <mu-button v-if="isPC" class="print-btn" @click="printResume" fab color="info">
      <mu-icon value="cloud_download"></mu-icon>
    </mu-button> -->

    <mu-card raised :class="isPC ? 'card' : 'wap-card'">
      <mu-date-picker v-if="!isPC" class="date-picker"></mu-date-picker>
      <mu-alert v-if="!resume" color="error">
        <div class="no-resume">暂无简历</div>
      </mu-alert>
      <div v-else id="printContent">
        <div class="resume-preview">
          <div
            class="resume-box"
            :style="{ padding: isPC ? '0 50px 45px' : '0 20px' }"
          >
            <div class="resume-item resume-userinfo">
              <div class="item-primary">
                <div class="info-flex">
                  <div class="info-flex-item">
                    <h2 class="name">
                      {{ resume.name }}
                      <svg
                        v-if="resume.gender === '男'"
                        class="icon-svg"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0z"
                          fill="#4BA1F1"
                        />
                        <path
                          d="M638.4 340.352h-69.248a32 32 0 0 1 0-64h178.496v179.712a32 32 0 1 1-64 0v-70.4l-83.008 82.88a192 192 0 1 1-45.248-45.248l83.008-83.008zM353.6 670.4a128 128 0 1 0 181.056-181.056A128 128 0 0 0 353.6 670.4z"
                          fill="#FFF"
                        />
                      </svg>
                      <svg
                        v-if="resume.gender === '女'"
                        class="icon-svg"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          d="M38.39999999999998 512a473.6 473.6 0 1 0 947.2 0 473.6 473.6 0 1 0-947.2 0z"
                          fill="#FF4A55"
                        />
                        <path
                          d="M421.504 647.744l45.248 45.248a32 32 0 0 1-45.248 45.312l-45.248-45.312-45.248 45.312a32 32 0 0 1-45.312-45.312l45.312-45.248-45.312-45.248a32 32 0 0 1 45.312-45.248l45.248 45.248 47.104-47.104a192 192 0 1 1 45.248 45.248l-47.104 47.104zM670.4 353.6a128 128 0 1 0-181.056 181.056A128 128 0 0 0 670.4 353.6z"
                          fill="#FFF"
                        />
                      </svg>
                    </h2>
                    <div class="info-labels">
                      <p :style="{ 'flex-direction': isPC ? 'row' : 'column' }">
                        <span>
                          <i class="fz-resume fz-experience"></i>
                          {{ resume.experience }}年经验
                        </span>
                        <span
                          v-if="resume.education"
                          class="prev-line"
                          :class="{ 'no-line': !isPC }"
                        >
                          <i class="fz-resume fz-degree"></i>
                          {{ resume.education }}
                        </span>
                        <span class="prev-line" :class="{ 'no-line': !isPC }">
                          <i class="fz-resume fz-status"></i>
                          {{ resume.jobStatus }}
                        </span>
                      </p>
                      <p :style="{ 'flex-direction': isPC ? 'row' : 'column' }">
                        <span>
                          <i class="fz-resume fz-tel"></i>
                          {{ resume.mobile }}
                        </span>
                        <span
                          v-if="resume.weChat"
                          class="prev-line"
                          :class="{ 'no-line': !isPC }"
                        >
                          <i class="fz-resume fz-weixin"></i>
                          {{ resume.weChat }}
                        </span>
                        <span class="prev-line" :class="{ 'no-line': !isPC }">
                          <i class="fz-resume fz-mail"></i>
                          {{ resume.email }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="resume.avatar"
                    class="info-flex-item header-upload"
                  >
                    <div class="header-box">
                      <img :src="resume.avatar" class="header-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="resume-item resume-purpose">
              <div class="item-primary">
                <h3 class="title">期望职位 (Expected position)</h3>
                <ul>
                  <li style="padding: 8px 0">
                    <div class="primary-info">
                      <div
                        class="ui-select-inner"
                        :style="{ 'flex-direction': isPC ? 'row' : 'column' }"
                      >
                        <span>
                          <span class="label-text">
                            <i class="fz-resume fz-job"></i>
                            {{ resume.jobName }}
                          </span>
                        </span>
                        <span class="prev-line" :class="{ 'no-line': !isPC }">
                          <i class="fz-resume fz-place"></i>
                          {{ resume.city }}
                        </span>
                        <span class="prev-line" :class="{ 'no-line': !isPC }">
                          <i class="fz-resume fz-salary"></i>
                          {{ resume.salary }}K
                        </span>
                        <span class="prev-line" :class="{ 'no-line': !isPC }">
                          <i class="fz-resume fz-industry"></i>
                          {{ resume.jobType }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="resume.experiences" class="resume-item resume-project">
              <div class="item-primary">
                <h3 class="title">工作经历 (Experience)</h3>
                <ul>
                  <li v-for="(item, index) in resume.experiences" :key="index">
                    <div class="primary-info">
                      <div class="info-text">
                        <h4 class="name">{{ item.companyName }}</h4>
                        <span class="gray period"
                          >{{ item.startTime | filterDate("YYYY-MM-DD") }}至{{
                            item.endTime | filterDate("YYYY-MM-DD")
                          }}</span
                        >
                      </div>
                      <div class="info-text" v-html="item.projectContent"></div>
                      <div class="info-text">
                        <span class="text-type">技术栈：</span>
                        {{ item.technologyStack }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="resume.projectExp" class="resume-item resume-history">
              <div class="item-primary">
                <h3 class="title">项目经历 (Project exp)</h3>
                <ul>
                  <li
                    v-for="(item, index) in resume.projectExp"
                    :key="index"
                    :class="{ active: item.open }"
                  >
                    <div class="primary-info">
                      <div class="info-text">
                        <h4 class="name">{{ item.projectName }}</h4>
                        <span class="gray period"
                          >{{ item.startTime | filterDate("YYYY-MM-DD") }}至{{
                            item.endTime | filterDate("YYYY-MM-DD")
                          }}</span
                        >
                        <mu-button
                          v-if="item.pictures && item.pictures[0].imgUrl"
                          @click="handleView(item)"
                          flat
                          small
                          style="float: right"
                          color="primary"
                          >项目预览</mu-button
                        >
                        <mu-drawer
                          :width="isPC ? '25%' : '75%'"
                          :open.sync="item.open"
                          :docked="false"
                        >
                          <mu-grid-list :cols="1">
                            <div
                              class="modal-img"
                              v-for="item in pictures"
                              :key="item.imgUrl"
                            >
                              <img :src="item.imgUrl" />
                            </div>
                          </mu-grid-list>
                        </mu-drawer>
                      </div>
                      <h4 v-if="item.department || item.department">
                        <span
                          v-if="item.department"
                          class="prev-line no-line"
                          >{{ item.department }}</span
                        >
                        <span
                          v-if="item.job"
                          :class="{ 'prev-line': item.department }"
                          >{{ item.job }}</span
                        >
                      </h4>
                      <div class="info-text">
                        <p class="text-type">项目内容：</p>
                        <div v-html="item.projectDesc"></div>
                      </div>
                      <div class="keywords">
                        <span v-for="sub in item.projectTags" :key="sub">{{
                          sub
                        }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="resume-item resume-summary">
              <div class="item-primary advantage-show">
                <h3 class="title">个人总结 (Summary)</h3>
                <ul>
                  <li>
                    <div class="primary-info">
                      <div class="info-text advantage-text">
                        {{ resume.summary }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mu-card>
  </div>
</template>
<script>
import pdf from "@/utils/pdf";
export default {
  name: "resume",
  components: {},
  data() {
    return {
      resume: null,
      open: false,
      pictures: [],
    };
  },
  mounted() {
    this.getResume();
  },

  methods: {
    handleView(item) {
      this.pictures = item.pictures;
      if (item.open === undefined) {
        this.$set(item, "open", true);
      } else {
        this.$set(item, "open", !item.open);
      }
    },
    async getResume() {
      const res = await this.$axios.get("/about");
      if (res.data) {
        if (res.data.showResume) {
          this.getList();
        } else {
          this.$router.push("/");
        }
      }
    },
    async getList() {
      this.$progress.start();
      const loading = this.$loading();
      const res = await this.$axios.get("/resume");
      if (res.data) {
        this.resume = res.data.list ? res.data.list[0] : null;
        this.$progress.done();
        loading.close();
      }
    },
    async printResume() {
      const res = await this.$confirm("即将下载简历为pdf格式", "提示");
      if (res.result) {
        const result = await pdf(document.getElementById("printContent"));
        result.save(
          `${this.resume.name}的简历-${this.filterDate(
            new Date(),
            "YYYY-MM-DD"
          )}.pdf`
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.no-resume {
  text-align: center;
  width: 100%;
}
.resume {
  color: #414a60;
  font-size: 14px;
  display: flex;
  .pc-date-picker {
    margin-top: 40px;
    height: 400px;
  }
  .card {
    width: 100%;
    max-width: 1000px;
    margin: 40px auto;
    background: #fff;
  }
  .wap-card {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
  }
  .date-picker {
    height: 400px;
    width: 100%;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
  }
  h4 {
    margin-top: 0;
    padding: 0;
  }
}
.prev-line {
  display: inline-block;
  vertical-align: middle;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:before {
    width: 1px;
    height: 12px;
    background-color: #e0e0e0;
    content: "";
    display: inline-block;
    vertical-align: middle;
  }
  &.no-line::before {
    display: none;
  }
}

.fz-resume {
  width: 24px;
  height: 24px;
  background: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-resume.f44cb025.png)
    no-repeat;
  display: inline-block;
  vertical-align: middle;
}

.fz-female {
  background-image: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-sex-woman.d3e2e2ee.png);
}

.fz-female,
.fz-male {
  vertical-align: top;
  background-size: contain;
}

.fz-male {
  background-image: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-sex-man.de536dab.png);
}

.fz-neutral {
  background-image: url(https://static.zhipin.com/zhipin-geek/v231/web/geek-vue/static/images/icons-sex-neutral.78b19ef7.png);
  background-size: contain;
  vertical-align: top;
}

.fz-experience {
  background-position: 4px -477px;
}

.fz-degree {
  background-position: 2px -507px;
}

.fz-status {
  background-position: -26px -477px;
}

.fz-tel {
  background-position: -25px -506px;
}

.fz-mail {
  background-position: 4px -535px;
}

.fz-weixin {
  background-position: -28px -586px;
}
.fz-job {
  background-position: -25px -535px;
}

.fz-salary {
  background-position: 2px -561px;
}

.fz-industry {
  background-position: -26px -561px;
}

.fz-place {
  background-position: 2px -585px;
}
.resume-preview {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.resume-preview .resume-box {
  flex: 1;
  overflow: auto;
  padding: 0 50px 45px;
}

.resume-preview .prev-line {
  max-width: none;
}

.resume-box .prev-line {
  max-width: 250px;
}

.resume-box .prev-line:before {
  margin: 0 26px;
}

.resume-box .item-primary {
  position: relative;
  border-bottom: 1px solid #f2f3f3;
  padding: 26px 0 15px;
  min-height: 114px;
  box-sizing: content-box;
}

.resume-box .item-primary .name {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 0;
}

.resume-box .item-primary .name i {
  margin-top: -5px;
  margin-left: 5px;
  vertical-align: middle;
}

.resume-box .item-primary .name .icon-svg {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.resume-box .item-primary .title {
  position: relative;
  padding-left: 12px;
  font-size: 18px;
  font-weight: 400;
}

.resume-box .item-primary .title:before {
  content: "";
  position: absolute;
  width: 3px;
  height: 14px;
  border-radius: 10px;
  background-color: #00e676;
  left: 0;
  top: 5px;
}

.resume-box .item-primary .title .label-text {
  display: inline-block;
  vertical-align: middle;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resume-box .item-primary .info-labels p {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.resume-box .item-primary ul {
  margin-top: 10px;
  margin-bottom: 2px;
}

.resume-box .item-primary li {
  padding: 8px 0 8px 15px;
  position: relative;
  min-height: 40px;
}

.resume-box .item-primary li:hover {
  background-color: #f2f5f9;
  transition: all 0.15s linear;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
}
.resume-box .item-primary li.active {
  background-color: #f2f5f9;
  transition: all 0.15s linear;
}

.resume-box .item-primary li .info-labels {
  margin-left: -8px;
}

.resume-box .item-primary li .primary-info h4 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 0;
}

.resume-box .item-primary li .primary-info h4.name {
  max-width: 420px;
  word-break: break-all;
  float: left;
  color: #414a60;
}

.resume-box .item-primary li .primary-info h4.name + .period {
  font-size: 12px;
  padding-left: 30px;
  float: left;
  position: relative;
  top: 2px;
}

.resume-box .item-primary li .primary-info .info-text {
  padding: 7px 0;
  color: #61687c;
  white-space: pre-wrap;
  overflow: hidden;
  word-break: break-all;
}

.resume-box .item-primary li .primary-info .info-text:last-of-type {
  padding-bottom: 0;
}

.resume-box .item-primary li .primary-info .info-text .text-type {
  font-weight: 700;
}

.resume-box .item-primary li .primary-info .info-text.advantage-text {
  padding-top: 0;
}

.resume-box .item-primary li .primary-info .keywords {
  padding: 7px 0 5px;
}
.resume-box .item-primary li .primary-info .ui-select-inner {
  display: flex;
  flex-direction: column;
}
.resume-box .item-primary li .primary-info .keywords span {
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
  color: #9fa3b0;
  padding: 0 14px;
  margin-right: 10px;
  border: 1px solid #cfd1d7;
  border-radius: 50px;
  margin-bottom: 10px;
}

.resume-box .avatar-upload {
  position: absolute;
  right: 40px;
  top: 70px;
  z-index: 1;
}

.resume-box .resume-baseinfo .item-primary {
  padding-right: 80px;
}

.resume-box .resume-baseinfo .info-labels .prev-line:before {
  margin: 0 20px;
}

.resume-box .resume-advantage .item-primary li .op {
  display: block;
}

.resume-box .expectation-form .short {
  max-width: 140px;
}

.resume-box .info-flex {
  display: flex;
}

.resume-box .info-flex-item {
  flex: 1;
}

.resume-box .header-upload {
  width: 70px;
  height: 70px;
  margin-top: 5px;
  flex: none;
  position: relative;
  .header-img {
    border-radius: 50%;
  }
}
.modal-img {
  display: block;
  padding-top: 40px;
  background: #ccc;
  img {
    vertical-align: middle;
  }
}

.print-btn {
  position: fixed;
  left: 310px;
  bottom: 20px;
}

@media print {
  ul,
  li {
    list-style: none;
  }
}
</style>
