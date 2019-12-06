<template>
  <div>
    <van-nav-bar
      title="宠物头像"
      right-text="保存"
      left-arrow
      @click-left="goBack"
      @click-right="confirm"
    />

    <div style="height: 20px;"></div>
    <div class="upload">
      <van-uploader
        v-model="fileList"
        :max-count="1"
        :before-read="beforeRead"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Field,Popup,Picker,Uploader,Button } from 'vant';

  Vue.use(NavBar).use(Toast).use(Field).use(Popup).use(Picker).use(Uploader).use(Button);
  export default {
    name: "changepetheadimg",
    data() {
      return{
        flag:0,
        lastPet:{},
        fileList: [],
        fileListStr: '',
      }
    },
    created(){
      this.lastPet = this.$route.query.pet;
      this.flag = this.$route.query.flag;
    },
    methods: {
      goBack() {
        // Toast('返回');
        //this.$router.go(-1);
        this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
      },
      beforeRead(file) {
        if (file.type.indexOf('image') == -1) {
          Toast('请上传图片');
          return false;
        }
        let config = {
          headers: {
            filePost: true
          }
        };
        let params = new FormData();
        params.append('file', file);
        params.append('flag', 2); //只返回路径,不负责存数据库
        this.$postData('uploadFile', params, config).then(res => { // 返回该帖子id，用于插入附件
          this.fileListStr = res.data;
          console.log(this.fileListStr)
        }).catch(err => {
          Notify({ type: 'danger', message: '系统跑丢了' });
        });
        return true;
      },
      confirm() {
        // Toast('保存');
        let headImg = this.fileListStr;
        let petId = this.lastPet.id;
        this.showPicker = false;
        console.log(this.new_age);
        setTimeout(() => {
          this.$getData("setMyPet", {
            petId: petId,headImg:headImg
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('修改成功');
              this.lastPet.headimg = headImg;
              this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
            }else{
              Toast('修改失败');
            }
          });
        }, 500);
      }
    }
  }
</script>

<style scoped>
  .upload {
    margin: 0 auto;
    text-align:center;
  }
</style>
