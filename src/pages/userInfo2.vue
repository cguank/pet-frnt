<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text=""
      right-text="提交"
      left-arrow
      @click-left="goBack"
      @click-right="send"
    />

    <van-row type="flex" justify="center" gutter="15">
      <van-col>
        <div class="headImg">
          <van-uploader upload-text="点击上传头像" v-model="selfInfo.headImg" :max-count="1" :before-read="beforeReadHeadImg" :after-read="afterRead"/>
        </div>
      </van-col>
      <van-col>
        <div class="headImg">
          <van-uploader upload-text="点击上传背景" v-model="selfInfo.backgroundImg" :max-count="1" :before-read="beforeReadBackgroundImg" :after-read="afterRead"/>
        </div>
      </van-col>
    </van-row>

    <van-cell-group>
      <van-field
        label="昵称"
        required
        clearable
        v-model="selfInfo.nickname"
        placeholder="请输入新昵称"/>
    </van-cell-group>

    <van-cell-group>
      <van-field
        label="账号"
        disabled
        v-model="selfInfo.id"/>
    </van-cell-group>

    <van-field
      readonly
      clickable
      label="性别"
      :value="sexPicker.value"
      :placeholder="sexPicker.columns[selfInfo.sex-1]"
      @click="sexPicker.showPicker = true"
    />

    <van-popup v-model="sexPicker.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="sexPicker.columns"
        :default-index="selfInfo.sex-1"
        @cancel="sexPicker.showPicker = false"
        @confirm="onConfirmSex"
      />
    </van-popup>

    <van-field
      readonly
      clickable
      label="年龄"
      :value="selfInfo.age"
      :placeholder="selfInfo.age"
      @click="agePicker.showPicker = true"
    />

    <van-popup v-model="agePicker.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="agePicker.columns"
        :default-index="selfInfo.age-1"
        @cancel="agePicker.showPicker = false"
        @confirm="onConfirmAge"
      />
    </van-popup>

    <van-field
      readonly
      clickable
      label="城市"
      :value="cityPicker.value"
      placeholder="选择城市"
      @click="cityPicker.showPicker = true"
    />

    <van-popup v-model="cityPicker.showPicker" position="bottom">
      <van-area
        show-toolbar
        :area-list="cityPicker.areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @cancel="cityPicker.showPicker = false"
        @confirm="onConfirmCity"
      />
    </van-popup>

    <van-field
      readonly
      clickable
      label="选择职业"
      :value="jobPicker.columns[selfInfo.job-1]"
      :placeholder="jobPicker.columns[selfInfo.job-1]"
      @click="jobPicker.showPicker = true"
    />

    <van-popup v-model="jobPicker.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="jobPicker.columns"
        :default-index="selfInfo.job-1"
        @cancel="jobPicker.showPicker = false"
        @confirm="onConfirmJob"
      />
    </van-popup>

    <van-field
      readonly
      clickable
      label="养宠年限"
      :value="selfInfo.petAge"
      :placeholder="selfInfo.petAge"
      @click="petAgePicker.showPicker = true"
    />

    <van-popup v-model="petAgePicker.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="petAgePicker.columns"
        :default-index="selfInfo.petAge-1"
        @cancel="petAgePicker.showPicker = false"
        @confirm="onConfirmPetAge"
      />
    </van-popup>

    <div style="height: 40px; line-height: 40px; font-size: 14px; margin-left: 15px;">个人介绍：</div>
    <van-cell-group>
      <van-field v-model="selfInfo.introduction"
                 placeholder="介绍一下自己吧 owo"
                 type="textarea"
                 rows="2"
                 autosize
                 maxlength="50"
                 clearable
                 show-word-limit
      />
    </van-cell-group>
    <van-overlay :show="this.isUpLoading">
      <div class="wrapper" @click.stop>
        <van-loading color="white" vertical>图片上传中</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import Vue from 'vue';
  import areaList from '@/assets/js/area.js';  // 城市列表
  import {
    AddressEdit,
    Area,
    NavBar,
    Uploader,
    Toast,
    Cell,
    CellGroup,
    Field,
    Popup,
    Picker,
    Dialog,
    Button,
    Notify,
    Row,
    Col,
    Overlay,
    Loading
  } from 'vant';

  Vue.use(AddressEdit).use(Area).use(NavBar).use(Uploader).use(Toast).use(Cell).use(CellGroup).use(Field)
    .use(Popup).use(Picker).use(Notify).use(Row).use(Col).use(Overlay).use(Loading);
    export default {
      name: "userInfo2",
      data() {
        return {
          isUpLoading:false,
          selfInfo:{
            id: '',// 账号（格式要改？ 000001？）
            headImg: [],
            backgroundImg:[],
            nickname: '',
            level: 1,
            sex: '',  //男：1， 女：2
            age: '',
            province:'',
            city:'',
            district:'',
            introduction:'',    // 个人介绍
            job:'',             // 职业 对应后台 member表-type字段
            petAge: '',        // 养宠年限
          },
          headImgPath:'',
          backgroundImgPath:'',
          sexPicker:{
            showPicker: false,
            columns: ['男', '女'],
          },
          agePicker:{
            showPicker: false,
            columns: [],
          },
          cityPicker:{
            value:'',
            showPicker:false,
            areaList: areaList,  // 城市列表
          },
          jobPicker:{
            showPicker: false,
            columns: ['宠物诊疗', '学生', '宠物饲主'],
          },
          petAgePicker:{
            showPicker: false,
            columns: [],
          }
        }
      },
      methods: {
        goBack() {
          this.$router.go(-1);
        },
        // 返回布尔值
        beforeReadHeadImg(file) {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' ) {
            Toast('请上传 jpg 或 png 格式图片');
            return false;
          }

          this.isUpLoading = true;

          let config = {
            headers: {
              filePost: true
            }
          };
          let params = new FormData();
          params.append('file', file);
          params.append('flag', 2); //只返回路径,不负责存数据库
          this.$postData('uploadFile', params, config).then(res => {
            this.headImgPath = res.data;
          }).catch(err => {
            Notify({ type: 'danger', message: '系统跑丢了' });
          });

          return true;
        },
        beforeReadBackgroundImg(file) {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' ) {
            Toast('请上传 jpg 或 png 格式图片');
            return false;
          }

          this.isUpLoading = true;

          let config = {
            headers: {
              filePost: true
            }
          };
          let params = new FormData();
          params.append('file', file);
          params.append('flag', 2); //只返回路径,不负责存数据库
          this.$postData('uploadFile', params, config).then(res => {
            this.backgroundImgPath = res.data;
          }).catch(err => {
            Notify({ type: 'danger', message: '系统跑丢了' });
          });

          return true;
        },
        afterRead(){
          this.isUpLoading = false;
        },
        onConfirmSex(value) {
          if(value=='男') this.selfInfo.sex = 1;
          else this.selfInfo.sex = 2;
          this.sexPicker.showPicker = false;
        },
        onConfirmAge(value){
          this.selfInfo.age = value;
          this.agePicker.showPicker = false;
        },
        onConfirmCity(value){
          if(value[0].name == ''){
            Toast("请选择省");
            return;
          }else if (value[1].name == '') {
            Toast("请选择市");
            return;
          }else if (value[2].name == ''){
            Toast("请选择区/县");
            return;
          }
          console.log("cityValue:", value);
          if (value[0].name == value[1].name) {// 如北京、天津、重庆等
            this.cityPicker.value = value[0].name + " " + value[2].name;
          } else {
            this.cityPicker.value = value[0].name + " " + value[1].name + " " + value[2].name;
          }
           // 省/市/区
           //value[0].name+'/'+value[1].name+'/'+value[2].name;
          this.selfInfo.province = value[0].name;
          this.selfInfo.city = value[1].name;
          this.selfInfo.district = value[2].name;
          this.cityPicker.showPicker = false;
        },
        onConfirmJob(value){
          if(value == '宠物诊疗') this.selfInfo.job = 1;
          else if(value == '学生') this.selfInfo.job = 2;
          else if(value == '宠物饲主') this.selfInfo.job = 3;
          this.jobPicker.showPicker = false;
        },
        onConfirmPetAge(value){
          this.selfInfo.petAge = value;
          this.petAgePicker.showPicker = false;
        },
        send(){
          // Toast("提交");
          if (this.selfInfo.headImg.length == 0) {// 判断头像是否为空，为空则提示
            Dialog.alert({title: '头像不能为空！'});
          }else if (this.selfInfo.nickname == '') {// 判断昵称是否为空，为空则提示
            Dialog.alert({title: '昵称不能为空！'});
          } else {
              Dialog.confirm({
                title: '确认提交吗？',
              }).then(() => {
                this.$getData('updateMemberInfo',{
                  headImg: this.headImgPath,
                  backgroundImg: this.backgroundImgPath,
                  nickname: this.selfInfo.nickname,
                  sex: this.selfInfo.sex,
                  age: this.selfInfo.age,
                  province: this.selfInfo.province,
                  city: this.selfInfo.city,
                  district: this.selfInfo.district,
                  introduction: this.selfInfo.introduction,
                  job: this.selfInfo.job,
                  petAge: this.selfInfo.petAge
                }).then(res => {
                  if (res.data == 0) {
                    Dialog.alert({title: '提交成功！'});
                  } else if (res.data == 1){
                    Dialog.alert({title: '提交失败！', message:"昵称重复！请修改昵称后重新提交！"});
                  } else if (res.data == -1) {
                    Dialog.alert({title: '提交失败！'});
                  }
                });
              }).catch(() => {
                // on cancel
              });
          }
        }
      },
      mounted() {
        this.$getData('getUserHomePageInfo', {}).then(res => {
          let userInfo = res.data.basicInfo.userInfo;
          console.log("userInfo:", userInfo);
          this.selfInfo.id = userInfo.id;
          this.selfInfo.headImg.push({url: userInfo.headImg});
          this.selfInfo.backgroundImg.push({url: userInfo.backgroundImg == '' ? "./static/images/head3.jpeg" : userInfo.backgroundImg});
          this.selfInfo.nickname = userInfo.nickname;
          this.selfInfo.sex = userInfo.sex;
          this.selfInfo.age = userInfo.age;
          this.selfInfo.province = userInfo.province;
          this.selfInfo.city = userInfo.city;
          this.selfInfo.district = userInfo.district;
          this.selfInfo.introduction = userInfo.introduction;
          this.selfInfo.job = userInfo.type;
          this.selfInfo.petAge = userInfo.petAge;
          if (this.selfInfo.province != '' && this.selfInfo.city != '' && this.selfInfo.district != '') {
            if (this.selfInfo.province == this.selfInfo.city) {
              this.cityPicker.value = this.selfInfo.province + ' ' + this.selfInfo.district;
            }else {
              this.cityPicker.value = this.selfInfo.province + ' ' + this.selfInfo.city + ' ' + this.selfInfo.district;
            }
          }
        });

        for(let i=0;i<100;i++){
          this.agePicker.columns[i]=i+1;
        }
        for(let i=-1;i<100;i++){
          this.petAgePicker.columns[i]=i+1;
        }
      }
    }
</script>

<style scoped>
  .headImg {
    margin-top: 20px;
    text-align: center;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
