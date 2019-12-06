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
        <van-col span="6" offset="2">
          <van-divider>专家列表</van-divider>
        </van-col>
        <router-link :to="{path:'/mycounsel', query: {role:role}}">
          <van-col span="6" offset="2">
            <a href="#" class="top-right">
              我的问诊
              <img src="@/assets/icon/arrow-right.svg"/>
              <van-icon v-if="newMsg" name="" dot/>
            </a>
          </van-col>
        </router-link>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>

    <div class="content-list">
      <van-list
        v-model="loadMore.loading"
        :finished="loadMore.finished"
        :offset="5"
        finished-text="没有更多了"
        @load="getExpertList"
      >
        <van-card v-for="item in expertList" :key="item.id"
                  :desc="item.introduction"
                  :thumb="item.thumb"
        >
          <div slot="title" class="content-list-title">
            <van-row>
              <van-col span="12">{{item.expertName}}</van-col>
              <van-col span="12">
                <router-link :to="{path:'/expertintroduction',query: {expertId: item.id}}">
                  <van-button plain type="info" size="mini">查看</van-button>
                </router-link>

                <router-link :to="{path:'/counsel',query: {expertId: item.id,role:role}}">
                  <van-button plain type="info" size="mini">咨询</van-button>
                </router-link>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24"><span class="content-list-expertTitles">职称:{{item.expertTitles}}</span> </van-col>
            </van-row>
          </div>
        </van-card>
      </van-list>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {Icon, Button, Cell, SwipeItem, Image, Row, Col, Divider, Card, List,} from 'vant';
  import { addList } from "@/assets/js/utils";

  Vue.use(Icon).use(Button).use(Cell).use(Row).use(Col).use(Divider).use(Card).use(List);
  export default {

    name: '',
    data: function () {
      return {
        newMsg: false, //我的问诊有新消息
        role:0, //1-用户 2-专家
        currentPage:1,
        expertNum:0,
        expertList: [],/*[
          {
            id: 1,
            thumb: './static/images/head1.jpeg',
            title: '潘清山',
            desc: '路口见谁都if靳绥东if骄傲手动i水电费水电费水电费水电费水电费水电费盛世嫡妃水电费f接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
          }, {
            id: 1,
            thumb: './static/images/head2.jpeg',
            title: '流浪',
            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
          }, {
            id: 1,
            thumb: './static/images/head3.jpeg',
            title: '邓丽欣',
            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
          }, {
            id: 1,
            thumb: './static/images/head4.jpeg',
            title: '狗狗聪',
            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
          },
        ],*/
        loadMore: {
          loading: false,
          finished: false,
        }
      };
    },
    created() {
      //判断当前是专家还是用户
      setTimeout(() => {
        this.$getData("judgeExpertOrNot", {
        }).then(res => {
          var data = res.data;
          this.role = data;
          //判读当前有无未读的问诊回复or追问消息
          setTimeout(() => {
            this.$getData("haveCounselMsgNotRead", {
              role:data
            }).then(res => {
              var data = res.data;
              if(data==1){
                this.newMsg = true;
              }else{
                this.newMsg = false;
              }
            });
          }, 100);
        });
      }, 100);
    },
    methods: {
      onLoad() {
        this.loadMore.loading = true;

        // 异步更新数据
        setTimeout(() => {
//          this.$getData('', {}).then(res => {
//            console.log(res.data);
//          });
          this.loadMore.finished = true;

        }, 500);
      },
      //获取专家列表
      getExpertList: function() {
        this.loadMore.loading = true;//开始加载更多
        setTimeout(() => {
          this.$getData("getExpertList", {
            currentPage: this.currentPage
          }).then(res => {
            var data = res.data.expertList;
            console.log(data)
            this.expertNum = res.data.total;
            this.currentPage++;
            if (data) {
              data.map(item => {
                item.expertId = item.id;
                item.desc = item.introduction;
                item.name = item.expertName;
                //console.log(item.name);
                item.thumb = item.headImg;
              });
              addList(this.expertList, data);
            }
            if (data == null || data.length < 10) {
              //加载完了
              this.loadMore.loading = false;
              this.loadMore.finished = true;
            } else this.loadMore.loading = false;
          });

        }, 100);
      },
    }
  }
</script>
<style lang="less" scoped>
  .top {
    margin: 10px;

  .van-info--dot {
    top: -14px;
  }

  img {
    height: 15px;
  }

  .van-divider {
    margin: 2px 0;
  }

  .top-right {
    color: #DDBE8E;
  }

  .top-left {
    color: #DDBE8E;
  }

  }

  .content-list {

  .van-card__desc {
    font-size: 13px;
    max-height: 60px;
    overflow: hidden;
    white-space: nowrap;
  }

  .content-list-title {
    font-size: 18px;
    line-height: 35px;

    .content-list-expertTitles {
      font-size: 14px;
    }
  }

  }
</style>
