<template>
  <div>
    <van-icon name="success" size="80px" class="icon"/>
    <p class="tip">添加成功</p>

    <div style="height: 40px;"></div>
    <p class="return_tip">
      {{this.second}}后自动<input type="button" class="return_mypet" value="返回宠物页面" @click="returnMypet"a/>
    </p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Icon } from 'vant';
  Vue.use(Icon);
  export default {
    name: "addpetsuccess",
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
          this.$router.push('/mypet');
        }
      },
      returnMypet() {
        this.second = -1;
        this.$router.push('/mypet');
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
  .return_mypet {
    color: dodgerblue;
    border: 0;
    background: white;
  }
</style>
