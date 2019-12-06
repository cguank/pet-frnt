<template>
  <div>
    <div class="top">
      <van-row>
        <van-col span="6" offset="1" @click="$router.go(-1)">
          <a href="#" class="top-left">
            <img src="@/assets/icon/arrow-left1.svg"/>
            返回
          </a>
        </van-col>
        <van-col span="6" offset="2">
          <van-divider>详情</van-divider>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>
    <div class="content">
      <div class="user-info">
        <van-row>
          <van-col span="3" offset="1">
            <van-image
              width="35"
              height="35"
              round
              :src="postInfo.headImg"
            />
          </van-col>
          <van-col span="12">
            {{postInfo.name}}
            <span class="sub-info">{{postInfo.province}}</span>
            <br/>
            <span class="sub-info">{{postInfo.publishTime}}</span>
          </van-col>
          <van-col span="5" offset="1" class="m-hide">
            <van-button type="danger" round size="small" plain hairline @click="payAttention" v-if="!attention && postInfo.memberId != selfInfo.id">+关注
            </van-button>
            <van-button type="danger" round size="small" plain hairline color="grey" @click="payAttention"  v-if="attention && postInfo.memberId != selfInfo.id">已关注
            </van-button>
            <van-button type="danger" round size="small" plain hairline color="grey" @click="deleteMoment()"  v-if="postInfo.memberId == selfInfo.id">删除
            </van-button>
          </van-col>
        </van-row>
      </div>
      <div class="post-info">
        <div class="character">
          <p>{{postInfo.msg}}</p>
        </div>
        <div class="img-list">
          <div class="img-item" v-for="item in postInfo.postImgList">
            <van-image @click="imgPreview(item)"
                       :src="item.attachment"
            />
          </div>
        </div>
        <div class="footer">
          <van-col span="8" offset="16">
            <!--van-icon name="like-o" @click.stop="praise(postInfo.id)" v-if="!postInfo.isPraise"/>
            <van-icon name="like" color="red" @click.stop="praise(postInfo.id)" v-else/>
            <span>{{postInfo.praiseNum}}</span-->
            <van-icon name="like-o" @click.stop="praise(postInfo.id)" v-if="!postInfo.isPraise"/>
            <van-icon name="like" color="#ff976a" @click.stop="praise(postInfo.id)" v-else/>
            <span>{{postInfo.praiseNum}}</span>
            <van-icon name="chat-o"/>
            <span>{{postInfo.commentNum}}</span>
          </van-col>
        </div>
      </div>
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      评论
    </van-divider>
    <div class="footer-out">
      <van-list
        v-model="loadMoreComment.loading"
        :finished="loadMoreComment.finished"
        :offset="5"
        finished-text="没有更多了"
        @load="getCommentList"
      >
        <div class="list-item" v-for="(item,index) in commentList" :key="item.rank">
          <van-panel @click="blurInput"
          >
            <van-row>
              <van-col span="3" offset="1">
                <van-image
                  width="35"
                  height="35"
                  round
                  :src="item.headImg"
                />
              </van-col>
              <van-col span="12">
                <span class="user-name">{{item.name}}</span>
                <br/>
                <span class="sub-info">{{item.province}} {{item.city}}</span>
              </van-col>
              <van-col span="4" offset="4">
                <span class="sub-info">{{item.rank}}楼</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="20" offset="4">
                {{item.comment}}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="4" offset="4">
                <span class="sub-info"> {{item.publishTime}}</span>
              </van-col>
              <van-col span="4" offset="12" class="m-hide">
                <span class="answer-button" @click.stop="answerOne(index,item.id,item.userId,item.name)">回复</span>
              </van-col>
            </van-row>
            <div class="answer-list">
              <div class="answer-item" v-for="subItem in item.answerList" :key="subItem.id">
                <van-row>
                  <van-col span="19" offset="5" class="answer-item-content">
                    <span class="user-name">{{subItem.answerUserName}}</span>
                    回复
                    <span class="user-name">{{subItem.receiveUserName}}</span>
                    <span class="msg" @click.stop="answerOne(index,item.id,subItem.answerUserId,subItem.answerUserName)">:{{subItem.msg}}</span>
                    <span class="sub-info">{{subItem.publishTime}}</span>
                  </van-col>
                </van-row>
              </div>

              <van-row v-if="item.answerNum>3">
                <van-col span="19" offset="5" class="answer-item-content">
                  <van-col span="9" offset="15">
                    <span class="answer-button" @click="getReplyList(index,item.id)" v-if="item.showMore">查看更多({{item.answerNum}})</span>
                  </van-col>
                </van-col>
              </van-row>


            </div>
          </van-panel>
        </div>
      </van-list>
    </div>
    <div class="fixed m-hide">
      <van-cell-group>
        <van-field
          v-model="comment"
          center
          clearable
          placeholder="说点什么吧```"
        >
          <van-button slot="button" size="small" color="grey" @click="send()">发送</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Row, Col, Divider, Icon, Image, Dialog, Button, ImagePreview, Panel,
    Field, CellGroup, Toast, List
  } from 'vant';

  Vue.use(Row).use(Col).use(Divider).use(Icon).use(Image).use(Dialog).use(Button).use(ImagePreview).use(Panel).use(Field).use(CellGroup).use(List);

  import {utf16toEntities, stopKeyBoard} from '@/assets/js/utils'

  export default {
    name: '',
    data: function () {
      return {
        attention: false, //未关注
        answerType: -1, //-1发送评论;1以上发送回复,且是评论列表的数组位置
        answerOneObj: {
//          id: 1, 前端插入不需要id,插入数据库自动生成
          commentId: 1, //这个是commentlist中的id,即评论列表中每条评论的id,是数据库中实际的id,插入后端的时候要用到
          receiveUserId: 1,
          receiveUserName: '剑荡四方',
          publishTime: '刚刚',
          answerId: '2',  //当前登录用户的id
          answerUserName: '我自己',
          msg: ''
        },
        comment: '',  //说点什么吧
        postInfo: {
          headImg: '',  // ./static/images/cat.jpg
          name: '', //我是的CVC
          province: '',//济南
          publishTime: '',//10分钟前
          msg: '',
          postImgList: [],
          isAttention: false,
          isPraise: false,
          isCollect: false,
          praiseNum: 0,
          commentNum: 0,
        },
        commentList: [],
        selfInfo: {
          id: 1,
          headImg: './static/images/dog.jpg',
          name: 'testName',
          province: '北京',
          city: '北京',
        },
        loadMoreComment: {
          loading: false,
          finished: false,
          currentPage: 1
        },
      };
    },
    created() {
      window.scrollTo(0,0);
    },
    mounted() {
      let item = window.document.getElementsByClassName('van-field__control')[0];
      item.style.backgroundColor = '#00000021';
      item.style.height = '30px';
      stopKeyBoard(item);

      //window.document.getElementsByTagName('input')[0].focus();
      console.log("动态id为 "+this.$route.query.id);
      // 获取详情
      this.$postData('getMomentDetail',{ 'momentId': this.$route.query.id }).then(res => {
        console.log(res.data);
        let postInfos = res.data.momentInfo;
        let postAttachment = res.data.attachmentList;
        this.postInfo={
          id:postInfos.id,
          memberId:postInfos.memberId,
          headImg:postInfos.headImg,
          name:postInfos.nickname,
          province:postInfos.province,
          publishTime:postInfos.createTime,
          msg:postInfos.comment,
          postImgList:postAttachment,
          isAttention:postInfos.isAttention > 0 ? true : false,
          isPraise:postInfos.isPraise > 0 ? true : false,
          praiseNum:postInfos.praiseNum,
          commentNum:postInfos.commentNum,
        };
        this.attention = postInfos.isAttention > 0 ? true : false;
        console.log('postInfo = ');
        console.log(this.postInfo);
      });
      // 获取评论+3回复
      this.getCommentList();
      // 获取用户个人信息
      this.$postData('getMemberInfo',{}).then(res => {
        console.log(res.data);
        let my_jsonObj = res.data;
        this.selfInfo = {
          id: my_jsonObj.memberId,
          headImg: my_jsonObj.headImg,
          name: my_jsonObj.nickname,
          province: my_jsonObj.province,
          city: my_jsonObj.city,
        }
        //获得selfInfo
        this.answerOneObj.answerId = this.selfInfo.id;
        this.answerOneObj.answerUserName = this.selfInfo.name;
      });
    },
    methods: {
      blurInput() {
        console.log('blur');
        let item = window.document.getElementsByTagName('input')[0];
        this.answerType = -1;
        this.comment = '';
        item.placeholder = '说点什么吧```';
        stopKeyBoard(item);
      },
      // 获取评论+3回复
      getCommentList(){
        console.log('this.loadMoreComment.currentPage = '+this.loadMoreComment.currentPage);
        this.loadMoreComment.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getCommentList', {momentId: this.$route.query.id, currentPage:this.loadMoreComment.currentPage}).then(res => {
            //let data = res.data.momentList;
            //console.log(data);
            //addList(this.momentList,data);
            let my_jsonObj = res.data.commentList;
            let i=0;
            if(this.loadMoreComment.currentPage == 1) this.commentList = [];  // 清空
            if(my_jsonObj != null){
              for(i=0;i<my_jsonObj.length;i++){
                this.commentList.push({  // 置顶
                  id: my_jsonObj[i].comment.id,  // 休闲动态id
                  headImg: my_jsonObj[i].comment.headImg,
                  userId: my_jsonObj[i].comment.memberId,
                  name: my_jsonObj[i].comment.nickname,
                  province: my_jsonObj[i].comment.province,
                  city: my_jsonObj[i].comment.city,
                  comment: my_jsonObj[i].comment.comment,
                  publishTime: my_jsonObj[i].comment.createTime,
                  rank: 10*(this.loadMoreComment.currentPage-1)+i+1,
                  answerNum: my_jsonObj[i].comment.answerNum,   // 回复总数
                  answerList:[],
                  showMore: true,  // 是否显示‘查看更多’
                });
                let j=0;
                // console.log('my_jsonObj[i].reply_3 = ');
                // console.log(my_jsonObj[i].reply_3);
                if(my_jsonObj[i].reply_3!=null){
                  for(j=0;j<my_jsonObj[i].reply_3.length;j++){
                    this.commentList[10*(this.loadMoreComment.currentPage-1)+i].answerList.push({
                      id: my_jsonObj[i].reply_3[j].id,
                      answerUserId: my_jsonObj[i].reply_3[j].memberId,
                      answerUserName: my_jsonObj[i].reply_3[j].nickname,
                      msg: my_jsonObj[i].reply_3[j].comment,
                      publishTime: my_jsonObj[i].reply_3[j].createTime,
                      receiveUserId: my_jsonObj[i].reply_3[j].answerMemberId,
                      receiveUserName: my_jsonObj[i].reply_3[j].answerMemberName
                    })
                  }
                }
                // console.log('this.commentList = ');
                // console.log(this.commentList);
              }
            }
            console.log('this.commentList = ');
            console.log(this.commentList);
            this.loadMoreComment.currentPage++;
            if(my_jsonObj == null || my_jsonObj.length<10){
              this.loadMoreComment.finished = true;
            }
            this.loadMoreComment.loading = false;
          })
        }, 500);
      },
      // 获取某评论的所有回复
      getReplyList(index, commentId) {
        this.$postData('getReplyList',{ 'commentId': commentId }).then(res => {
          this.commentList[index].answerList = [];  // 清空预显示3条
          let my_jsonObj = res.data.replyList;
          let j=0;
          if(my_jsonObj!=null){
            for(j=0;j<my_jsonObj.length;j++){
              this.commentList[index].answerList.push({
                id: my_jsonObj[j].id,
                answerUserId: my_jsonObj[j].memberId,
                answerUserName: my_jsonObj[j].nickname,
                msg: my_jsonObj[j].comment,
                publishTime: my_jsonObj[j].createTime,
                receiveUserId: my_jsonObj[j].answerMemberId,
                receiveUserName: my_jsonObj[j].answerMemberName
              })
            }
          }
          this.commentList[index].showMore = false;  // 取消显示‘查看更多’
        });
      },
      praise(id, index) {
        if (this.postInfo.isPraise) {
          this.$getData('cancelPraise', {momentId: id}).then(res => {
            console.log(res.data);
            this.postInfo.praiseNum--;
            this.postInfo.isPraise = false;
            // Toast('取消赞');
          });
        } else {
          this.$getData('addPraise', {momentId: id}).then(res => {
            console.log(res.data);
            this.postInfo.praiseNum++;
            this.postInfo.isPraise = true;
            // Toast('点赞');
          });
        }
      },
      payAttention() {
        if (this.attention) {
          this.selfInfo.isAttention = false;
          this.attention=false;
          this.$postData('removeMemberFans',{
            'targetId': this.postInfo.memberId
          }).then(res => {  // ------------------------------------------------------
            var data = res.data;
            if(data==0){
              Toast('取消关注成功');
            }else{
              Toast('取消关注失败');
            }
          })
        } else {
          this.attention=true;
          this.$postData('addMemberFans',{
            'targetId': this.postInfo.memberId
          }).then(res => {  // ------------------------------------------------------
            var data = res.data;
            if(data==0){
              Toast('关注成功');
              this.selfInfo.isAttention = true;
            }else{
              Toast('关注失败');
            }
          })
        }
      },
      imgPreview(src) {
        ImagePreview({
          images: [src],
          showIndex: false
        });
      },
      answerOne(index, id, userId, userName) { //index为当前评论列表的数组位置 , id为在数据库中这条评论的id
        let input = window.document.getElementsByTagName('input')[0];
        input.placeholder = '回复:' + userName;
        input.focus();
        this.answerType = index;
        this.answerOneObj.receiveUserId = userId;
        this.answerOneObj.receiveUserName = userName;
        this.answerOneObj.commentId = id;
      },
      send() {
        if (this.comment.length == 0) Toast('发送内容不能为空');
        else {
          this.answerOneObj.msg = this.comment;
          console.log(this.answerOneObj);
          console.log("this.answerType = "+this.answerType);
          if (this.answerType != -1) {
            // 回复
            //以下后台发送````
            let item = this.commentList[this.answerType].answerList;
            //需要创建一个新的对象,不然之前push的值也会一直变
            let o = Object.assign({}, this.answerOneObj);
            item.push(o);
            //item.push(this.answerOneObj)
            window.document.getElementsByTagName('input')[0].placeholder = '说点什么吧```';

            this.$postData('addMomentCommentAndReply',{
              'answerId': this.answerOneObj.commentId,  // 被回复的评论id
              'answerMemberId': this.answerOneObj.receiveUserId,  // 被回复的用户id
              'comment': this.comment,  // 评论内容
              'momentId': this.postInfo.id,  // 所属动态id
            }).then(res => {
              console.log(res.data);
              Toast('评论/回复成功');
            });
          }
          else {
            // 初始评论
            // console.log("this.selfInfo = ");
            // console.log(this.selfInfo);
            // let obj = {
            //   //id: 1,
            //   headImg: this.selfInfo.headImg,
            //   userId: this.selfInfo.id,
            //   name: this.selfInfo.name,
            //   province: this.selfInfo.province,
            //   city: this.selfInfo.city,
            //   comment: this.comment,
            //   publishTime: '刚刚',
            //   rank: this.commentList.length + 1,
            //   answerNum: 0, //有多少条回复,
            //   answerList: []
            // };
            // this.commentList.unshift(obj);
            // console.log(this.commentList);
            //以下后台发送````
            this.$postData('addMomentCommentAndReply',{
              'answerId': 0,  // 初始评论
              'answerMemberId': this.postInfo.memberId,  // 被回复的用户id = 动态发布者id
              'comment': this.comment,  // 评论内容
              'momentId': this.postInfo.id,  // 所属动态id
            }).then(res => {  // ------------------------------------------------------
              console.log(res.data);
              Toast('评论成功');
              this.loadMoreComment.currentPage = 1;
              this.postInfo.commentNum++;  // 页面显示评论数+1
              this.getCommentList();
            });
          }
          this.answerType = -1;
          this.comment = '';
          Toast('发送成功');
        }

      },
      deleteMoment(){
        Dialog.confirm({
          title: '温馨提示',
          message: '删除后无法恢复，确定要删除吗'
        }).then(() => { // on confirm
          this.$postData('deleteMoment',{
            'momentId': this.postInfo.id
          }).then(res => {  // ------------------------------------------------------
            console.log(res.data);
            Toast('删除成功');
            this.$router.push('/forum');
          });
        }).catch(() => { // on cancel
          return;
        });
      },
    }
  }
</script>
<style lang="less" scoped>
  .top {
    margin: 10px;

    .van-info--dot {
      top: -14px;
    }

    img {
      height: 15px;
    }

    .van-divider {
      margin: 2px 0;
    }

    .top-right {
      color: #DDBE8E;
    }

    .top-left {
      color: #DDBE8E;
    }

  }

  .content {

    .user-info {

      .van-button--small {
        font-size: 13px;
      }

    }

    .post-info {
      padding: 0 15px;

      .footer {
        margin-top: 20px;
      }

    }
  }
  .sub-info {
    font-size: 14px;
    color: #7d7e80;
  }

  .footer-out {
    padding-bottom: 80px;

    .answer-button {
      color: #3a8ee6;
    }

    .user-name {
      color: #3aa6e6;
    }

    .answer-list {
      padding-right: 10px;
      font-size: 15px;

      .answer-item-content {
        padding-left: 5px;
        background-color: #7d7e8047;
      }

    }
  }

  .fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

</style>
