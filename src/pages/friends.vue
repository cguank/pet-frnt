<template>
  <div>
    <van-icon name="./static/images/addfriends.png" class="addfriends_icon" size="20" @click="addFriends"/>
    <van-icon name="arrow-left" class="back_icon" size="20" @click="goBack"/>
    <van-tabs v-model="active" animated swipeable style="margin-top: -35px; position:relative; z-index: 1;">
      <van-tab title="好友" v-if="this.$route.query.flag != 1">
        <van-cell-group>
          <van-field v-model="find_friend" placeholder="请输入用户名"
                     right-icon="search" @click-right-icon="find_friends"/>
        </van-cell-group>
        <div style="height: 5px; background: #eeeeee; " v-if="finding_friend_finished == false"></div>
        <van-list
          v-model="loadMore.loading"
          :finished="loadMore.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadFriend"
        >
          <div v-for="item in friends" :key="item.id">
            <div style="height: 10px;"></div>
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="20" @click="gotoUserPage(item.id)">
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

        <!-- 查找 -->
      <!--  <div v-if="finding_friend_finished == true && finding_friend_success == false" style="margin-top: 10px; font-size: 12px; color: #999999; text-align: center;">未找到匹配用户</div>
        <div v-if="finding_friend_finished == true && finding_friend_success == true" >
          <div style="height: 5px; background: #eeeeee; "></div>
          <van-list
            v-model="loadMore.loading"
            :finished="loadMore.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="onLoadFriend"
          >
            <div v-for="item in find_friend_result" :key="item.id">
              <div style="height: 10px;"></div>
              <van-row>
                <van-col span="1"></van-col>
                <van-col span="20" @click="gotoUserPage(item.id)">
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
        </div>-->
      </van-tab>

      <van-tab title="关注">

        <van-cell-group>
          <van-field v-model="find_myfocus" placeholder="请输入用户名"
                     right-icon="search" @click-right-icon="find_focus"/>
        </van-cell-group>
        <div style="height: 5px; background: #eeeeee; " v-if="finding_focus_finished == false"></div>
        <van-list
          v-model="loadMoreFocus.loading"
          :finished="loadMoreFocus.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadFocus"
        >
          <div v-for="item in focus" :key="item.id">
            <div style="height: 10px;"></div>
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="20" @click="gotoUserPage(item.id)">
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

<!--        &lt;!&ndash; 查找 &ndash;&gt;
        <div v-if="finding_focus_finished == true && finding_focus_success == false" style="margin-top: 10px; font-size: 12px; color: #999999; text-align: center;">未找到匹配用户</div>
        <div v-if="finding_focus_finished == true && finding_focus_success == true" >
          <div style="height: 5px; background: #eeeeee; "></div>
          <van-list
            v-model="loadMoreFocus.loading"
            :finished="loadMoreFocus.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="onLoadFocus"
          >
            <div v-for="item in find_focus_result" :key="item.id">
              <div style="height: 10px;"></div>
              <van-row>
                <van-col span="1"></van-col>
                <van-col span="20" @click="gotoUserPage(item.id)">
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
        </div>-->
      </van-tab>

      <van-tab title="粉丝">

        <van-cell-group>
          <van-field v-model="find_myfans" placeholder="请输入用户名"
                     right-icon="search" @click-right-icon="find_fans"/>
        </van-cell-group>
        <div style="height: 5px; background: #eeeeee; " v-if="finding_fans_finished == false"></div>
        <van-list
          v-model="loadMoreFans.loading"
          :finished="loadMoreFans.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadFans"
        >
          <div v-for="item in fans" :key="item.id">
            <div style="height: 10px;"></div>
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="20" @click="gotoUserPage(item.id)">
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

        <!-- 查找 -->
