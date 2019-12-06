<template>
  <div>
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="img" v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>

    <div style="height: 50px;"></div>
    <van-cell-group class="input">
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>

    <div style="height: 40px;"></div>
    <div style="width: 65%; margin: 0 auto;">
      <van-checkbox v-model="check_remember_pwd" class="check_remember_pwd" :icon-size="15">记住密码</van-checkbox>
      <van-checkbox v-model="check_auto_login" class="check_auto_login" :icon-size="15">自动登录</van-checkbox>
    </div>
    <div style="height: 40px;"></div>
    <div class="login_forgetpwd_register">
      <van-button type="info" size="large" class="login_btn" color="#2b609f" @click="login">
        登录
      </van-button>

      <div style="height: 10px;"></div>
      <input type="button" class="forget_pwd" value="忘记密码" @click="forgetPwd"a/>

      <div style="width:120px; float:right;">
        <p class="tip_register">还没有账户？</p>
        <input type="button" class="register" value="去注册" @click="register"a/>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Lazyload, Swipe, SwipeItem, Image, Field, CellGroup,Toast, Checkbox, CheckboxGroup, Button} from 'vant';

  Vue.use(Lazyload).use(Swipe).use(SwipeItem).use(Image).use(Field).use(CellGroup).use(Checkbox)
    .use(CheckboxGroup).use(Button);
  export default {
    data() {
      return {
        images: [ // 轮播图片列表
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-3.jpg'
        ],
        username: '', // 账号
        password: '', // 密码
        check_remember_pwd: true, // 是否记住密码
        check_auto_login: false,  // 是否自动登录
      }
    },
    created(){
      this.getAdvertiseImgList();
    },
    methods: {
      getAdvertiseImgList(){
        this.images = [];
        this.$getData('getAdvertiseImgList', {tag: 1}).then(res => {
          let data =res.data.advertiseImgList;
          console.log(data);
          data.map(item => {
            if(item.enable) this.images.push(item.banner);
          });
          console.log(this.swipeImgList);
        })
      },
      login(){
        setTimeout(() => {
          this.$getData("userLogin", {
            user: this.username,password: this.password
          }).then(res => {
            var data = res.data;
            console.log(data);
            if(data==0){
              localStorage.setItem('token', 0);
              localStorage.setItem('date',Date.now());
              Toast.success('登录成功！');
              let redirect = this.$route.query.redirect?this.$route.query.redirect:'/home';
              this.$router.replace(redirect);
            }else{
              Toast.success('登录失败,检查您的账号密码！');
            }
          });
        }, 100);
      },
      // 忘记密码
      forgetPwd() {
        this.$router.push('/forgetpwd');
      },
      // 去注册
      register() {
        this.$router.push('/register');
      }
    }
  }
</script>

<style>
  .img {
    width: 100%;
    height: 300px;
    margin: auto;
  }

  .input {
    width: 85%;
    margin: auto;
  }

  .swipe {
    width: 95%;
    height: 250px;
    margin: auto;
  }

  .check_remember_pwd {
    width: 40%;
    margin-top: -20px;
    font-size: 14px;
  }

  .check_auto_login {
    width: 40%;
    margin-top: -20px;
    float: right;
    font-size: 14px;
  }

  .login_forgetpwd_register {
    width: 85%;
    display: block;
    margin: 0 auto;
  }

  .login_btn {
    border-radius: 10px;
    border: 0;
  }

  .tip_register {
    font-size: 13px;
    margin-bottom: -18px; /* 将 注册 调到同一行 */
  }

  .register {
    font-size: 13px;
    border: 0;
    display: block;
    background: white;
    color: cadetblue;
    float: right;
  }

  .forget_pwd {
    font-size: 13px;
    border: 0;
    display: block;
    background: white;
    color: cadetblue;
    margin-bottom: -30px; /* 将 注册 调到同一行 */
  }
</style>
