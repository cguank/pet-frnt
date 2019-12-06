<template>
  <div>
    <div class="top">
      <van-row>
        <!--<van-col span="6" offset="1" @click="$router.go(-1)">-->
          <!--<a href="#" class="top-left">-->
            <!--<img src="@/assets/icon/arrow-left1.svg"/>-->
            <!--返回-->
          <!--</a>-->
        <!--</van-col>-->
        <van-col span="6" offset="9">
          <van-divider>宠资讯</van-divider>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>
    <div class="content">
      <div class="select">
        <van-field v-model="value" @click="show=true" placeholder="资讯分类"/>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect"/>
      </div>
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
                    @click="$router.push({'path':'/petinfodetail',query:{'id':item.id}})"
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
        </van-list>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Icon, Button, Image, Row, Col, Divider, Card, List, Toast, ActionSheet, Field} from 'vant';

  Vue.use(Icon).use(Button).use(Row).use(Col).use(Divider).use(Card).use(List).use(Toast).use(ActionSheet).use(Field);

  import { addList } from '@/assets/js/utils'
  export default {
    name: 'petinfo',
    data: function () {
      return {
        show: false,
        actions: [
          {name: '不限'},
          {name: '宠物新闻资讯'},
          {name: '宠物休闲'}
        ],
        value: '',
        petInfoList: [
//          {
//            id: 1,
//            cover: './static/images/head1.jpeg',
//            title: '狗狗聪明粘人,也会得抑郁症',
//            editor: '就搜到',
//            abstract: '路口见谁都if靳绥东if骄傲手动if接收到你复读机删掉粉红系小欧一参加哦次发生的哈佛is的哈佛 欧式的回复搜你发货',
//            keyWords: 'sdfs klsdjf sld'
//          }
          ],
        loadMore: {
          loading: false,
          finished: false,
        },
        query: {
          currentPage: 1,
          key: '' //空代表不限
        }
      };
    },
    beforeRouteLeave(to,from,next){
      if(to.path !== '/petinfodetail'){
        this.$route.meta.keepAlive = false;
      }else  this.$route.meta.keepAlive = true;
      next();
    },
    created() {
      this.getPetInfoList();
    },
    mounted() {
      window.document.getElementsByClassName('van-field__control')[0].style.backgroundColor = 'rgba(25, 137, 250, 0.08)'
    },
    methods: {
      onSelect(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        this.show = false;
        this.value  = item.name;
        if(this.value == '宠物新闻资讯')this.query.key = 1;
        else if(this.value  == '不限') this.query.key = '';
        else this.query.key = 2;

        this.petInfoList = [];
        this.getPetInfoList();
        Toast(item.name);
      },
      getPetInfoList (){
        this.loadMore.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getpetinfolist', {currentPage: this.query.currentPage, key: this.query.key}).then(res => {
            console.log(res.data);
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

  }
</style>
