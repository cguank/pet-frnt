<template>
  <div>
    <van-nav-bar
      title="添加好友"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group>
      <van-field v-model="find_friend" placeholder="请输入用户名" @focus="find_finished = false;"
                 right-icon="search" @click-right-icon="Find"/>
    </van-cell-group>
    <div v-if="find_finished == true && find_success == false" style="margin-top: 10px; font-size: 12px; color: #999999; text-align: center;">未找到匹配用户</div>
    <div v-if="find_finished == true && find_success == true" >
      <div style="height: 5px; background: #eeeeee; "></div>
      <van-list
        v-model="loadMoreFriend.loading"
        :finished="loadMoreFriend.finished"
        :offset="5"
        finished-text="没有更多了"
        @load="onLoadFriend"
      >
        <div v-for="item in resultList" :key="item.id">
          <div style="height: 10px;"></div>
          <van-row>
            <van-col span="1"></van-col>
            <van-col span="20"  @click="gotoUserPage(item.id)">
              <div style="height: 50px;">
                <van-image
                  round
                  width="3rem"
                  height="3rem"
                  fit="cover"
                  :src="item.headimg"
                />
                <div class="friend_name">
                  <span>{{item.nickname}}</span>
                  <van-image
                    round
                    width="1rem"
                    height="1rem"
                    fit="cover"
                    :src="item.sex_icon"
                  />
                </div>
                <div style="font-size: 12px; color: #bbbbbb; margin-left: 58px; margin-top: -2px;">{{item.introduction}}</div>
              </div>
            </van-col>
          </van-row>
          <div style="height: 1px; background: #eeeeee; margin-top: 5px;"></div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Field,CellGroup,Image,Row,Col,List } from 'vant';
  import { addList } from "@/assets/js/utils";

  Vue.use(NavBar).use(Toast).use(Field).use(CellGroup).use(Image).use(Row).use(Col).use(List);
  export default {
    name: "addfriends",
    data() {
      return{
        currentPageFF:1,
        currentPageF:1,
        friendNum:0,
        find_friend:'',
        find_finished:false,  // 是否查找结束
        find_success:false,  // 是否查找到结果
        resultList:[],
        loadMoreFriend:{
          loading:false,
          finished:false,
        }
      }
    },
    methods: {
      onClickLeft() {
        Toast('返回');
        this.$router.go(-1);
      },
      onLoadFriend() {
        console.log("加载部分执行");
        this.loadMoreFriend.loading = true;
        console.log(this.find_friend);
        if(this.find_friend!='') {
          setTimeout(() => {
            this.$getData("getUserListByName", {
              currentPage: this.currentPageFF,
              searchKey: this.find_friend
            }).then(res => {
              var data = res.data.userList;
              //console.log(data);
              //console.log(data.length);
              if (data) {
                data.map(item => {
                  item.headimg = item.headImg;
                  item.sex_icon = (item.sex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.resultList, data);
              }
              if (this.friendNum == 0) {
                this.find_success = false;
                //未匹配结束
                this.loadMoreFriend.finished = true;
              } else this.find_success = true;
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreFriend.loading = false;
                this.loadMoreFriend.finished = true;
              } else {
                this.loadMoreFriend.loading = false;
                this.currentPageFF++;
              }
            });
          }, 500);
        }else{
          this.resultList=[];
        }
      },
      Find() {
        this.find_finished = true;
        this.find_success = true;
        this.loadMoreFriend.finished = false;
        Toast("查找好友");
        if (this.find_friend != '') {
          setTimeout(() => {
            this.$getData("getUserListByName", {
              searchKey: this.find_friend
            }).then(res => {
              var data = res.data.userList;
              this.friendNum = res.data.total;
              console.log(this.friendNum);
              if (this.friendNum == 0) {
                this.find_success = false;
              } else this.find_success = true;
              console.log(this.find_success);
            });
          }, 500);
        }else{
          this.find_success = false;
        }
        this.resultList = [];
      },
      gotoUserPage(id) {
        Toast("前往用户主页");
        this.$router.push({path:'/userpage',query:{flag: 1, id: id}});  // flag为1表示查看他人
      },
    },
    mounted() {
      this.resultList=[];
    }
  }
</script>

<style scoped>
  .friend_name {
    margin-top: -50px;
    margin-left: 58px;
    font-size: 16px;
    line-height: 30px;
    color: #555555;
  }
</style>
