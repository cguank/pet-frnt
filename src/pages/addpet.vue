<template>
  <div>
    <van-nav-bar
      title="宠物信息"
      left-text=""
      right-text="添加"
      left-arrow
      @click-left="goBack"
      @click-right="gotoSend"

    />

    <van-cell-group>
      <van-field
        v-model="name"
        required
        clearable
        label="昵称"
        placeholder="请输入宠物昵称"
      />

      <van-field
        v-model="age"
        required
        clearable
        label="年龄"
        placeholder="请输入年龄"
      />

<!--
      <van-field
        v-model="sex"
        required
        clearable
        label="性别"
        placeholder="请输入性别"
      />
-->

      <van-field
        readonly
        clickable
        label="性别"
        :value="sex_columns[sex-1]"
        placeholder="请选择性别"
        @click="sex_showPicker = true"
      />

      <van-popup v-model="sex_showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="sex_columns"
          @cancel="sex_showPicker = false"
          @confirm="sex_onConfirm"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        label="类型"
        :value="pettype_columns[pettype-1]"
        placeholder="请选择宠物类型"
        @click="pettype_showPicker = true"
      />

      <van-popup v-model="pettype_showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="pettype_columns"
          @cancel="pettype_showPicker = false"
          @confirm="pettype_onConfirm"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        label="生日"
        :value="birthday"
        placeholder="选择生日"
        @click="date_showPicker = true"
      />
      <van-popup v-model="date_showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="date_showPicker = false"
          @confirm="onConfirmDate"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        label="领养时间"
        :value="pet_date"
        placeholder="选择领养时间"
        @click="pet_date_showPicker = true"
      />

      <van-popup v-model="pet_date_showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="pet_date_showPicker = false"
          @confirm="onConfirmEducation"
        />
      </van-popup>
      <!--  1、申请人  2、申请日期 3、任职机构  4、执业兽医资格证编号
      5、职业兽医资格证取得时间 5、学历  下拉选择   6、上传附件的功能
      小学、初中、中专/高中、专科、本科、硕士研究生、博士研究生 -->
    </van-cell-group>
    <div style="margin-top: 10px; margin-left: 15px;">
      <span style="font-size: 14px; ">头像：</span>
      <span style="font-size: 12px; color: #999999;">为你的宠物选一张最美的照片吧</span>
    </div>
    <van-uploader
      style="margin-left: 15px; margin-top: 10px;"
      v-model="fileList"
      :max-count="1"
      :before-read="beforeRead"
    />
    <div style="margin-top: 10px; margin-left: 15px; font-size: 12px; color: #f08444;">完成后请点击右上角“添加”</div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Field,Popup,Picker,CellGroup,DatetimePicker,Uploader } from 'vant';

  Vue.use(NavBar).use(Toast).use(Field).use(Popup).use(Picker).use(CellGroup).use(DatetimePicker).use(Uploader);
  export default {
    name: "addpet",
    data() {
      return{
        name:'',
        date:'',
        age:'',
        sex:1,
        birthday:'',
        pet_date:'',
        fileList: [],
        fileListStr: '',
        minDate: new Date(2000,1,1),
        maxDate: new Date(),
        value:'',
        date_showPicker:false,
        pet_date_showPicker:false,
        sex_showPicker:false,
        education_columns:['小学', '初中', '中专/高中', '专科','本科','硕士研究生','博士研究生'],
        pettype:1,  // 宠物类型 1-狗  2-猫  3-其他
        pettype_showPicker: false,
        pettype_columns: ['狗', '猫', '其他'],
        sex_columns:['公', '母'],
      }
    },
    methods: {
      goBack() {
        // Toast('返回');
        this.$router.go(-1);
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
      formatDate(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
      },
      onConfirmDate(value) {
        this.birthday = this.formatDate(value); // 转化为 yyyy-MM-dd
        this.date_showPicker = false;
      },
      onConfirmEducation(value) {
        this.pet_date = this.formatDate(value); // 转化为 yyyy-MM-dd
        this.pet_date_showPicker = false;
      },
      pettype_onConfirm(value) {
        if(value == '狗') this.pettype = 1;
        if(value == '猫') this.pettype = 2;
        if(value == '其他') this.pettype = 3;
        this.pettype_showPicker = false;
        console.log(this.pettype);
        // 上传后台
      },
      sex_onConfirm(value){
        if(value == '公') this.sex = 1;
        if(value == '母') this.sex = 2;
        this.sex_showPicker = false;
        console.log(this.sex);
      },
      gotoSend() {
        setTimeout(() => {
          this.$getData("addNewPet", {
            petName: this.name, petType: this.pettype, petSex: this.sex, petAge: this.age,
            petBirthday: this.birthday,petDate:this.pet_date,headImg:this.fileListStr
          }).then(res => {
            var data = res.data;
            console.log(data);
            if (data == 0) {
              Toast.success('添加成功！');
              //this.$router.go(-1);
              this.$router.push('/mypet');
            } else {
              Toast.fail('发布失败！');
              this.$router.go(-1);
            }
          });
        }, 100);
        //this.$router.push('/addpetsuccess');
      }
    }
  }
</script>

<style scoped>

</style>
