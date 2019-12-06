<template>
  <div>
    <van-nav-bar
      title="个人中心"
      @click-right="addFriend"
    >
      <van-icon name="./static/images/addfriends.png" slot="right" size="25"/>
    </van-nav-bar>

    <van-row @click="goUserPage">
      <van-col span="6">
        <div class="headimg">
          <van-image
            round
            width="4rem"
            height="4rem"
            :src=headImg
          />
        </div>
      </van-col>
      <van-col span="12">
        <div class="user_info">
        <div>
          {{this.nickname}}
          <img
            class="user_sex"
            v-bind:src="sex_icon"
          />
<!--          <div class="user_level">Lv0</div>-->
        </div>
        <div class="user_id">
          账号：{{this.id}}
        </div>
      </div>
      </van-col>
      <van-col span="6">
        <div class="user_page_btn">个人主页 ></div>
      </van-col>
    </van-row>

    <div style="height: 20px;"></div>
    <van-row>
      <van-col span="4"></van-col>
      <van-col span="10">

        <div @click="goAuthenticated" v-if="this.expert_authenticating == false">
          <img v-bind:src="this.expert_unauthenticated_img" class="expert_unauthenticated_img" style="margin-top: -8px;"/>
          <span class="text_unauthenticated">专家认证</span>
        </div>
        <div v-else>
          <div @click="goCheckAuthenticating" v-if="this.get_authenticate_result == false">
            <img v-bind:src="this.expert_authenticating_img" class="expert_authenticating_img" style="margin-top: -4px;"/>
            <span class="text_authenticating">认证中</span>
          </div>
          <div v-else>
            <div v-if="this.expert_authenticated == true">
              <img v-bind:src="this.expert_authenticated_img" class="expert_authenticated_img" style="margin-top: -4px;"/>
              <span class="text_authenticated">已认证</span>
            </div>
            <div @click="goAuthenticateAgain" v-else>
              <img v-bind:src="this.expert_authenticate_failed_img" class="expert_authenticated_img" style="margin-top: -4px;"/>
              <span class="text_authenticate_failed">认证失败</span>
            </div>
          </div>
        </div>

      </van-col>
      <van-col span="8">
        <div @click="goComment">
          <van-icon name="comment-o" class="daily_sign_img" size="22" :info="this.unread_message_num" />
          <span class="text_1">消息</span>
        </div>
      </van-col>
    </van-row>

