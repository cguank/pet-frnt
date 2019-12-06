<template>
  <div>
    <van-nav-bar
      title="自助诊断"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div style="height: 50px;"></div>
    <div @click="goToDog">
      <van-image
        style="z-index: -1;"
        height="9rem"
        fit="cover"
        src="./static/images/dog.jpg"
      />
    </div>
    <div @click="goToCat">
    <van-image
      style="z-index: -1;"
      height="9rem"
      fit="cover"
      src="./static/images/cat.jpg"
    />
    </div>
    <div @click="goToOther">
    <van-image
      style="z-index: -1;"
      height="9rem"
      width="100%"
      fit="cover"
      src="./static/images/otherpet.jpg"
    />
    </div>
    <div class="img_text_dog">狗</div>
    <div class="img_text_cat">猫</div>
    <div class="img_text_other">异宠</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar,Image } from 'vant';
Vue.use(NavBar).use(Image);
export default {
  name: "selfservice",
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    goToDog() {
      this.$router.push({path:'/selfdiagnose',query: {type:'1'}});
    },
    goToCat() {
      this.$router.push({path:'/selfdiagnose',query: {type:'2'}});
    },
    goToOther() {
      this.$router.push({path:'/selfdiagnose',query: {type:'3'}});
    }
  }
}
</script>

<style scoped>
  .img_text_dog {
    font-size: 24px;
    margin-left: 80%;
    margin-top: -400px;
    z-index: 1;
  }

  .img_text_cat {
    font-size: 24px;
    margin-left: 80%;
    margin-top: 115px;
    z-index: 2;
  }

  .img_text_other {
    font-size: 24px;
    margin-left: 70%;
    margin-top: 115px;
    z-index: 3;
  }
</style>
