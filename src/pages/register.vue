<template>
  <div>
    <van-nav-bar
      title="用户注册"
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
        readonly
        clickable
        required
        label="性别"
        :value="sex"
        placeholder="选择性别"
        @click="showPickerSex = true"
      />
      <van-popup v-model="showPickerSex" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsSex"
          @cancel="showPickerSex = false"
          @confirm="onConfirmSex"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        required
        label="类别"
        :value="type"
        placeholder="选择类别"
        @click="showPickerType = true"
      />
      <van-popup v-model="showPickerType" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsType"
          @cancel="showPickerType = false"
          @confirm="onConfirmType"
        />
      </van-popup>

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
    <van-button color="#888888" type="info" class="register_btn" @click="register">
      注册
    </van-button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Field,CellGroup,Toast,Picker,Popup,Button} from 'vant';
  Vue.use(NavBar).use(Field).use(CellGroup).use(Toast).use(Picker).use(Popup).use(Button);

    export default {
      name: "register",
      data(){
        return{
          username: '',   // 账号
          password: '',   // 密码
          password_again: '',     // 再次输入密码
          sex: '', // 性别
          sexIndex:0,
          showPickerSex: false,  // 是否显示性别列表
          columnsSex: ['男','女'],
          type: '',               // 类型
          showPickerType: false,  // 是否显示类型列表
          columnsType: [],
          typeIndex:0,
          phone:'', // 手机号
          sms:'',   // 验证码
          sending: true,     //是否发送验证码
          disabled: false,   //是否禁发验证码
          second:60,        //倒计时间
        }
      },
      created(){
        this.$getData("getMemberAllType", {}).then(res => {
          var data=res.data.typeList;
          if (data) {
            data.map(item => {
              this.columnsType.push(item.type);
            });
          }

        }).catch(res => {
          Toast('获取列表失败');
        });
      },
      methods: {
        // 返回登录页
        toLogin() {
          this.$router.push('/login');
        },
        // 检查两次密码
        checkPwd() {
          if(this.password != this.password_again){
            Toast("两次密码须一致");
            document.getElementById("checkpwd").style="color: red;";
          }
        },
        setColorBlack() {
          document.getElementById("checkpwd").style="color: black;";
        },
        // 选择性别、类型
        onConfirmSex(value,index) {
          this.sex =value;
          this.sexIndex=index+1;
          this.showPickerSex = false;
        },
        onConfirmType(value,index) {
          this.typeIndex = index+1;
          this.type = value;
          this.showPickerType = false;
        },
        // 发送验证码
        sendSms() {
          if( !this.sending )
            return;
          this.$getData("sendCode", {
             phoneNumber:this.phone,
             type:1
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
        // 确认注册
        register() {
          if (this.password != this.password_again) {
            Toast("两次密码须一致");
            document.getElementById("checkpwd").style = "color: red;";
            return false;
          }
          if (this.phone == '' || this.username == '' || this.password == '' || this.sexIndex == '' || this.typeIndex == ''||this.sms == '') {
            Toast("打星号为必填项");
          } else {
            this.$getData("register", {
              phone: this.phone,
              username: this.username,
              password: this.password,
              sex: this.sexIndex,
              type: this.typeIndex,
              sms: this.sms
            }).then(res => {
              if (res.data == 0) {
                this.$router.push('/registersuccess');
              } else if (res.data == 1) {
                Toast("账号已存在");
              } else if (res.data == 2) {
                Toast("验证码错误");
              } else {
                Toast("服务器繁忙");
              }
            }).catch(res => {
              Toast('注册失败');
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

  .register_btn {
    width: 85%;
    display: block;
    margin: 0 auto;
    border-radius: 10px;
  }
</style>
