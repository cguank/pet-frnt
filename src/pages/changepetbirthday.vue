<template>
  <div>
    <van-nav-bar
      title="修改生日"
      left-text=""
      left-arrow
      @click-left="goBack"
    />

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

  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Field,Popup,Picker,CellGroup,DatetimePicker,Uploader } from 'vant';
  Vue.use(NavBar).use(Toast).use(Field).use(Popup).use(Picker).use(CellGroup).use(DatetimePicker).use(Uploader);
    export default {
        name: "changepetbirthday",
      data() {
        return{
          flag:0,
          lastPet:{},
          birthday:'',
          date_showPicker:false,
          minDate: new Date(2000,1,1),
          maxDate: new Date(),
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
          let petId = this.lastPet.id;
          this.birthday = this.formatDate(value); // 转化为 yyyy-MM-dd
          this.date_showPicker = false;
          setTimeout(() => {
            this.$getData("setMyPet", {
              petId: petId,petBirthday:this.birthday
            }).then(res => {
              var data = res.data;
              if(data==0){
                Toast('修改成功');
                this.lastPet.petBirthday = this.birthday;
                this.$router.push({path:'/petdetail',query: {pet: this.lastPet,flag:this.flag}});
              }else{
                Toast('修改失败');
              }
            });
          }, 500);
        },
      },
      mounted() {
        this.birthday = this.$route.query.birthday;
      }
    }
</script>

<style scoped>

</style>
