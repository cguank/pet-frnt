<template>
  <div>
    <van-icon name="success" size="80px" class="icon"/>
    <p class="tip">提交成功</p>

    <div style="height: 40px;"></div>
    <p class="return_tip">
      {{this.second}}后自动<input type="button" class="return_usercenter" value="返回个人中心" @click="returnUsercenter"a/>
    </p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Icon } from 'vant';
  Vue.use(Icon);
  export default {
    name: "authenticatesendsuccess",
    data() {
      return {
        second: 5, // 倒计时自动返回个人中心 5s
      }
    },
    methods: {
      CheckTime() {
        if(this.second > 0){ this.second--; }
        if(this.second == 0){
          this.second--;
          this.$router.push('/usercenter');
        }
      },
      returnUsercenter() {
        this.second = -1;
        this.$router.push('/usercenter');
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
  .return_usercenter {
    color: dodgerblue;
    border: 0;
    background: white;
  }
</style>
