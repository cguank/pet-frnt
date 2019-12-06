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
          <van-divider>图文问诊</van-divider>
        </van-col>
        <router-link to="/consultationinstructions">
          <van-col span="6" offset="2">
            <a href="#" class="top-right">
              问诊须知
              <img src="@/assets/icon/arrow-right.svg"/>
            </a>
          </van-col>
        </router-link>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>
    <div class="content">
      <div class="pet-type">
        <van-row>
          <van-col span="6" offset="2">
            <div class="left-label">
              患宠类型
            </div>
          </van-col>
          <van-col span="16">
            <el-select v-model="petType" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </van-col>
        </van-row>
      </div>
      <div class="pet-sex">
        <van-row>
          <van-col span="6" offset="2">
            <div class="left-label">
              宠物性别
            </div>
          </van-col>
          <van-col span="16">
            <el-select v-model="petSex" placeholder="请选择">
              <el-option
                label="公"
                :value="1">
              </el-option>
              <el-option
                label="母"
                :value="2">
              </el-option>
            </el-select>

          </van-col>
        </van-row>
      </div>
      <div class="pet-age">
        <van-row>
          <van-col span="6" offset="2">
            <div class="left-label">
              宠物月龄
            </div>
          </van-col>
          <van-col span="16">
            <el-input v-model="petAge" placeholder="请输入月龄"></el-input>

          </van-col>
        </van-row>
      </div>
      <div class="pet-dec">
        <van-row>
          <van-col span="6" offset="2">
            <div class="left-label">
              病情描述
            </div>
          </van-col>
          <van-col span="16">
            <el-input type="textarea" placeholder="请描述患宠的症状,患病时长,患病部位,用药情况,想要获得的帮助"
                      v-model="dec"
                      :rows="3"
                      autosize></el-input>

          </van-col>
        </van-row>
      </div>

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
        上传图片
      </van-divider>

      <div class="upload">
        <van-uploader
          v-model="fileList"
          :max-count="9"
          :before-read="beforeRead"
        />
        <h4>tips:上传图片或检查,检查报告.且拍照上传的化验单需要清晰完整,包涵化验单日期,最多上传9张</h4>
      </div>

      <div class="submit">
        <van-button type="info" round size="large" @click="releaseConsultation" >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Row, Col, Divider, Icon, Uploader, Toast} from 'vant';
  import {Select, Option, Input} from 'element-ui'

  Vue.use(Row).use(Col).use(Divider).use(Icon).use(Uploader)
    .use(Select).use(Option).use(Input);
  import 'element-ui/lib/theme-chalk/index.css'

  export default {
    name: '',
    data: function () {
      return {
        expertFlag:0,   //1-用户 2-专家
        petType: 1,
        typeOptions: [{
          value: 1,
          label: '狗'
        }, {
          value: 2,
          label: '猫'
        }, {
          value: 3,
          label: '异宠'
        }],
        petSex: 1,
        petAge: '',
        dec: '',
        fileList: [],
        fileListStr: '',
      };
    },
    created() {
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
          console.log(this.fileListStr);
        }).catch(err => {
          Notify({ type: 'danger', message: '系统跑丢了' });
        });
        //console.log(this.fileListStr);
        return true;
      },

      //发布咨询
      releaseConsultation: function() {
        let role = this.$route.query.role;
        var flag = role;
        let expertId = this.$route.query.expertId;
        if(flag==1) {
          setTimeout(() => {
            this.$getData("releaseConsultation", {
              expertId: expertId, petType: this.petType, petSex: this.petSex,
              petAge: this.petAge, description: this.dec,attachment:this.fileListStr
            }).then(res => {
              var data = res.data;
              console.log(data);
              if (data == 0) {
                Toast.success('发布成功！');
                this.$router.go(-1);
                //this.$router.push({ path: 'my_enquiry', query: { tagId: 1, inquiryId: projectId } });
              } else {
                Toast.fail('发布失败！');
              }
            });
          }, 100);
        }else{
          Toast.fail('专家不可发布咨询！');
        }
      },
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

  .content {

  .el-select {
    width: 70%;
  }

  .el-input {
    width: 70%;
  }

  .el-textarea {
    width: 90%;
  }

  .left-label {
    height: 40px;
    padding: 7px 0;
  }

  }

  .upload {
    margin: 0 10px;
  }

  .submit {
    margin: 60px 0;
    padding: 0 10%;
    width: 80%;
  }
</style>
