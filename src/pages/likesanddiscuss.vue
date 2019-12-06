<template>
  <div>
    <!--<van-icon name="./static/images/addfriends.png" class="addfriends_icon" size="20" @click="addFriends"/>-->
    <van-icon name="arrow-left" class="back_icon" size="20" @click="goBack"/>
    <van-tabs v-model="active" animated swipeable style="margin-top: -35px; position:relative; z-index: 1;">
      <!--<van-tab title="消息">
        <van-cell-group>
          <van-field v-model="find_message" placeholder="请输入关键字"
                     right-icon="search" @click-right-icon="findMessage"/>
        </van-cell-group>
        <div style="height: 5px; background: #eeeeee; "></div>
        <van-list
          v-model="loadMoreMessage.loading"
          :finished="loadMoreMessage.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadMessage"
        >
          <div v-for="item in message" :key="item.id">
            <div style="height: 10px;"></div>
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="19">
                <van-image
                  round
                  width="3rem"
                  height="3rem"
                  fit="cover"
                  :src="item.headimg"
                />
                <div class="message_username">{{item.name}}</div>
                <div class="message">{{item.comment}}</div>
              </van-col>
              <van-col span="3">
                <div class="message_create_time">{{item.createTime}}</div>
                <div v-if="item.unreadNum > 0" class="unread_num">
                  {{item.unreadNum}}
                </div>
              </van-col>
              <van-col span="1"></van-col>
            </van-row>
            <div style="height: 1px; background: #eeeeee; margin-top: 5px;"></div>
          </div>
        </van-list>
      </van-tab>-->

      <van-tab title="赞">

        <!--<van-cell-group>
          <van-field v-model="find_like_user" placeholder="请输入关键字"
                     right-icon="search" @click-right-icon="findLike"/>
        </van-cell-group>-->
        <div style="height: 5px; background: #eeeeee; "></div>
        <van-list
          v-model="loadMoreLike.loading"
          :finished="loadMoreLike.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadLike"
        >
          <div v-for="item in like" :key="item.id" @click="goMomentOrPostDetail(item.momentId)">
            <div style="height: 10px;"></div>
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="19">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  fit="cover"
                  :src="item.headImg"
                />
                <div class="friend_name">{{item.name}}</div>
                <div class="like_create_time">{{item.createTime}}</div>
              </van-col>
            </van-row>

            <van-row>
              <van-col span="1"></van-col>
              <div class="like_text">{{item.text}}</div>
            </van-row>

            <van-row class="liked_comment">
              <van-col span="1"></van-col>

              <!-- 帖子有图 -->
              <van-col span="22" v-if="item.comment.img != ''">
                <van-image
                  width="5rem"
                  height="5rem"
                  fit="cover"
                  :src="item.comment.img"
                />
                <div style="margin-top: -60px; margin-left: 100px;">
                  <span style="font-size: 14px;color:#334790">{{username}}：</span>
                  <span style="font-size: 14px;color:#999999">{{item.comment.comment}}</span>
                </div>
              </van-col>

              <!-- 帖子无图 -->
              <van-col span="1" v-if="item.comment.img == ''"></van-col>
              <van-col span="21" v-if="item.comment.img == ''">
                <div style="margin-top: 20px;">
                  <span style="font-size: 14px;color:#334790">{{username}}：</span>
                  <span style="font-size: 14px;color:#999999">{{item.comment.comment}}</span>
                </div>
              </van-col>

              <van-col span="1"></van-col>
            </van-row>
            <div style="height: 10px; background: #eaeff4; margin-top: 15px;"></div>
          </div>
        </van-list>
      </van-tab>

      <van-tab title="评论">

        <van-cell-group>
          <van-field v-model="find_discuss" placeholder="请输入关键字"
                     right-icon="search" @click-right-icon="findDiscuss"/>
        </van-cell-group>
        <div style="height: 5px; background: #eeeeee; "></div>
        <van-list
          v-model="loadMoreDiscuss.loading"
          :finished="loadMoreDiscuss.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadDiscuss"
        >
          <div v-for="item in discuss" :key="item.id" @click="goMomentOrPostDetail(item.momentId, item.postId)">
            <div style="height: 10px;"></div>
            <!--
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="3">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  fit="cover"
                  :src="item.headimg"
                />
              </van-col>
              <van-col span="16">
                <div class="discuss_username">{{item.name}}</div>
                <div class="discuss">{{item.comment}}</div>
              </van-col>
            </van-row>
            <div style="height: 1px; background: #eeeeee; margin-top: 5px;"></div>
            -->

            <van-row>
              <van-col span="1"></van-col>
              <van-col span="19">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  fit="cover"
                  :src="item.headImg"
                />
                <div class="friend_name">{{item.name}}</div>
                <div class="like_create_time">{{item.createTime}}</div>
              </van-col>
            </van-row>

            <van-row>
              <van-col span="1"></van-col>
              <van-col span="22">
                <div class="like_text">
                  <span style="font-size: 14px;color:#555555">{{item.text}}：</span>
                  <span style="font-size: 14px;color:#999999">{{item.comment}}</span>
                </div>
              </van-col>
            </van-row>

            <van-row class="liked_comment">
              <!-- 帖子有图 -->
              <van-col span="1" v-if="item.discussed_comment.img != ''"></van-col>
              <van-col span="5" v-if="item.discussed_comment.img != ''">
                <van-image
                  width="5rem"
                  height="5rem"
                  fit="cover"
                  :src="item.discussed_comment.img"
                />
              </van-col>
              <van-col span="1" v-if="item.discussed_comment.img != ''"></van-col>
              <!-- 帖子无图 纯字 -->
              <van-col span="2" v-if="item.discussed_comment.img == ''"></van-col>

              <van-col span="16">
                <div style="margin-top: 20px;">
                  <span style="font-size: 14px;color:#334790">{{username}}：</span>
                  <span style="font-size: 14px;color:#999999">{{item.discussed_comment.comment}}</span>
                </div>
              </van-col>
              <van-col span="1"></van-col>
            </van-row>

            <div style="height: 10px; background: #eaeff4; margin-top: 15px;"></div>
          </div>
        </van-list>
      </van-tab>

      <van-tab title="通知">

        <van-cell-group>
          <van-field v-model="find_notice" placeholder="请输入关键字"
                     right-icon="search" @click-right-icon="findNotice"/>
        </van-cell-group>
        <div style="height: 5px; background: #eeeeee; "></div>
        <van-list
          v-model="loadMoreNotice.loading"
          :finished="loadMoreNotice.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadNotice"
        >
          <div v-for="item in notice" :key="item.id" @click="goNotifyPage(item.link)">
            <div style="height: 10px;"></div>
            <van-row>
              <van-col span="1"></van-col>
              <van-col span="19">
                <van-image
                  round
                  width="3rem"
                  height="3rem"
                  fit="cover"
                  :src="item.headimg"
                />
                <div class="notice_username">
                  <span style="color:#555555">{{item.name}}</span>
                  <span class="notice_unread" v-if="item.unreadNum > 0">[未读]</span>
                </div>
                <div class="message">{{item.comment}}</div>
              </van-col>
              <van-col span="3">
                <div class="notice_create_time">{{item.createTime}}</div>
              </van-col>
              <van-col span="1"></van-col>
            </van-row>
            <div style="height: 1px; background: #eeeeee; margin-top: 5px;"></div>
          </div>
        </van-list>
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
    name: "likesanddiscuss",
    data() {
      return {
        username:'',
        active:0,  // 进入页面时默认标签
        message:[],
        like:[],
        discuss:[],
        notice:[],
        loadMoreMessage: {
          loading: false,
          finished: false,
        },
        loadMoreLike: {
          loading: false,
          finished: false,
        },
        loadMoreDiscuss: {
          loading: false,
          finished: false,
        },
        loadMoreNotice: {
          loading: false,
          finished: false,
        },
        find_message:'',
        find_like_user:'',
        find_discuss:'',
        find_notice:'',
        likeCurrentPage: 1,
        discussCurrentPage: 1,
        noticeCurrentPage: 1
      }
    },
    methods: {
      goBack(){
        Toast("返回");
        this.$router.go(-1);
      },
      addFriends() {
        Toast("添加好友");
        //this.$router.go(-1);
      },
      onLoadMessage() {
        this.loadMoreMessage.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.loadMoreMessage.finished = true;
          this.loadMoreMessage.loading = false;
        }, 500);
      },
      onLoadLike() {
        this.loadMoreLike.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getMessagePraiseList', {currentPage: this.likeCurrentPage}).then(res => {
            console.log("------------------like_load_start------------------");
            let praiseList = res.data.praiseList;
            console.log("currentPage:", this.likeCurrentPage, "  praiseList:", praiseList);
            for (let i = 0; i < praiseList.length; i++) {
              let temp = {
                id: i + (this.likeCurrentPage - 1) * 10,
                momentId: praiseList[i].momentId,
                name: praiseList[i].praiserName,
                createTime: praiseList[i].createTime,
                headImg: praiseList[i].praiserHeadImg,
                text: '赞了你',
                comment: {
                  img: praiseList[i].detail.attachmentList.length > 0 ? praiseList[i].detail.attachmentList[0].attachment : '',
                  comment: praiseList[i].detail.momentInfo.comment
                }
              };
              // console.log(temp);
              this.like.push(temp);
            }

            this.likeCurrentPage++;
            this.loadMoreLike.loading = false;
            if (praiseList.length == 0) {// 加载完了
              console.log("加载完了");
              this.loadMoreLike.finished = true;
            }
            console.log("------------------like_load_end------------------");
          });
        }, 500);
      },
      onLoadDiscuss() {
        this.loadMoreDiscuss.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getMessageCommentList', {currentPage: this.discussCurrentPage, keyword: this.find_discuss}).then(res => {
            console.log("------------------discuss_load_start------------------");
            let commentList = res.data.commentList;
            console.log("currentPage:", this.discussCurrentPage, "  commentList:", commentList);
            for (let i = 0; i < commentList.length; i++) {
              let temp = {
                id: i + (this.discussCurrentPage - 1) * 10,
                name: commentList[i].commenterName,
                createTime: commentList[i].createTime,
                headImg: commentList[i].commenterHeadImg,
                comment: commentList[i].comment,
                text: '评论了你'
              };
              if (commentList[i].flag == 1) {// 自己发的动态中的初始评论，flag=1，需填充动态的内容
                temp.discussed_comment = {
                  img: commentList[i].detail.attachmentList.length > 0 ? commentList[i].detail.attachmentList[0].attachment : '',
                  comment: commentList[i].detail.momentInfo.comment
                };
                temp.momentId = commentList[i].momentId;
              }else if (commentList[i].flag == 2) {// 自己在动态中发布评论后，对这条评论的评论，flag=2，需填充自己的评论内容
                temp.discussed_comment = {
                  img: '',
                  comment: commentList[i].detail.comment
                };
                temp.momentId = commentList[i].momentId;
              }else if (commentList[i].flag == 3) {// 自己发的帖子中的初始评论，flag=3，需填充帖子的内容
                temp.discussed_comment = {
                  img: commentList[i].detail.postAttachment.length > 0 ? commentList[i].detail.postAttachment[0] : '',
                  comment: commentList[i].detail.postInfos.comment
                };
                temp.postId = commentList[i].postId;
              }else {// 自己在帖子中发布评论后，对这条评论的评论，flag=4，需填充自己的评论内容
                temp.discussed_comment = {
                  img: '',
                  comment: commentList[i].detail.comment
                };
                temp.postId = commentList[i].postId;
              }
              // console.log(temp);
              this.discuss.push(temp);
            }
            this.discussCurrentPage++;
            this.loadMoreDiscuss.loading = false;
            if (commentList.length == 0) {// 加载完了
              console.log("加载完了");
              this.loadMoreDiscuss.finished = true;
            }
            console.log("------------------discuss_load_end------------------");
          });
        }, 500);
      },
      onLoadNotice() {
        this.loadMoreNotice.loading = true;
        this.loadMoreNotice.finished = false;
        if(this.find_notice=='') {
          setTimeout(() => {
            this.$getData("getMemberNotifyList", {
              currentPage: this.noticeCurrentPage
            }).then(res => {
              var data = res.data.notifyList;
              //console.log(data)
              this.noticeCurrentPage++;
              if (data) {
                data.map(item => {
                  item.comment = item.content;
                  item.name = item.title;
                  item.headimg = item.headImg;
                  item.unreadNum = (item.isRead == 0) ? 1 : 0;

                });
                addList(this.notice, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreNotice.loading = false;
                this.loadMoreNotice.finished = true;
              } else this.loadMoreNotice.loading = false;
            });
          }, 500);
        }/*else{
          this.notice=[];
        }*/
      },
      findMessage() {
        Toast("查找消息");
      },
      findLike() {
        Toast("查找赞 用户");
      },
      findDiscuss() {
        Toast("查找评论");
        this.discuss = [];// 清空原来的
        this.loadMoreDiscuss.finished = false;// 加载finish置为false
        this.discussCurrentPage = 1;// 页数重置为1
        this.onLoadDiscuss();
      },
      findNotice() {
        this.notice = [];
        this.noticeCurrentPage=1;
        Toast("查找通知");
        if(this.find_notice!=''){
          this.loadMoreNotice.loading = true;
          this.loadMoreNotice.finished = false;
          setTimeout(() => {
            this.$getData("getMemberNotifyList", {
              currentPage: this.noticeCurrentPage,
              findNotice:this.find_notice
            }).then(res => {
              var data = res.data.notifyList;
              //console.log(data)
              this.noticeCurrentPage++;
              if (data) {
                data.map(item => {
                  item.comment = item.content;
                  item.name = item.title;
                  item.headimg = item.headImg;
                  item.unreadNum = (item.isRead==0)?1:0;
                });
                addList(this.notice, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreNotice.loading = false;
                this.loadMoreNotice.finished = true;
              } else this.loadMoreNotice.loading = false;
            });
          }, 500);
        }else{
          this.loadMoreNotice.loading = true;
          this.loadMoreNotice.finished = false;
          setTimeout(() => {
            this.$getData("getMemberNotifyList", {
              currentPage: this.noticeCurrentPage
            }).then(res => {
              var data = res.data.notifyList;
              //console.log(data)
              this.noticeCurrentPage++;
              if (data) {
                data.map(item => {
                  item.comment = item.content;
                  item.name = item.title;
                  item.headimg = item.headImg;
                  item.unreadNum = (item.isRead==0)?1:0;
                });
                addList(this.notice, data);
              }
              if (data == null || data.length < 10) {
                //加载完了
                this.loadMoreNotice.loading = false;
                this.loadMoreNotice.finished = true;
              } else this.loadMoreNotice.loading = false;
            });
          }, 500);
        }
      },
      goMomentOrPostDetail(momentId, postId){
        console.log("momentId:", momentId);
        console.log("postId:", postId);
        if (postId == null) {
          Toast("前往动态详情");
          this.$router.push({path:'/momentdetail',query: {id: momentId}});
        }else if (momentId == null){
          Toast("前往帖子详情");
          this.$router.push({path:'/postdetail',query: {id: postId}});
        }
      },
      goNotifyPage(value){
        this.$router.push(value);
      },
    },
    mounted() {
      document.getElementsByClassName('van-tabs__nav')[0].style.width="50%";
      document.getElementsByClassName('van-tabs__nav')[0].style.margin="0 auto";
      this.active = this.$route.query.page;
    },
    created() {
      this.$getData('getUserHomePageInfo', {}).then(res => {
        this.username = res.data.basicInfo.userInfo.nickname;
      });
      this.message=[{
        id:1,
        name:'用户1',
        createTime:'20:20',
        headimg:'./static/images/head4.jpeg',
        comment:'test comment',
        unreadNum:2,
      },{
        id:2,
        name:'用户2',
        createTime:'10:30',
        headimg:'./static/images/head3.jpeg',
        comment:'test comment',
        unreadNum:1,
      },{
        id:3,
        name:'用户3',
        createTime:'10-11',
        headimg:'./static/images/dog.jpg',
        comment:'test comment',
        unreadNum:3,
      },{
        id:4,
        name:'用户4',
        createTime:'2018-10',
        headimg:'./static/images/cat.jpg',
        comment:'test comment',
        unreadNum:0,
      }];
      this.notice=[/*{
        id:1,
        name:'通知1',
        createTime:'20:20',
        headimg:'./static/images/head2.jpg',
        comment:'test 通知一行通知',
        unreadNum:1,
      },{
        id:2,
        name:'通知2',
        createTime:'11-18',
        headimg:'./static/images/head1.jpeg',
        comment:'test 多行通知多行通知多行通知多行通知多行通知多行通知多行通知多行通知多行通知多行通知多行通知多行通知多行通知',
        unreadNum:0,
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

  .message_username {
    margin-top: -52px;
    margin-left: 58px;
    font-size: 14px;
    line-height: 25px;
    color: #555555;
  }

  .notice_username {
    margin-top: -52px;
    margin-left: 58px;
    font-size: 14px;
    line-height: 25px;
  }

  .notice_unread {
    margin-left: 5px;
    font-size: 14px;
    line-height: 25px;
    color: #de3300;
  }

  .message {
    margin-left: 58px;
    font-size: 14px;
    line-height: 25px;
    color: #aaaaaa;
  }

  .discuss_username {
    font-size: 14px;
    line-height: 20px;
    color: #555555;
  }

  .discuss {
    font-size: 14px;
    line-height: 20px;
    color: #888888;
  }

  .friend_name {
    margin-top: -34px;  /* 头像32px */
    margin-left: 42px;  /* 头像32px + 偏移量10px */
    font-size: 14px;
    line-height: 20px;
    color: #555555;
  }

  .unread_num {
    height: 17px;
    width: 17px;
    margin-top: 22px;
    text-align: center;
    font-size: 13px;
    line-height: 17px;
    color:white;
    background: #de3300;
    border-radius: 10px;
    position: absolute;
    right: 25px;
  }

  .message_create_time {
    font-size: 13px;
    position: absolute;
    right: 20px;
    color:#bbbbbb
  }

  .notice_create_time {
    font-size: 13px;
    text-align: right;
    color:#bbbbbb
  }

  .like_create_time {
    margin-left: 42px;  /* 头像32px + 偏移量10px */
    font-size: 12px;
    color:#bbbbbb
  }

  .like_text {
    margin-top: 5px;
    font-size: 15px;
    color:#555555;
  }

  .liked_comment {
    background: #e4edf9;
    height: 80px;
    margin-top: 10px;
  }
</style>