<!--        <div v-if="finding_fans_finished == true && finding_fans_success == false" style="margin-top: 10px; font-size: 12px; color: #999999; text-align: center;">未找到匹配用户</div>
        <div v-if="finding_fans_finished == true && finding_fans_success == true" >
          <div style="height: 5px; background: #eeeeee; "></div>
          <van-list
            v-model="loadMoreFans.loading"
            :finished="loadMoreFans.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="onLoadFans"
          >
            <div v-for="item in find_fans_result" :key="item.id">
              <div style="height: 10px;"></div>
              <van-row>
                <van-col span="1"></van-col>
                <van-col span="20" @click="gotoUserPage(item.id)">
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
        </div>-->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tab,Tabs,Icon,Toast,Image,Row, Col,List,Field,CellGroup } from 'vant';
  import { addList } from "@/assets/js/utils";

  Vue.use(Tab).use(Tabs).use(Icon).use(Toast).use(Image).use(Row).use(Col).use(List).use(Field).use(CellGroup);
  export default {
    name: "friends",
    data() {
      return {
        active:0,  // 进入页面时默认标签
        friends:[],
        focus:[],
        fans:[],
        currentPageF:1,
        currentPageC:1,
        currentPageS:1,
        currentPageFF:1,
        currentPageCC:1,
        currentPageSS:1,
        loadMore: {
          loading: false,
          finished: false,
        },
        loadMoreFocus: {
          loading: false,
          finished: false,
        },
        loadMoreFans: {
          loading: false,
          finished: false,
        },
        find_friend:'',
        find_myfocus:'',
        find_myfans:'',
        findFriendNum:0,

        // 搜索结果显示暂未添加！！！参照addfriends
        find_friend_result:[],    // 查找结果
        find_focus_result:[],
        find_fans_result:[],
        finding_friend_success:false,  // 是否成功
        finding_focus_success:false,
        finding_fans_success:false,
        finding_friend_finished:false,  // 进行查找 结束
        finding_focus_finished:false,
        finding_fans_finished:false,

      }
    },
    methods: {
      goBack(){
        Toast("返回");
        this.$router.go(-1);
      },
      addFriends() {
        Toast("添加好友");
        this.$router.push('/addfriends');
      },
      onLoadFriend() {
        this.loadMore.loading = true;
        console.log(this.find_friend);
        // 异步更新数据
        if(this.find_friend=='') {
          console.log("执行1部分");
          setTimeout(() => {
            this.$getData("getMyFriends", {
              currentPage: this.currentPageF
            }).then(res => {
              var data = res.data.friendsList;
              //console.log(data);
              //console.log(data.length);
              this.friendNum = res.data.total;
              //console.log(this.friendNum);
              if (data) {
                data.map(item => {
                  item.id = item.friendId;
                  item.headimg = item.headImg;
                  item.nickname = item.friendName;
                  item.sex_icon = (item.friendSex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.friends, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMore.loading = false;
                this.loadMore.finished = true;
              } else {
                this.loadMore.loading = false;
                this.currentPageF++;
              }
            });
          }, 500);
        }else{
          console.log("执行2部分");
          setTimeout(() => {
            this.$getData("getMyFriendsByName", {
              currentPage: this.currentPageFF,
              searchKey:this.find_friend
            }).then(res => {
              var data = res.data.friendsList;
              //console.log(data);
              //console.log(data.length);
              this.friendNum = res.data.total;
              //console.log(this.friendNum);

              if (data) {
                data.map(item => {
                  item.id = item.friendId;
                  item.headimg = item.headImg;
                  item.nickname = item.friendName;
                  item.sex_icon = (item.friendSex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.friends, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMore.loading = false;
                this.loadMore.finished = true;
              } else {
                this.loadMore.loading = false;
                this.currentPageFF++;
              }
            });
          }, 500);
        }
      },
      onLoadFocus() {
        this.loadMoreFocus.loading = true;
        // 异步更新数据
        if(this.find_myfocus=='') {
          setTimeout(() => {
            this.$getData("getMyConcerns", {
              currentPage: this.currentPageC
            }).then(res => {
              var data = res.data.concernList;
              //console.log(data);
              //console.log(data.length);
              this.focusNum = res.data.total;
              //console.log(this.focusNum);

              if (data) {
                data.map(item => {
                  item.id = item.targetId;
                  item.headimg = item.headImg;
                  item.nickname = item.targetName;
                  item.sex_icon = (item.targetSex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.focus, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreFocus.loading = false;
                this.loadMoreFocus.finished = true;
              } else {
                this.loadMoreFocus.loading = false;
                this.currentPageC++;
              }
            });
          }, 500);
        }else{
          setTimeout(() => {
            this.$getData("getMyConcernsByName", {
              currentPage: this.currentPageCC,
              searchKey:this.find_myfocus
            }).then(res => {
              var data = res.data.concernList;
              //console.log(data);
              //console.log(data.length);
              this.focusNum = res.data.total;
              //console.log(this.focusNum);
              if (data) {
                data.map(item => {
                  item.id = item.targetId;
                  item.headimg = item.headImg;
                  item.nickname = item.targetName;
                  item.sex_icon = (item.targetSex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.focus, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreFocus.loading = false;
                this.loadMoreFocus.finished = true;
              } else {
                this.loadMoreFocus.loading = false;
                this.currentPageCC++;
              }
            });
          }, 500);
        }
      },
      onLoadFans() {
        this.loadMoreFans.loading = true;
        // 异步更新数据
        if(this.find_myfans=='') {
          console.log("执行第一部分");
          setTimeout(() => {
            this.$getData("getMyFans", {
              currentPage: this.currentPageS
            }).then(res => {
              var data = res.data.fansList;
              //console.log(data);
              //console.log(data.length);
              this.focusNum = res.data.total;
              //console.log(this.focusNum);
              if (data) {
                data.map(item => {
                  item.id = item.fansId;
                  item.headimg = item.headImg;
                  item.nickname = item.fansName;
                  item.sex_icon = (item.fansSex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.fans, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreFans.loading = false;
                this.loadMoreFans.finished = true;
              } else {
                this.loadMoreFans.loading = false;
                this.currentPageS++;
              }
            });
          }, 500);
        }else{
          console.log("执行第2部分");
          setTimeout(() => {
            this.$getData("getMyFansByName", {
              currentPage: this.currentPageSS,
              searchKey:this.find_myfans
            }).then(res => {
              var data = res.data.fansList;
              //console.log(data);
              //console.log(data.length);
              this.focusNum = res.data.total;
              //console.log(this.focusNum);
              if (data) {
                data.map(item => {
                  item.id = item.fansId;
                  item.headimg = item.headImg;
                  item.nickname = item.fansName;
                  item.sex_icon = (item.fansSex == 2) ? './static/images/female.png' : './static/images/male.png';
                });
                addList(this.fans, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreFans.loading = false;
                this.loadMoreFans.finished = true;
              } else {
                this.loadMoreFans.loading = false;
                this.currentPageSS++;
              }
            });
          }, 500);
        }
      },
      find_friends() {
        Toast("查找好友");
        //console.log(this.find_friend);
        this.finding_friend_finished = true;
        this.finding_friend_success = true;
        this.friends = [];
        this.loadMore.loading = false;
        this.loadMore.finished = false;
      },
      find_focus() {
        Toast("查找关注");
        this.finding_focus_finished = true;
        this.finding_focus_success = true;
        this.focus = [];
        this.loadMoreFocus.loading = false;
        this.loadMoreFocus.finished = false;
      },
      find_fans() {
        Toast("查找粉丝");
        this.finding_fans_finished = true;
        this.finding_fans_success = true;
        this.fans = [];
        this.loadMoreFans.loading = false;
        this.loadMoreFans.finished = false;
      },
      gotoUserPage(id) {
        Toast("前往用户主页");
        this.$router.push({path:'/userpage',query:{flag: 1, id: id}});  // flag为1表示查看他人
      },
    },
    mounted() {
      document.getElementsByClassName('van-tabs__nav')[0].style.width="50%";
      document.getElementsByClassName('van-tabs__nav')[0].style.margin="0 auto";
      this.active = this.$route.query.page;
      this.find_friend_result=[/*{
        id:1,
        nickname:'好友_friend_1',
        createTime:'2019-11-18 20:20:01',
        headimg:'./static/images/head4.jpeg',
        sex_icon:'./static/images/female.png',
        introduction:'个人介绍'
      }*/];
      this.find_focus_result=[/*{
        id:1,
        nickname:'关注_focus_1',
        createTime:'2019-11-18 20:20:01',
        headimg:'./static/images/head3.jpeg',
        sex_icon:'./static/images/female.png',
        introduction:'个人介绍'
      }*/];
      this.find_fans_result=[/*{
        id:1,
        nickname:'粉丝_fans_4',
        createTime:'2019-11-18 20:20:01',
        headimg:'./static/images/head2.jpg',
        sex_icon:'./static/images/female.png',
        introduction:'个人介绍'
      }*/];
    },
    created() {
      this.friends=[/*{
        id:1,  // 用户id
        nickname:'好友_friend_1',
        createTime:'2019-11-18 20:20:01',
        headimg:'./static/images/head4.jpeg',
        sex_icon:'./static/images/female.png',
        introduction:'个人介绍'
      }*/];
      this.focus=[/*{
        id:1,
        nickname:'关注_focus_1',
        createTime:'2019-11-18 20:20:01',
        headimg:'./static/images/head3.jpeg',
        sex_icon:'./static/images/female.png',
        introduction:'个人介绍'
      }*/];
    }
  }
</script>

<style scoped>
  .back_icon {
    margin-top: 12px; margin-left: 10px; display: block; z-index: 2; width:20px;
  }

  .addfriends_icon {
    display: block;
    z-index: 3;
    width:20px;
    float: right;
    margin-right: 10px;
    margin-top: -2px;
  }

  .friend_name {
    margin-top: -50px;
    margin-left: 58px;
    font-size: 16px;
    line-height: 30px;
    color: #555555;
  }

</style>
