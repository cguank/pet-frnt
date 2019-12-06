<template>
  <div>
    <van-icon name="success" size="80px" class="icon"/>
    <p class="tip">注册成功</p>

    <div style="height: 40px;"></div>
    <p class="return_tip">
      {{this.second}}后自动<input type="button" class="return_login" value="返回登录界面" @click="returnLogin"a/>
    </p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Icon } from 'vant';
  Vue.use(Icon);
  export default {
    name: "registersuccess",
    data() {
      return {
        second: 5, // 倒计时自动返回登录页 5s
      }
    },
    methods: {
      CheckTime() {
        if(this.second > 0){ this.second--; }
        if(this.second == 0){
          this.second--;
          this.$router.push('/login');
        }
      },
      returnLogin() {
        this.second = -1;
        this.$router.push('/login');
      }
    },
    mounted() {
      setInterval(this.CheckTime, 1000);
    }
  }
</script>

<style scoped>
  .icon {
    margin-top: 150px;
    margin-left: 42%;
  }
  .tip {
    color: dimgrey;
    text-align: center;
    font-size: 20px;
  }
  .return_tip {
    color: dimgrey;
    text-align: center;
    font-size: 14px;
  }
  .return_login {
    color: dodgerblue;
    border: 0;
    background: white;
  }
</style>
