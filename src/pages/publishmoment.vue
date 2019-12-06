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
          <van-divider>发布</van-divider>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>
    <div class="content">
      <div class="character">
        <van-field
          v-model="postMsg"
          rows="3"
          maxlength="800"
          autosize
          show-word-limit
          type="textarea"
          placeholder="写点什么呢……（不少于5个字符哦）"
        />
      </div>
      <div class="img">
        <van-uploader
          v-model="fileList"
          :max-count="9"
          :before-read="beforeRead"
        />
      </div>
      <div class="submit">
        <van-button type="info" round size="large" @click="publish">发布</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Row, Col, Divider, Icon, Uploader, Toast, Field, CellGroup, Button, Notify} from 'vant';

  Vue.use(Row).use(Col).use(Divider).use(Icon).use(Uploader).use(Field).use(CellGroup).use(Button).use(Notify);

  import { utf16toEntities } from '@/assets/js/utils'
  export default {
    name: '',
    data: function () {
      return {
        postMsg: '',
        fileList: [],
        fileListStr: '',
        id:0,  // 评论发出后的id
      };
    },
    created() {
    },
    mounted() {
      window.document.getElementsByTagName('textarea')[0].focus();
    },
    methods: {
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
          this.fileListStr += res.data+',';
          console.log(this.fileListStr)
        }).catch(err => {
          Notify({ type: 'danger', message: '系统跑丢了' });
        });
        return true;
      },
      publish() {
        if(this.postMsg.length<5) {
          Toast('内容不能少于5个字符哦');
          return;
        }
        let msg = utf16toEntities(this.postMsg);  //有表情输入
        let i=0;
        this.fileListStr = this.fileListStr.substring(0,this.fileListStr.length-1); //去掉最后一个逗号

        console.log('msg + fileListStr = ');
        console.log(msg);
        console.log(this.fileListStr);
        this.$postData('addMoment',{
          'comment': msg,
          'imgListStr': this.fileListStr
        }).then(res => {  // 返回该动态id，用于插入附件
          if(res.data){
            Toast('发布成功');
            this.$router.push({path:'/forum'})
          }
        });

        Toast('发布成功');
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
  .submit {
    margin: 60px 0;
    padding: 0 10%;
    width: 80%;
  }
</style>
