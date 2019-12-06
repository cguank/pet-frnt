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
          <van-divider>正文</van-divider>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>

    <div class="content">
      <div class="title">
        <h3>{{detail.title}}</h3>
      </div>
      <div class="editor">
        <van-icon name="manager-o"/>
        <span>编辑:{{detail.editor}}</span>
      </div>
      <div class="key-words">
        <van-icon name="label-o"/>
        <span>{{detail.keyWords}}</span>
      </div>
      <div class="abstract">
        摘要:{{detail.abstract}}
      </div>

      <span class="ql-editor" v-html="detail.text"/>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {Icon, Button, Image, Row, Col, Divider, Card, List, Toast} from 'vant';

  Vue.use(Icon).use(Button).use(Row).use(Col).use(Divider).use(Card).use(List).use(Toast);
  export default {
    name: 'petinfodetail',
    data: function () {
      return {
        detail: {}
      };
    },
    created() {
      window.scrollTo(0,0);
      this.$getData('getPetInfoDetail', {id: this.$route.query.id, from: this.$route.query.from}).then(res => {
        let data  = res.data.getPetInfoDetail;
        console.log(data);
        this.detail = data;

      })
    },
    mounted(){
//      let imgList = [...window.document.getElementsByTagName('img')];
//      let imglist = [...window.document.getElementsByClassName('lazy')]

//      setTimeout(()=> {
//        let imgList = [...window.document.getElementsByTagName('img')];
//        imgList[1].style.maxWidth = '414px';
//        console.log(imgList)
//      }, 500)
//      console.log(window.document.getElementsByTagName('img').length)
    },
    methods: {}
  }
</script>
<style lang="less" >
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

  img {
    background: none !important;
    width: 99% !important;
    height: auto !important;

  }
    padding: 0 10px;

  .title {
    text-align: center;
  }

  .abstract, .editor, .key-words {
    font-size: 15px;
    color: #7d7e80;
    margin: 1px 0;
  }

  }

</style>
