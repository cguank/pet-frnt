<template>
  <div>
    <van-nav-bar
      title="编辑资料"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div>
      <van-row @click="gotoChangeHeadimg">
        <van-col span="17">
          <div class="headimg">修改头像</div>
        </van-col>
        <van-col span="4">
          <van-image
            round
            width="3rem"
            height="3rem"
            :src="pet.headimg"
            style="margin-top: 10px;"
          />
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" style="margin-top: 27px;" color="#aaaaaa"/>
        </van-col>
      </van-row>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-row @click="gotoChangeNickname">
        <van-col span="10">
          <div class="text">宠物名称</div>
        </van-col>
        <van-col span="10">
          <div class="text_1" style="float: right">{{this.pet.name}}</div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="3">
          <van-icon name="arrow" style="margin-top: 17px;" color="#aaaaaa"/>
        </van-col>
      </van-row>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-row @click="gotoChangeSex">
        <van-col span="10">
          <div class="text">性别</div>
        </van-col>
        <van-col span="10">
          <img class="text_1" style="float: right; height:25px; width:25px; line-height: 25px;" :src="pet.sex_img"/>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="3">
          <van-icon name="arrow" style="margin-top: 17px;" color="#aaaaaa"/>
        </van-col>
      </van-row>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-row @click="gotoChangeAge">
        <van-col span="10">
          <div class="text">年龄</div>
        </van-col>
        <van-col span="10">
          <div class="text_1" style="float: right">{{this.pet.age}}</div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="3">
          <van-icon name="arrow" style="margin-top: 17px;" color="#aaaaaa"/>
        </van-col>
      </van-row>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-row @click="gotoChangeBirthday">
        <van-col span="10">
          <div class="text">宠物生日</div>
        </van-col>
        <van-col span="10">
          <div class="text_1" style="float: right">{{this.pet.birthday}}</div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="3">
          <van-icon name="arrow" style="margin-top: 17px;" color="#aaaaaa"/>
        </van-col>
      </van-row>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-row @click="gotoChangeWeight">
        <van-col span="10">
          <div class="text">宠物体重</div>
        </van-col>
        <van-col span="10">
          <div class="text_1" style="float: right">{{this.pet.weight}}Kg</div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="3">
          <van-icon name="arrow" style="margin-top: 17px;" color="#aaaaaa"/>
        </van-col>
      </van-row>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-field
        readonly
        clickable
        label="类型"
        :value="columns[pettype-1]"
        :placeholder="columns[pettype-1]"
        @click="showPicker = true"
      />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          :default-index="pettype-1"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div style="height: 2px; background:#eeeeee; margin-top: 5px;"></div>

      <van-row>
        <van-col span="15">
          <div class="text">加入智慧宠物</div>
        </van-col>
        <van-col span="9">
          <div class="text_1">{{this.join_date}}</div>
        </van-col>
      </van-row>
      <div style="height: 20px; background:#eeeeee; margin-top: 5px;"></div>

      <van-button type="info" size="large" class="login_btn" color="white" @click="deletePet">
        <span style="color: #d90000; font-size: 14px; font-weight: lighter;">删除宠物</span>
      </van-button>

      <div style="height: 350px; background:#eeeeee;"></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Progress,Row, Col,Image,Icon,Button,Field,Popup,Picker } from 'vant';

  Vue.use(NavBar).use(Toast).use(Progress).use(Row).use(Col).use(Image).use(Icon).use(Button)
    .use(Field).use(Popup).use(Picker);
  export default {
    name: "petdetail",
    data() {
      return {
        flag:0,
        pet:{
          id:1,
          name:'',
          headimg:'',
          kind:'',
          age:1,
          sex:'',
          sex_img:'',
          birthday:'02-03',
          weight:1,
        },
        pettype:1,  // 宠物类型 1-狗  2-猫  3-其他
        showPicker: false,
        columns: ['狗', '猫', '其他'],
        join_date:'',  // 用户加入智慧宠物时间
      }
    },
    created(){/*
      let petId = this.$route.query.petId;  // 获取宠物相关信息
            setTimeout(() => {
              this.$getData("getMyPetDetail", {
                petId: petId
              }).then(res => {
                var data = res.data.petDetail;
                this.pet = data;
                console.log(data);
              });
            }, 500);*/
      this.flag = this.$route.query.flag;
      this.pet.id = this.$route.query.pet.id;
      this.pet.name = this.$route.query.pet.name;
      this.pet.headimg = this.$route.query.pet.headimg;
      this.pet.kind = this.$route.query.pet.kind;
      this.pet.age = this.$route.query.pet.age;
      this.pet.sex = this.$route.query.pet.sex;
      this.pet.sex_img = this.$route.query.pet.sex_img;
      this.pet.birthday = this.$route.query.pet.petBirthday;
      this.pet.weight = this.$route.query.pet.petWeight;
      this.join_date = this.$route.query.pet.createTime;
      this.pettype = this.$route.query.pet.petType;
    },
    methods: {
      onClickLeft() {
        // Toast('返回');
        this.$router.push({path:'/mypet',query: {flag: this.flag}});
        //this.$router.go(-1);
      },
      gotoChangeHeadimg() {
        // Toast('更换头像');
        //this.$router.push('/changepetheadimg');
        this.$router.push({path:'/changepetheadimg',query: {pet: this.$route.query.pet,flag: this.flag}});
      },
      gotoChangeNickname() {
        // Toast('更换宠物名称');
        //this.$router.push('/changepetname');
        this.$router.push({path:'/changepetname',query: {pet: this.$route.query.pet,flag: this.flag}});
      },
      gotoChangeSex() {
        // Toast('修改性别');
        this.$router.push({path:'/changepetsex',query: {pet: this.$route.query.pet,flag: this.flag}});
      },
      gotoChangeAge() {
        // Toast('修改年龄');
        this.$router.push({path:'/changepetage',query: {pet: this.$route.query.pet,flag: this.flag}});
      },
      gotoChangeBirthday() {
        // Toast('修改生日');
        this.$router.push({path:'/changepetbirthday',query: {pet: this.$route.query.pet,flag: this.flag}});
      },
      gotoChangeWeight() {
        // Toast('修改体重');
        this.$router.push({path:'/changepetweight',query: {pet: this.$route.query.pet,flag: this.flag}});
      },
      onConfirm(value) {
        let petId = this.$route.query.pet.id;
        if(value == '狗') this.pettype = 1;
        if(value == '猫') this.pettype = 2;
        if(value == '其他') this.pettype = 3;
        this.showPicker = false;
        console.log(this.pettype);
        // 上传后台
        setTimeout(() => {
          this.$getData("setMyPet", {
            petId: petId,petType:this.pettype
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('修改成功');
            }else{
              Toast('修改失败');
            }
          });
        }, 500);
      },
      deletePet() {
        //Toast("先确认 再删除宠物");
        let petId = this.$route.query.pet.id;
        setTimeout(() => {
          this.$getData("deleteMyPet", {
            petId: petId
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('删除成功！');
              this.$router.push({path:'/mypet',query: {flag: this.flag}});
            }else{
              Toast('删除失败！');
            }
          });
        }, 500);
      }
    },
    mounted() {


    }
  }
</script>

<style scoped>
  .headimg {
    color: #444444;
    font-size: 14px;
    margin-left: 15px;
    margin-top: 17px;
    height: 30px;
    line-height: 30px;
  }

  .text {
    color: #444444;
    font-size: 14px;
    margin-left: 15px;
    margin-top: 10px;
    height: 35px;
    line-height: 30px;
  }

  .text_1 {
    color: #aaaaaa;
    font-size: 14px;
    margin-left: 10px;
    margin-top: 10px;
    height: 35px;
    line-height: 30px;
  }
</style>
