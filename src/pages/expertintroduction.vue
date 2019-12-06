<template>
  <div>
    <div class="top">
      <van-row>
        <van-col span="6" offset="1" @click="$router.go(-1)">
          <a href="#" class="top-left">
            <img src="@/assets/icon/arrow-left1.svg"/>
            返回
          </a>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <h3>{{expertInfo.name}}</h3>
      <van-image
        width="300"
        height="300"
        :src="expertInfo.headImg"
      />
      <div class="expert-intro work-place">
        工作单位:{{expertInfo.workPlace}}
      </div>
      <div class="expert-intro vocation">
        职业:{{expertInfo.vocation}}
      </div>
      <div class="expert-intro professional-title">
        职称:
        <span v-for="item in expertInfo.professionalTitle">
          {{item.title}} <br/>
        </span>
      </div>
      <div class="expert-intro present">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
          现任
        </van-divider>
        <span v-for="item in expertInfo.present">
          {{item.position}} <br/>
        </span>
      </div>
      <div class="expert-intro introduction">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
          简介
        </van-divider>
        {{expertInfo.introduction}}
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Icon, Button, Cell, SwipeItem, Image, Row, Col, Divider, Card, List,} from 'vant';

  Vue.use(Image).use(Icon).use(Button).use(Cell).use(Row).use(Col).use(Divider).use(Card).use(List);
  export default {
    name: '',
    data: function () {
      return {
        expertInfo: {/*
          name: '潘清山',
          headImage: 'sss',
          workPlace: '中国农业大学动物宜选用',
          vocation: '教学临床工作',
          professionalTitle: [
            '中国农业大学动医学院高级兽医',
            '中国农业大学动物医院特许专家'
          ],
          present: [
            '潘石北京动物宜选用老师觉得否定',
            '中国兽医历史会长',
            '中国兽医历史会长发水电费水电费是佛山市地方说的sdlfjsdfjsoifjsofdf',
            '中国兽医历史会长是否大是大非水电费不出现',
            '中国兽医历史会长水电费水电费都是',
          ],
          introduction: '1980年之间熟练度附近搜ID见覅偶像在V型在是杰西卡距离中现金哦给火火地方 ' +
          '例行检查柏给选举偶像哦祭祀的划分类型来看车 傻掉了附件搜ID附件搜if'*/
        }
      };
    },
    created() {
      setTimeout(() => {
        let expertId = this.$route.query.expertId;
        this.$getData("getExpertDetail", {
          expertId: expertId
        }).then(res => {
          var data = res.data.expertDetail;
          this.expertInfo = data;
          console.log(this.expertInfo);

        });

      }, 100);
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
  .top {
    margin: 10px;

  img {
    height: 15px;
  }

  .top-left {
    color: #DDBE8E;
  }

  }

  .content {
    text-align: center;

  .expert-intro {
    margin: 2.5px;
  }

  }
</style>
