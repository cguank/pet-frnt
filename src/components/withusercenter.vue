<template>
  <div>
    <div class="router-view">
      <keep-alive :include="includes">
        <router-view />
      </keep-alive>

      <!--<keep-alive >-->
        <!--<router-view v-if="$route.meta.keepAlive" />-->
      <!--</keep-alive>-->
      <!--<router-view v-if="!$route.meta.keepAlive" />-->
    </div>
    <div class="user-center" v-if="isShow()">
      <van-tabbar
        safe-area-inset-bottom
        v-model="active">
        <van-tabbar-item
          replace
          to="/home"
          icon="star"
        >
          宠病通
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/forum"
          icon="comment"
        >
          宠友圈
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/petshop"
          icon="shopping-cart"
        >
          宠商城
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/petinfo"
          icon="search">
          宠资讯
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/usercenter"
          icon="friends" >
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Tabbar, TabbarItem, Button, Notify} from 'vant';

  import bus from '@/assets/js/bus'
  Vue.use(Tabbar).use(TabbarItem).use(Button);
  export default {
    name: '',
    data: function () {
      return {
        active: 0,
        includes: ['postdetail']
      };
    },
    created() {
      let routeName = this.$route.name;
      if (routeName == 'withusercenter') {
        this.$router.replace('/home');
        this.active = 0;
      }
      else if (routeName == 'forum') this.active = 1;
      else if(routeName == 'petshop') this.active = 2;
      else if(routeName == 'petinfo') this.active = 3;
      else if(routeName == 'usercenter') this.active = 4;

      this.includes = bus.includes;
      //flag0添加,1删除
      bus.$on('change', (val,flag)=> {
        let index = this.includes.indexOf(val);
        if(index!=-1 && flag) this.includes.splice(index,1);
        else if(index==-1 && !flag) this.includes.push(val);
        console.log('触发了change',this.includes,flag)
      })

    },
    methods: {
      isShow(){
        if(this.$route.name=='petinfodetail' || this.$route.name=='notifydetail' || this.$route.name=='postdetail' || this.$route.name=='watchmoreanswer') return false;

        return true;
      }
    }
  }
</script>

<style lang="less" ref="stylesheet/less" scoped>
  .user-center {

  .van-tabbar--fixed {
    margin: 10px 0px 5px 0px;
  }

  }

  .van-tabbar-item {
    font-size: 16px;
  }

  .router-view {
    margin-bottom: 80px;
  }
</style>
