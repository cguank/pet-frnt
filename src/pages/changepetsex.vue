<template>
  <div>
    <van-nav-bar
      title="宠物性别"
      left-text=""
      left-arrow
      @click-left="goBack"
    />

    <van-field
      readonly
      clickable
      label="性别"
      :value="value"
      :placeholder="columns[sex]"
      @click="showPicker = true"
    />

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="sex"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Field,Toast,Popup,Picker } from 'vant';

  Vue.use(NavBar).use(Field).use(Toast).use(Popup).use(Picker);
  export default {
    name: "changepetsex",
    data() {
      return {
        flag:0,
        lastPet:{},
        value: '',
        sexFlag:1,
        showPicker: false,
        columns: ['GG', 'MM'],
        sex:0,  //男：0， 女：1
      }
    },
    created(){
      this.lastPet = this.$route.query.pet;
      this.sex = this.$route.query.pet.petSex-1;
      this.flag = this.$route.query.flag;
    },
    methods: {
      goBack() {
        // Toast('返回');
        //this.$router.go(-1);
        this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
      },
      onConfirm(value) {
        let petId = this.lastPet.id;
        console.log(value);
        if(value=='GG'){
          this.sexFlag = 1;
        }else{
          this.sexFlag = 2;
        }
        setTimeout(() => {
          this.$getData("setMyPet", {
            petId: petId,petSex:this.sexFlag
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('修改成功');
              this.lastPet.sex = value;
              this.lastPet.sex_img = (value=='GG')?'./static/images/male.png':'./static/images/female.png';
              this.lastPet.petSex = this.sexFlag;
              this.sex =  this.sexFlag-1;
              this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
            }else{
              Toast('修改失败');
            }
          });
        }, 500);
        this.showPicker = false;
      },
    },
    mounted() {
      if(this.$route.query.sex == 'GG'){
        console.log("sex == 'GG'");
        this.sex=0;
      }
      else if(this.$route.query.sex == 'MM'){
        console.log("sex == 'MM'");
        this.sex=1;
      }
      console.log(this.sex);
    }
  }
</script>

<style scoped>

</style>