<!--
    <div style="height: 15px;"></div>
    <div style="height: 10px; background: #eeeeee"></div>
    <div style="height: 15px;"></div>
    <van-row type="flex" justify="space-around">
      <van-col span="1">
        <span class="block_num_1">{{this.diamond_num}}</span>
      </van-col>
      <van-col span="1">
        <span class="block_num_2">{{this.coin_num}}</span>
      </van-col>
      <van-col span="1">
        <span class="block_num_3">{{this.ticket_num}}</span>
      </van-col>
      <van-col span="1">
        <span class="block_num_4">{{this.gift_num}}</span>
      </van-col>
    </van-row>
    <div style="height: 5px;"></div>
    <van-row type="flex" justify="space-around">
      <van-col span="2">
        <span class="block_text">文本</span>
      </van-col>
      <van-col span="2">
        <span class="block_text">文本</span>
      </van-col>
      <van-col span="2">
        <span class="block_text">文本</span>
      </van-col>
      <van-col span="2">
        <span class="block_text">文本</span>
      </van-col>
    </van-row>
    -->

    <div style="height: 15px;"></div>
    <div style="height: 10px; background: #eeeeee"></div>
    <div style="height: 20px;"></div>
    <div style="height: 30px; font-size: 15px; color:#333333; margin-left: 10px; margin-top: -10px; line-height: 30px;">日常管理</div>
    <div style="height: 10px;"></div>
    <div style="height: 2px; background: #eeeeee;"></div>
    <!--
    <van-row type="flex" justify="space-around">
      <van-col span="2">
        <div @click="goPet">
         <img v-bind:src="this.dog_icon" class="dog_icon"/>
        </div>
      </van-col>
      <van-col span="2">
        <div @click="goFriend">
          <img v-bind:src="this.friend_icon" class="friend_icon"/>
        </div>
      </van-col>
      <van-col span="2">
        <div @click="goCommunity">
          <img v-bind:src="this.community_icon" class="community_icon"/>
        </div>
      </van-col>
      <van-col span="2">
        <div @click="goSelect">
          <img v-bind:src="this.select_icon" class="select_icon"/>
        </div>
      </van-col>
    </van-row>
    <div style="height: 5px;"></div>
    <van-row type="flex" justify="space-around">
      <van-col span="2">
        <span class="block_text">宠物</span>
      </van-col>
      <van-col span="2">
        <span class="block_text">宠友</span>
      </van-col>
      <van-col span="2">
        <span class="block_text">社区</span>
      </van-col>
      <van-col span="2">
        <span class="block_text">收藏</span>
      </van-col>
    </van-row>
    <div style="height: 15px;"></div>
    <div style="height: 10px; background: #eeeeee"></div>
    -->

    <van-grid :border="false" :column-num="2" square border>
      <van-grid-item @click="goPet">
        <van-image :src="this.pet_icon" style="height: 80px; width:80px;"/>
        <span class="block_text">宠物</span>
      </van-grid-item>

      <van-grid-item @click="goFriend">
        <van-image :src="this.friend_icon" style="height: 80px; width:80px;"/>
        <span class="block_text">宠友</span>
      </van-grid-item>

      <van-grid-item @click="goCommunity">
        <van-image :src="this.community_icon" style="height: 80px; width:80px;"/>
        <span class="block_text">社区</span>
      </van-grid-item>

      <van-grid-item @click="goSelect">
        <van-image :src="this.select_icon" style="height: 80px; width:80px;"/>
        <span class="block_text">收藏</span>
      </van-grid-item>

      <van-grid-item @click="goMyCounsel">
        <van-image :src="this.counsel_icon" style="height: 80px; width:80px;"/>
        <span class="block_text">我的问诊</span>
      </van-grid-item>
      <van-grid-item @click="loginOutFun">
        <van-image :src="this.loginOut" style="height: 80px; width:80px;"/>
        <span class="block_text">退出登录</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Image,Toast,Icon,Button,Row,Col,Grid,GridItem } from 'vant';
  Vue.use(NavBar).use(Image).use(Toast).use(Icon).use(Button).use(Row).use(Col).use(Grid).use(GridItem);
  export default {
    name: "usercenter",
    data() {
      return{
        headImg:'',
        role:0, //1-用户 2-专家
        id:'',
        nickname:'',
        sex:'',
        sex_icon:'',
        expert_authenticated_img:'./static/images/expert_authenticated.png',
        expert_authenticating_img:'./static/images/expert_authenticating.png',
        expert_unauthenticated_img:'./static/images/expert_unauthenticated.png',
        expert_authenticate_failed_img:'./static/images/authenticate_failed.png',
        daily_sign_img:'./static/images/daily.png',
        comment_img:'./static/images/comment.png',
        diamond_num:0,
        coin_num:66,
        ticket_num:3,
        gift_num:0,
        pet_icon: './static/images/pet_icon.png',
        friend_icon: './static/images/friends.png',
        community_icon: './static/images/community.png',
        select_icon: './static/images/select.png',
        counsel_icon: './static/images/counsel.png',
        loginOut: './static/images/login-out.svg',
        unread_message_num: '',
        expert_authenticating: '',  // 提交审核  true：已提交审核  false：未提交过审核
        get_authenticate_result: '',  // 得到审核结果  true：已得到审核结果   false：未提交或未得到结果
        expert_authenticated: '',  // 审核结果     true：审核通过   false：审核失败
      }
    },
    created() {
      //判断当前是专家还是用户
      setTimeout(() => {
        this.$getData("judgeExpertOrNot", {
        }).then(res => {
          var data = res.data;
          this.role = data;
        });
      }, 100);
    },
    methods: {
      // 返回上一页
      goBack() {
        Toast("返回首页");
        // this.$router.go(-1);
        this.$router.push('/home');
      },
      addFriend() {
        Toast("前往添加好友界面");
        this.$router.push('/addfriends');
      },
      goUserPage() {
        Toast("前往个人主页界面");
        this.$router.push({path:'/userpage',query: {page:0}});
      },
      // flag1: 是否需要再下个页面获取后台已填写过的数据; flag2: 是否允许编辑
      goAuthenticated() {
        Toast("去认证");
        this.$router.push({path:'/expertauthenticate',query:{flag1: false, flag2: false}});  // 传入标志位 不获取 不禁用编辑
      },
      goCheckAuthenticating() {
        Toast("查看审核进度");
        this.$router.push({path:'/authenticate',query:{flag1: true, flag2: true}});  // 传入标志位 获取 禁用编辑
      },
      goAuthenticateAgain(){
        Toast("再次提交审核");
        this.$router.push({path:'/authenticate',query:{flag1: true, flag2: false}});  // 传入标志位 获取 不禁用编辑
      },
      goComment() {
        Toast("去消息");
        //this.$router.push('/login');
        this.$router.push({path:'/likesanddiscuss',query: {page:0}});
      },
      goPet() {
        Toast("前往宠物界面");
        //this.$router.push('/mypet');
        this.$router.push({path:'/mypet',query: {flag:1}});
      },
      goFriend() {
        Toast("前往宠友界面");
        this.$router.push('/friends');
      },
      goCommunity() {
        Toast("前往社区界面");
        //this.$router.push('/login');
      },
      goSelect() {
        Toast("前往收藏界面");
        this.$router.push('/collect');
      },
      goMyCounsel() {
        Toast("前往我的问诊界面");
        this.$router.push({
          path: "/mycounsel",
          query: {
            role: this.role,
          }
        });
      },
      loginOutFun(){
        localStorage.clear();
        Toast('退出成功');
        this.$router.push('/home');
      }
    },
    mounted() {
      this.$getData('getUserHomePageInfo', {}).then(res => {
        let userInfo = res.data.basicInfo.userInfo;
        console.log("userInfo:", userInfo);
        this.headImg = userInfo.headImg;
        this.id = userInfo.id;
        this.nickname = userInfo.nickname;
        this.sex = userInfo.sex;
        this.sex_icon = userInfo.sex == 1 ? "./static/images/male.png" : "./static/images/female.png";

        let verifyInfo = res.data.verifyInfo;
        console.log("verifyInfo:", verifyInfo);
        this.expert_authenticating = verifyInfo.expert_authenticating;  // 提交审核  true：已提交审核  false：未提交过审核
        this.get_authenticate_result = verifyInfo.get_authenticate_result;  // 得到审核结果  true：已得到审核结果   false：未提交或未得到结果
        this.expert_authenticated = verifyInfo.expert_authenticated;  // 审核结果     true：审核通过   false：审核失败

        this.unread_message_num = res.data.unReadNum;// 未读消息数
      });
    },
  }
