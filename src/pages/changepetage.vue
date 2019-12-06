<template>
  <div>
    <van-nav-bar
      title="修改年龄"
      left-text=""
      left-arrow
      @click-left="goBack"
    />

    <van-field
      readonly
      clickable
      label="年龄"
      :value="new_age"
      :placeholder="new_age"
      @click="showPicker = true"
    />

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="new_age-1"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Field,Popup,Picker } from 'vant';

  Vue.use(NavBar).use(Toast).use(Field).use(Popup).use(Picker);
  export default {
    name: "changepetage",
    data() {
      return{
        flag:0,
        lastPet:{},
        new_age:0,
        showPicker: false,
        columns: [],
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
      onConfirm(value) {
        this.new_age = value;
        let petId = this.lastPet.id;
        this.showPicker = false;
        console.log(this.new_age);
        setTimeout(() => {
          this.$getData("setMyPet", {
            petId: petId,petAge:this.new_age
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('修改成功');
              this.lastPet.age = this.new_age;
              this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
            }else{
              Toast('修改失败');
            }
          });
        }, 500);
      },
    },
    mounted() {
      this.new_age = this.$route.query.pet.age;
      for(let i=0;i<100;i++){
        this.columns[i]=i+1;
      }
    }
  }
</script>

<style scoped>

</style>
