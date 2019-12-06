<template>
  <div>
    <div class="loading" v-if="isLoading==true">
      <van-loading size="100px" type="spinner"  />
    </div>
    <iframe id="useIframe" :height="height" width="100%"  src="https://youchongcwyp.tmall.com/" />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Loading } from 'vant';

  Vue.use(Loading);
  export default {
    name: '',
    data: function () {
      return {
        height: window.screen.height-55,
        isLoading: true
      };
    },
    mounted(){
      let iframe = window.document.getElementById('useIframe');
      if (iframe.attachEvent){
        iframe.attachEvent("onload", () => {
          this.isLoading = false;
        });
      } else {
        iframe.onload = () => {
          this.isLoading = false;
        };
      }
    },
    created() {
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
.loading {
  position: absolute;
  top: 40%;
  left: 40%;
}
</style>
