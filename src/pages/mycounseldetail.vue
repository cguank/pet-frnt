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
          <van-divider>问诊详情</van-divider>
        </van-col>
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
            <el-select v-model="petDetail.petType" placeholder="请选择" disabled/>
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
            <el-select v-model="petDetail.petSex" placeholder="请选择" disabled/>
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
            <el-select v-model="petDetail.petAge" placeholder="请选择" disabled/>
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
                      v-model="petDetail.descp"
                      :rows="3"
                      autosize
                      disabled
            />
          </van-col>
        </van-row>
      </div>

      <div class="pet-images">
        <van-row>
          <van-col span="6" offset="2">
            <div class="left-label">
              问诊图片
            </div>
          </van-col>
          <van-col span="16">
            <span class="img-item" v-for="item in petDetail.imgList">
            <van-image
              width="100"
              height="100"
              :src="item"
              @click="imgPreview(item)"
            />
            </span>

          </van-col>
        </van-row>
      </div>

    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      专家答复
    </van-divider>
    <div class="answer">
      <h3 v-if="userInfo.role==1&&diagnoseList.length==0">专家还未答复,请耐心等待</h3>
      <div class="list" v-else>
        <div class="list-item" v-for="(item, index) in diagnoseList" :key="item.id">
          <van-row>
            <van-col span="6" offset="2">
              <div class="left-label">
                {{item.name}}:
              </div>
            </van-col>
            <van-col span="16">
              <div class="left-label">
                {{item.msg}}
                <span class="sub-info">&nbsp;&nbsp;{{item.publishTime}}</span>
                <span class="sub-info" v-if="item.role==1">&nbsp;&nbsp;追问</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="fixed" v-if="state==1">
      <van-cell-group>
        <van-field
          v-model="submitAnswer"
          center
          clearable
          placeholder="请输入您的诊断或疑问```"
        >
          <van-button slot="button" size="small" color="grey" @click="send">发送</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Row, Col, Divider, Icon, Uploader, Toast, Image, ImagePreview, Button, CellGroup, Cell, Field} from 'vant';
  import {Select, Option, Input} from 'element-ui'

  Vue.use(Row).use(Col).use(Divider).use(Icon).use(Uploader).use(Image).use(ImagePreview)
    .use(Button).use(CellGroup).use(Cell).use(Field)
    .use(Select).use(Option).use(Input);
  import 'element-ui/lib/theme-chalk/index.css'

  import {utf16toEntities, stopKeyBoard} from '@/assets/js/utils'

  export default {
    name: '',
    data: function () {
      return {
        role: this.$route.query.role,
        state: this.$route.query.state,
        petDetail: {  //获得提交的问诊
          /*petType: 1,
          petSex: 1,
          petAge: '10',
          dec: 'wohsihdfosjdffsdlkfjsdf塑料袋佛司法离开家欧地附近现场来看毕竟此时的分析出来看句第六空间',
          imgList: [
            './static/images/cat.jpg',
            './static/images/dog.jpg',
            './static/images/dog-zz.png',
            './static/images/head1.jpeg',
          ]*/
        },
        diagnoseList: [ //通过问诊id搜索到该回答列表
//          {
//            name: '潘清山',
//            role: 2,
//            msg: 'lsjdfoixvoxicvjxocivhnxcoivjhx0塑料袋看风景啥都现场来看是继续凑夏洛克vpvx',
//            publishTime: '2小时前',
//          },
//          {
//            name: '可能是地方',
//            role: 1,
//            msg: 'lsjdfoixvoxicvjxocivhnxcoivjhx0塑料袋看风景啥都现场来看是继续凑夏洛克vpvx',
//            publishTime: '1小时前',
//          },
        ],
        userInfo: { //获得登录用户信息
          /*id: 12,
          role: 2, //1用户2专家,
          name: '可能是地方'
          */
        },
        submitAnswer: '',
      }
    },
    mounted() {
      let array = [...window.document.getElementsByClassName('el-input__inner')];

      array.map(item => {
        item.style.color = 'black'
      });

      array = [...window.document.getElementsByClassName('el-textarea__inner')];

      array.map(item => {
        item.style.color = 'black'
      });

      if(!(this.userInfo.role==1 && this.state==1)){
        let item = window.document.getElementsByClassName('van-field__control')[0];
        item.style.backgroundColor = '#00000021';
        item.style.height = '30px';
        stopKeyBoard(item)
      }
    }
    ,
    created() {
      let counselId = this.$route.query.id;
      let role = this.$route.query.role;
      setTimeout(() => {
        this.$getData("getUserInfo", {
          counselId: counselId
        }).then(res => {
          var data = res.data.userInfo;
          this.userInfo = data;
          console.log(this.userInfo);
        });
      }, 100);

      setTimeout(() => {
        this.$getData("getCounselDetail", {
          counselId: counselId
        }).then(res => {
          var data = res.data.petDetail;
          this.petDetail = data;
          console.log(this.petDetail);
        });
      }, 100);
      //this.petDetail.petAge += "月";

      setTimeout(() => {
        this.$getData("getConsultationInteraction", {
          counselId: counselId,
          role:role
        }).then(res => {
          var data = res.data.interactionList;
          this.diagnoseList = data;
          console.log(this.diagnoseList);
        });
      }, 100);
    }
    ,
    methods: {
      imgPreview(src) {
        ImagePreview([src]);
      },
      getCounselDetail(){
        let counselId = this.$route.query.id;
        setTimeout(() => {
          this.$getData("getCounselDetail", {
            counselId: counselId
          }).then(res => {
            var data = res.data.petDetail;
            this.petDetail = data;
            console.log(this.petDetail);
          });
        }, 100);
      },
      send() {
        let counselId = this.$route.query.id;
        let message = this.submitAnswer;
        if (this.submitAnswer.length == 0) Toast('发送内容不能为空');
        else {
          let obj = {
            //id: 1,
            name: this.userInfo.name,
            role: this.userInfo.role,
            msg: this.submitAnswer,
            publishTime: '刚刚',
          };
          //发送接口```````````
          if(this.userInfo.role==1){
            console.log("当前是用户");
            setTimeout(() => {
              this.$getData("addFurtherConsultation", {
                counselId: counselId,message:message,role:1
              }).then(res => {
                var data = res.data;
                if (data == 0) {
                  Toast.success('发送成功！');
                  this.diagnoseList.push(obj);
                } else {
                  Toast.fail('发送失败！');
                }
              });
            }, 100);
          }else{
            console.log("当前是专家");
            console.log(message);
            setTimeout(() => {
              this.$getData("addConsultationResponse", {
                counselId: counselId,message:message,role:2
              }).then(res => {
                var data = res.data;
                if (data == 0) {
                  Toast.success('发送成功！');
                  this.diagnoseList.push(obj);
                } else {
                  Toast.fail('发送失败！');
                }
              });
            }, 100);
          }
          //
          this.submitAnswer = '';
        }

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

  .pet-images {
    margin-top: 20px;
  }

  }

  .submit {
    margin: 30px 0;
    padding: 0 10%;
    width: 80%;
  }

  .sub-info {
    font-size: 14px;
    color: #7d7e80;
  }

  .answer-button {
    color: #3a8ee6;
  }

  .list {
    padding-bottom: 80px;

  .list-item {
    margin-top: 5px;
  }

  }

  .fixed {
    position: fixed;
    bottom: 0;
    width: 100%;

  }
</style>
