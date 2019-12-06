<template>
  <div>
    <van-nav-bar
      title="宠物体重"
      left-text=""
      left-arrow
      @click-left="goBack"
    />

    <van-field
      readonly
      clickable
      label="体重"
      :value="weight"
      :placeholder="weight"
      @click="showPicker = true"
    />

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="weight-1"
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
    name: "changepetweight",
    data() {
      return{
        flag:0,
        lastPet:{},
        weight:0,
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
        let petId = this.lastPet.id;
        this.weight = value;
        this.showPicker = false;
        console.log(this.weight);
        setTimeout(() => {
          this.$getData("setMyPet", {
            petId: petId,petWeight:this.weight
          }).then(res => {
            var data = res.data;
            if(data==0){
              Toast('修改成功');
              this.lastPet.petWeight = this.weight;
              this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
            }else{
              Toast('修改失败');
            }
          });
        }, 500);
      },
    },
    mounted() {
      this.weight = this.$route.query.weight;
      for(let i=0;i<400;i++){
        this.columns[i]=i+1;
      }
    }
  }
</script>

<style scoped>

</style>