</script>

<style scoped>
  .headimg {
    margin-top: 10px;
    margin-left: 10px;
    width: 20%;
  }

  .user_info {
    margin-top: 20px;
    width: 70%;
  }

  .user_sex {
    margin-left: 5px;
    margin-top: -5px;
    height: 12px;
    width: 12px;
  }

  .user_level {
    margin-top: -15px;
    margin-left: 65px;
    background: #eeeeee;
    color: #553322;
    font-size: 9px;
    text-align: center;
    width: 20px;
    height: 12px;
    border-radius: 6px;
  }

  .user_id {
    margin-top: 12px;
    font-size: 12px;
    color: #999999;
  }

  .user_page_btn {
    margin-top: 30px;
    margin-left: 10px;
    font-size: 12px;
    color: #bbbbbb;
  }

  .expert_unauthenticated_img {
    height: 30px;
    width: 30px;
  }

  .expert_authenticating_img {
    height: 25px;
    width: 25px;
  }

  .expert_authenticated_img {
    height: 25px;
    width: 25px;
  }

  .text_1 {
    font-size: 12px;
    margin-left: 5px;
    color: #999999;
  }

  .text_unauthenticated {
    font-size: 12px;
    color: #999999;
  }

  .text_authenticating {
    font-size: 12px;
    color: #999999;
  }

  .text_authenticated {
    font-size: 12px;
    color: #bbbbbb;
  }

  .text_authenticate_failed {
    font-size: 12px;
    color: #971a1a;
  }

  .block_num_1 {
    font-size: 14px;
    color: #333333;
  }

  .block_num_2 {
    font-size: 14px;
    color: #333333;
  }

  .block_num_3 {
    font-size: 14px;
    color: #333333;
  }

  .block_num_4 {
    font-size: 14px;
    color: #333333;
  }

  .block_text {
    margin-top: 10px;
    font-size: 14px;
    color: #777777;
  }

  .dog_icon {
    margin: 0 auto;
    height: 70px;
    width: 70px;
  }

  .friend_icon {
    height: 25px;
    width: 25px;
  }

  .community_icon {
    height: 25px;
    width: 25px;
  }

  .select_icon {
    height: 20px;
    width: 20px;
  }
</style>
