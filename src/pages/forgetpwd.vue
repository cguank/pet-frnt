<template>
    <div>
      <van-nav-bar
        title="找回密码"
        left-text="返回"
        left-arrow
        @click-left="toLogin"
      />

      <van-cell-group class="cell_group">
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="password"
          type="password"
          required
          label="密码"
          placeholder="请输入密码"
        />
        <van-field
          id="checkpwd"
          v-model="password_again"
          type="password"
          required
          label="密码"
          placeholder="请再次输入密码"
          @blur="checkPwd"
          @click="setColorBlack"
          required
        />

        <van-field
          v-model="phone"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="sms"
          required
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button plain slot="button" size="small" type="primary" color="#777777" @click="sendSms"  :disabled="disabled">
            <template v-if="sending">
              获取验证码
            </template>
            <template v-else>
              {{this.second}}秒后重发
            </template>
          </van-button>
        </van-field>
      </van-cell-group>

      <div style="height: 40px;"></div>
      <van-button color="#888888" type="info" class="confirm_btn" @click="changePwd">
        确认修改
      </van-button>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Field,CellGroup,Toast,Picker,Popup,Button } from 'vant';
  Vue.use(NavBar).use(Field).use(CellGroup).use(Toast).use(Picker).use(Popup).use(Button);
  export default {
    name: "forgetpwd",
    data() {
      return {
        username: '', // 账号
        password: '', // 新密码
        password_again: '', // 再次输入密码
        phone:'', // 手机号
        sms:'',   // 验证码
        sending: true,     //是否发送验证码
        disabled: false,   //是否禁发验证码
        second:60,        //倒计时间
      }
    },
    methods: {
      // 返回登陆页
      toLogin() {
        this.$router.push('/login');
      },
      // 检查两次密码一致
      checkPwd() {
        if(this.password != this.password_again){
          Toast("两次密码须一致");
          document.getElementById("checkpwd").style="color: red;";
        }
      },
      setColorBlack() {
        document.getElementById("checkpwd").style="color: black;";
      },
      // 发送验证码
      sendSms() {
        if( !this.sending )
          return;
        this.$getData("sendCode", {
          phoneNumber:this.phone,
          type:2
        }).then(res => {
          // Toast('发送验证码');
          // 点击发送后
          this.sending  = false;
          this.disabled = true;
          this.timeDown();
        }).catch(res => {
          Toast('发送失败');
        });
      },
      timeDown() {
        let result = setInterval( ()=>{
          --this.second;
          if(this.second < 0)
          {
            clearInterval(result);
            this.sending  = true;
            this.disabled = false;
            this.second = 60;
          }
        }, 1000);
      },
      // 确认设置新密码
      changePwd() {
        if (this.phone == '' || this.username == '' || this.password || this.sms == '') {
          Toast('打星号为必填项');
        } else {
          this.$getData("forgetPassword", {
            phone: this.phone,
            sms: this.sms,
            username: this.username,
            password: this.password
          }).then(res => {
            if (res.data == 0) {
              Toast('新密码已设置，不要再忘啦');
            } else if (res.data == 1) {
              Toast("账号不存在");
            } else if (res.data == 2) {
              Toast("绑定手机号错误");
            } else if (res.data == 3) {
              Toast("验证码错误");
            } else {
              Toast("服务器繁忙");
            }
          }).catch(res => {
            Toast('修改密码失败');
          });
        }
      }
    }
  }
</script>

<style scoped>
  .cell_group {
    width: 90%;
    margin: 0 auto;
  }

  .confirm_btn {
    width: 85%;
    display: block;
    margin: 0 auto;
    border-radius: 10px;
  }
</style>
