<template>
  <div>
    <div class="top-swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in swipeImgList" :key="index">
          <van-image
            height="150"
            :width="screen.width"
            :src="image"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="top-content">
      <van-row>
        <router-link to="/expertlist">
          <van-col span="24">
            <van-image
              height="120"
              width="auto"
              :src="display.displayLeft"
            />
            <h2 class="top-content-title-left" :style="topContentTitle">专家诊断</h2>
          </van-col>
        </router-link>

        <!--<van-col span="12">-->
          <!--<van-image-->
            <!--height="120"-->
            <!--width="auto"-->
            <!--:src="display.displayRight"-->
          <!--/>-->
          <!--<h2 class="top-content-title-right" :style="topContentTitle">专家会诊</h2>-->
        <!--</van-col>-->
      </van-row>
      <van-row>
        <router-link to="/selfservice">
          <van-col span="24">
            <van-image
              height="120"
              width="auto"
              :src="display.displayBottom"
            />
            <h2 class="top-content-title-bottom" :style="topContentTitleBottom">自助诊断</h2>
          </van-col>
        </router-link>
      </van-row>
    </div>
    <div class="content">
      <van-divider>宠物疾病</van-divider>
      <div class="content-list">
        <van-list
          v-model="loadMore.loading"
          :finished="loadMore.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="getPetInfoList"
        >
          <van-card v-for="item in petInfoList"
                    :key="item.id"
                    :title="item.title"
                    :thumb="item.cover"
                    @click="$router.push({'path':'/petinfodetail',query:{'id':item.id, 'from': 1}})"
          >
            <div slot="desc">
              <div class="editor">
                <van-icon name="manager-o"/>
                <span>编辑:{{item.editor}}</span>
              </div>
              <div class="desc-content">
                {{item.abstract}}
              </div>
              <div class="label">
                <van-icon name="label-o"/>
                <span>{{item.keyWords}}</span>
              </div>
            </div>
          </van-card>
          <!--<van-card v-for="item in diseaseList" :key="item.id"-->
                    <!--:desc="item.desc"-->
                    <!--:title="item.title"-->
                    <!--:thumb="item.thumb"-->
          <!--/>-->
        </van-list>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Swipe, SwipeItem, Image, Row, Col, Divider, Card, List, Icon} from 'vant';

  Vue.use(Swipe).use(SwipeItem).use(Image).use(Row).use(Col).use(Divider).use(Card).use(List).use(Icon);

  import { addList } from '@/assets/js/utils'
  export default {
    name: '',
    data: function () {
      return {
        topContentTitle: {  //设置专家会诊的高度
          top: '20%'
        },
        topContentTitleBottom: {  //设置自主诊断高度
          top: '30%'
        },
        screen: {
          width: document.body.clientWidth - 20
        },
        swipeImgList: [
//          './static/images/lunbo.png',
//          './static/images/recipe1.png',
//          './static/images/food5.png'
        ],
        display: {
          displayLeft: './static/images/zjzd.jpg',
          displayRight: './static/images/zjhz.jpg',
          displayBottom: './static/images/zzzd.png',
        },
        petInfoList: [
//          {
//            id: 1,
//            cover: './static/images/head1.jpeg',
//            title: '狗狗聪明粘人,也会得抑郁症',
//            editor: '就搜到',
//            abstract: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货',
//            keyWords: 'sdfs klsdjf sld'
//          },
//          {
//            id: 1,
//            thumb: './static/images/head1.jpeg',
//            title: '狗狗聪明粘人,也会得抑郁症',
//            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
//          }, {
//            id: 1,
//            thumb: './static/images/head2.jpeg',
//            title: '狗狗聪明粘人,也会得抑郁症',
//            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
//          }, {
//            id: 1,
//            thumb: './static/images/head3.jpeg',
//            title: '狗狗聪明粘人,也会得抑郁症',
//            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
//          }, {
//            id: 1,
//            thumb: './static/images/head4.jpeg',
//            title: '狗狗聪明粘人,也会得抑郁症',
//            desc: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货'
//          },
        ],
        query: {
          currentPage: 1,
          from: 1
        },
        loadMore: {
          loading: false,
          finished: false,
        }
      };
    },
    created() {
      let height = window.screen.availHeight;
      this.topContentTitle.top = 150 / height * 100 + 7 + '%';
      this.topContentTitleBottom.top = 270 / height * 100 + 7 + '%';

      this.getAdvertiseImgList();
      this.getPetInfoList();
    },
    methods: {
      getAdvertiseImgList(){
        this.$getData('getAdvertiseImgList', {tag: 0}).then(res => {
          let data =res.data.advertiseImgList;
          data.map(item => {
            if(item.enable) this.swipeImgList.push(item.banner);
          });
         // console.log(this.swipeImgList);
        })
      },
      getPetInfoList (){
        this.loadMore.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getpetinfolist', {currentPage: this.query.currentPage, from: 1}).then(res => {
           // console.log(res.data);
            let data = res.data.getPetInfoList;
            addList(this.petInfoList,data);
            this.query.currentPage++;


            if(data == null || data.length<10){
              this.loadMore.finished = true;
            }
            this.loadMore.loading = false;
          })
        }, 500);

      }
    }
  }
</script>

<style lang="less" scoped>
  .top-swipe {
    height: 150px;
    text-align: center;

  .van-swipe {
    background: #414141;
  }

  }

  .top-content {
    margin-top: 5px;
    padding: 0 3px;
  .top-content-title-left {
    position: absolute;
    top: 28%;
    color: black;
    left: 40%;
  }

  .top-content-title-right {
    position: absolute;
    top: 28%;
    color: black;
    right: 15%;
  }

  .top-content-title-bottom {
    position: absolute;
    top: 28%;
    color: black;
    right: 40%;
  }

  }

  .content {
  .van-card__title {
    font-size: 18px;
    line-height: 32px;
  }

  .editor {
    font-size: 14px;
    color: #7d7e80;
  }

  .desc-content {
    font-size: 15px;
    margin: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .label {
    font-size: 14px;
    color: #7d7e80;
  }
  /*.van-card__title {*/
    /*font-size: 18px;*/
    /*line-height: 32px;*/
  /*}*/

  /*.van-card__desc {*/
    /*font-size: 16px;*/
    /*word-break: break-all;*/
    /*max-height: 44px;*/
    /*line-height: 22px;*/
    /*display: -webkit-box;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 2;*/
    /*overflow: hidden;*/

    /*white-space: normal;*/

  /*}*/

  }
</style>
