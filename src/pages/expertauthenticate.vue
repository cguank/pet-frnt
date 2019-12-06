<template>
  <div>
    <van-nav-bar
      title="专家认证"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="authenticate_card_block">
      <div class="authenticate_card" @click="gotoAuthenticate">
        <div class="authenticate_img_block">
          <img v-bind:src="this.medal_img" class="authenticate_img"/>
          <div class="authenticate_text_1">专家认证</div>
          <div class="authenticate_text_2">宠物专家认证通道</div>
          <div class="unauthenticated_text" v-if="expert_authenticated == false && expert_authenticating==false">
            <div style="color: rgb(139, 139, 139); font-size: 14px; font-weight: bold">未认证</div>
            <div style="color: rgb(224,132,75); margin-top: 5px; font-size: 12px;">点击前往认证申请</div>
          </div>
          <div class="authenticating_text" v-if="expert_authenticated == false && expert_authenticating==true">审核中</div>
          <div class="authenticated_text" v-if="expert_authenticated == true">已认证</div>
        </div>
      </div>
    </div>

    <div style="margin-top: 130px; margin-left: 25px;">
      <div style="font-size: 14px; color:#555555; font-weight: bold;">认证说明</div>
      <div style="font-size: 12px; color:#777777;  margin-top: 10px; margin-left: 10px;">✦ 为宠物专家量身打造的认证通道</div>
      <div style="font-size: 12px; color:#777777;  margin-top: 5px;  margin-left: 10px;">✦ 鼓励实现科学养宠、文明养宠</div>
      <div style="font-size: 12px; color:#777777;  margin-top: 5px;  margin-left: 10px;">✦ 认证成功后更有丰富特权与奖励</div>
      <div style="font-size: 12px; color:#999999; margin-top: 10px;">欢迎加入助力科学养宠的队伍！</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast } from 'vant';

  Vue.use(NavBar).use(Toast);
  export default {
    name: "expertauthenticate",
    data() {
      return {
        medal_img:'./static/images/medal.png',
        expert_authenticated: false,
        expert_authenticating: false,
      }
    },
    methods: {
      onClickLeft() {
        // Toast('返回');
        this.$router.go(-1);
      },
      gotoAuthenticate() {
        // Toast('前往专家注册');
        this.$router.push({path:'/authenticate', query:{flag1:this.$route.query.flag1, flag2:this.$route.query.flag2}});
      }
    }
  }
</script>

<style scoped>
  .authenticate_card_block {
    margin: 0 auto;
    width: 85%;
    height: 150px;
  }

  .authenticate_card {
    height: 260px;
    margin-top: 10px;
    box-shadow: 0px 5px 5px rgba(180, 113, 0, 0.65);
    border: dimgrey;
  }

  .authenticate_img_block {
    height: 120px;
    width: 120px;
    margin: 0 auto;
    text-align: center;
  }

  .authenticate_img {
    height: 120px;
    width: 120px;
    margin-top: 20px;
  }

  .authenticate_text_1 {
    margin-top: 10px;
    font-size: 16px;
    color: #b06400;
    font-weight: bold;
  }

  .authenticate_text_2 {
    margin-top: 10px;
    font-size: 12px;
    color: rgb(139, 139, 139);
  }

  .unauthenticated_text {
    margin-top: 10px;
  }

  .authenticating_text {
    margin-top: 10px;
    font-size: 12px;
    color: rgb(55, 157, 187);
  }

  .authenticated_text {
    margin-top: 10px;
    font-size: 12px;
    color: rgb(224, 156, 0);
  }
</style>
