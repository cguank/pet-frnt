<template>
  <div>
    <van-nav-bar
      title="宠物名称"
      left-text=""
      left-arrow
      @click-left="goBack"
    >
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="new_name" placeholder="请输入新名称"
                 clearable
                 right-icon="certificate" @click-right-icon="changeName"/>
    </van-cell-group>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Tab,Tabs,Icon,Toast,Image,Row, Col,List,Field } from 'vant';

  Vue.use(NavBar).use(Tab).use(Tabs).use(Icon).use(Toast).use(Image).use(Row).use(Col).use(List).use(Field);
  export default {
    name: "changepetname",
    data() {
      return{
        flag:0,
        lastPet:{},
        new_name:'',
      }
    },
    created(){
      this.lastPet = this.$route.query.pet;
      this.flag = this.$route.query.flag;
    },
    methods: {
      changeName() {
        //Toast("更改昵称");
        let petId = this.lastPet.id;
        console.log(this.new_name);
        setTimeout(() => {
          this.$getData("setMyPet", {
            petId: petId,petName:this.new_name
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('修改成功');
              this.lastPet.name = this.new_name;
              this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
              //this.$router.push({path:'/petdetail',query: {pet: this.lastPet}});
            }else{
              Toast('修改失败');
            }
          });
        }, 500);
      },
      goBack() {
        Toast("返回");
        //this.$router.go(-1);
        this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
      },
    }
  }
</script>

<style scoped>

</style>
