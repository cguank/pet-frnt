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
          <van-divider>我的问诊</van-divider>
        </van-col>
      </van-row>
    </div>
    <div class="content-list">
      <van-tabs v-model="active" type="card" color="rgb(0, 118, 255)" @change="changeTabs">
        <van-tab title="未完成">
          <van-list
            v-model="loadMoreIncomplete.loading"
            :finished="loadMoreIncomplete.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="onLoadIncomplete"
          >
            <van-card v-for="item in incompleteList" :key="item.id"
                      :desc="item.desc"
                      :thumb="item.thumb"
                      :num="item.msgCount"
                      @click="$router.push({path:'/mycounseldetail', query:{'id':item.id, 'state': 1,'role':expertFlag}})"
            >

            </van-card>
          </van-list>

        </van-tab>
        <van-tab title="已完成">
          <van-list
            v-model="loadMoreComplete.loading"
            :finished="loadMoreComplete.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="onLoadComplete"
          >
            <van-card v-for="item in completeList" :key="item.id"
                      :desc="item.desc"
                      :thumb="item.thumb"
                      :num="item.msgCount"
                      @click="$router.push({path:'/mycounseldetail', query:{'id':item.id,'state': 2,'role':expertFlag}})"
            >
              <van-icon v-if="item.newMsg" name="" dot/>
            </van-card>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Tab, Tabs, Row, Col, Divider, Button, List, Card} from 'vant';
  import { addList } from "@/assets/js/utils";

  Vue.use(Tab).use(Tabs).use(Row).use(Col).use(Divider).use(Button).use(List).use(Card);
  export default {
    name: '',
    data: function () {
      return {
        active: 0,
        inCompleteNewMsg:false,
        completeNewMsg:false,
        currentPageS:1,
        currentPageN:1,
        incompleteList: [/*
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
          },*/
        ],
        loadMoreIncomplete: {
          loading: false,
          finished: false,
        },
        inCompleteNum:0,
        completeList: [
        ],
        completeNum:0,
        loadMoreComplete: {
          loading: false,
          finished: false,
        },
        expertFlag:0,   //1-用户 2-专家
      };
    },
    created() {

    },
    mounted() {
      window.document.getElementsByClassName('van-tabs__nav--card')[0].style.margin = "0";  //tabs没有margin
      window.document.getElementsByClassName('van-tabs__content')[0].style.marginTop = "10px";  //tabs没有margin
    },
    methods: {
      onLoadIncomplete() {
        /*setTimeout(() => {
          this.$getData("judgeExpertOrNot", {
          }).then(res => {
            var data = res.data;
            this.expertFlag = data;
        }, 500);*/
          this.loadMoreIncomplete.loading = true;; //开始加载更多
          let flag = this.$route.query.role;
          this.expertFlag = flag;
          if(flag==1) {
            //console.log("执行用户部分");
            setTimeout(() => {
              this.$getData("onLoadIncomplete", {
                currentPage: this.currentPageS
              }).then(res => {
                var data = res.data.consultationList;
                console.log(data);
                //console.log(data.length);
                this.inCompleteNum = res.data.total;
                this.currentPageS++;
                if (data) {
                  data.map(item => {
                    item.desc = item.symptomDescription;
                    item.thumb = item.headImg;
                    if(item.msgCount>0){
                      this.inCompleteNewMsg = true;
                    }
                  });
                  addList(this.incompleteList, data);
                }
                if (data == null || data.length < 10) {
                  //加载完了
                  this.loadMoreIncomplete.loading = false;
                  this.loadMoreIncomplete.finished = true;
                } else this.loadMoreIncomplete.loading = false;
              });
            }, 100);
          }else{
            //console.log("执行专家部分");
            setTimeout(() => {
              this.$getData("getIncompleteConsultation", {
                currentPage: this.currentPageS
              }).then(res => {
                var data = res.data.counselList;
                console.log(data);
                // console.log(data.length);
                this.inCompleteNum = res.data.total;
                this.currentPageS++;
                if (data) {
                  data.map(item => {
                    item.desc = item.symptomDescription;
                    item.thumb = item.headImg;
                    if(item.msgCount>0){
                      this.inCompleteNewMsg = true;
                    }
                  });
                  addList(this.incompleteList, data);
                }
                if (data == null || data.length < 10) {
                  //加载完了
                  this.loadMoreIncomplete.loading = false;
                  this.loadMoreIncomplete.finished = true;
                } else this.loadMoreIncomplete.loading = false;
              });

            }, 100);
          }
//        });
      },
      onLoadComplete() {
       /* setTimeout(() => {
          this.$getData("judgeExpertOrNot", {
          }).then(res => {
            var data = res.data;
            this.expertFlag = data;

        }, 500);*/
          this.loadMoreComplete.loading = true;; //开始加载更多
          let flag = this.$route.query.role;
          this.expertFlag = flag;
          if(flag==1) {
            setTimeout(() => {
              this.$getData("onLoadComplete", {
                currentPage: this.currentPageN
              }).then(res => {
                var data = res.data.consultationList;
                console.log(data);
                // console.log(data.length);
                this.completeNum = res.data.total;
                this.currentPageN++;
                if (data) {
                  data.map(item => {
                    item.desc = item.symptomDescription;
                    item.thumb = item.headImg;
                    if(item.msgCount>0){
                      this.inCompleteNewMsg = true;
                    }
                  });
                  addList(this.completeList, data);
                }
                if (data == null || data.length < 10) {
                  //加载完了
                  this.loadMoreComplete.loading = false;
                  this.loadMoreComplete.finished = true;
                } else this.loadMoreComplete.loading = false;
              });

            }, 100);
          }else{
            setTimeout(() => {
              this.$getData("getCompleteConsultation", {
                currentPage: this.currentPageN
              }).then(res => {
                var data = res.data.finishedCounselList;
                console.log(data);
                // console.log(data.length);
                this.completeNum = res.data.total;
                this.currentPageN++;
                if (data) {
                  data.map(item => {
                    item.desc = item.symptomDescription;
                    item.thumb = item.headImg;
                    if(item.msgCount>0){
                      this.inCompleteNewMsg = true;
                    }
                  });
                  addList(this.completeList, data);
                }
                if (data == null || data.length < 10) {
                  //加载完了
                  this.loadMoreComplete.loading = false;
                  this.loadMoreComplete.finished = true;
                } else this.loadMoreComplete.loading = false;
              });
            }, 100);
          }
//        });
      },
      changeTabs(name) {
        console.log(name)
      }
    }
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

  .van-divider {
    margin: 2px 0;
  }

  }

  .content-list {

  .van-card__desc {
    font-size: 13px;
    max-height: 60px;
    overflow: hidden;
    white-space: normal;
  }

  .content-list-title {
    font-size: 18px;
    line-height: 35px;
  }

  }
</style>
