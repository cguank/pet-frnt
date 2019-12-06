<template>
  <div>
    <van-swipe @change="onChange" :height="200">
      <van-swipe-item>
        <div class="go_back" @click="goBack">
          <van-icon
            name="arrow-left"
            size="16"
            color="#ffffff"
            class="go_back_icon"
          />
        </div>

        <div class="user_info" @click="goUserInfo" v-if="this.$route.query.flag != 1">资料</div>
        <div class="user_addAttention" @click="addAttention" v-if="this.$route.query.flag == 1 && isAttentioned == false">+关注</div>
        <div class="user_isAttentioned" @click="cancelAttention" v-if="this.$route.query.flag == 1 && isAttentioned == true">已关注</div>

        <div style="margin-left: 40%; margin-top: 0;">
          <van-image
            round
            width="4rem"
            height="4rem"
            :src="headImg"
            @click="imgPreview(headImg)"
          />
        </div>

        <div class="user_info_1">
          <div>
            <img
              class="user_sex"
              v-bind:src="sex_icon"
            />
<!--            <div class="user_level">Lv0</div>-->
          </div>
          <div style="margin-left: 5px; font-size: 18px; color: #444444; width: 50px; text-align: center;">{{this.nickname}}</div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="introduction">{{this.introduction}}</div>
      </van-swipe-item>
    </van-swipe>

    <!-- 背景 -->
    <van-image
      width="100%"
      height="250px"
      fit="cover"
      :src="backgroundImg"
      style="margin-top: -220px; z-index: -1;"
    />
    <!-- 上半部分渐变遮罩层 -->
    <div style="width:100%;height: 250px; background-image: linear-gradient(to bottom,rgba(44,44,44,0.4), rgba(0,0,0,0)); margin-top: -250px; "></div>
    <div style="background: #eeeeee; height: 60px; margin-top: -10px; z-index: -1"></div>
    <div class="block_1"><!-- 使用分格高度过高 -->
      <div style="height: 10px"></div>
      <van-row type="flex" justify="space-around">
        <van-col span="1" @click="goLike" style="text-align: center" v-if="this.$route.query.flag != 1">
          <span class="block_num">{{this.like_num}}</span>
        </van-col>
        <!--van-col span="1" @click="tellCharm" style="text-align: center">
          <span class="block_num">{{this.charm_num}}</span>
        </van-col-->
        <van-col span="1" @click="goFocus" style="text-align: center">
          <span class="block_num">{{this.focus_num}}</span>
        </van-col>
        <van-col span="1" @click="goFans" style="text-align: center">
          <span class="block_num">{{this.fans_num}}</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="3" @click="goLike" style="text-align: center" v-if="this.$route.query.flag != 1">
          <span class="block_text">赞</span>
        </van-col>
        <!--van-col span="3" @click="tellCharm" style="text-align: center">
          <span class="block_text">魅力值</span>
        </van-col-->
        <van-col span="3" @click="goFocus" style="text-align: center">
          <span class="block_text">关注</span>
        </van-col>
        <van-col span="3" @click="goFans" style="text-align: center">
          <span class="block_text">粉丝</span>
        </van-col>
      </van-row>
    </div>
    <div style="background: white; margin-top: 3%" v-if="this.$route.query.flag == 1"></div>

    <div v-if="this.$route.query.flag != 1">
      <div style="height: 40px; background: white; margin-top: 3%"></div>
      <div style="height: 20px; font-size: 12px; color:#777777; margin-left: 10px; margin-top: -30px">宠物</div>
      <div style="height: 5px; background: white; margin-top: 3%"></div>
      <van-row type="flex" justify="space-around">
        <van-col span="10" @click="goPet">
          <van-button plain hairline type="primary" color="#dddddd" size="large" style="z-index: -1"></van-button>
          <div style="margin-top: -46px; margin-left: 10%">
            <van-row>
              <van-col span="8">
                <van-image
                  round
                  width="2rem"
                  height="2rem"
                  :src=this.petHeadImg
                />
              </van-col>
              <van-col span="12">
                <div>
                  <div style="font-size: 14px;line-height: 30px;">我的宠物</div>
                </div>
              </van-col>
              <van-col span="2">
                <van-icon
                  name="arrow"
                  size="14"
                  color="#999999"
                  class="go_pet_icon"
                />
              </van-col>
            </van-row>
          </div>
        </van-col>
        <van-col span="10" @click="goAddPet">
          <van-button plain hairline type="primary" color="#dddddd" size="large" style="z-index: -1"></van-button>
          <div style="margin-top: -46px; margin-left: 10%">
            <van-row>
              <van-col span="8">
                <van-icon
                  name="add"
                  size="35"
                  color="#dddddd"
                  class="go_addpet_icon"
                />
              </van-col>
              <van-col span="12">
                <div>
                  <div style="font-size: 12px; color: #555555; line-height: 30px;">添加宠物</div>
                </div>
              </van-col>
              <van-col span="2">
                <van-icon
                  name="arrow"
                  size="14"
                  color="#999999"
                  class="go_pet_icon"
                />
              </van-col>
            </van-row>
          </div>
        </van-col>
      </van-row>
      <div style="background: #eeeeee; height: 10px; margin-top: 10%; z-index: -1"></div>
    </div>

    <van-tabs swipeable animated >
      <van-tab title="主页">
        <div id="user_message">
          <van-list
            v-model="loadMore.loading"
            :finished="loadMore.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="item in message" :key="item.id" style="height: 110px;" @click="goMomentDetail(item.momentId)">
              <div style="height: 10px;"></div>
              <van-row>
                <van-col span="1"></van-col>
                <van-col span="22">
                  <div style="width: 50px; margin-top: 10px;">
                    <div style="font-size: 12px; text-align: center; color: #999999">{{item.createTime_y}}</div>
                    <div style="font-size: 16px; text-align: center; margin-top: 5px;">{{item.createTime_md}}</div>
                  </div>
                  <div v-if="item.first_pic != ''">  <!-- 有图片 显示第一张+文本 -->
                    <van-image
                      width="6rem"
                      height="6rem"
                      fit="cover"
                      :src="item.first_pic"
                      radius="10px"
                      style="margin-top: -40px; margin-left: 60px;"
                    />
                    <div style="font-size: 16px; color: #444444; margin-top: -90px; margin-left: 170px; ">{{item.comment}}</div>
                  </div>

                  <div v-if="item.first_pic == ''"> <!-- 无图片 显示文本 -->
                    <div style="font-size: 16px; color: #444444; margin-top: -30px; margin-left: 60px; ">{{item.comment}}</div>
                  </div>
                </van-col>
                <van-col span="1"></van-col>
              </van-row>
            </div>
          </van-list>

          <!--van-icon name="smile" size="60" color="#bbcccc" style="margin-left: 42%; margin-top: 10%;" />
          <van-image
            width="165"
            height="35"
            src="./static/images/user_message.PNG"
            style="margin-top: 10px; margin-left: 25%"
          />
          <div></div>
          <van-button-- plain type="default" size="small" color="#bbcccc" style="margin-left: 41%;" @click="goAddMessage">
            发布动态
          </van-button-->
        </div>
        <div style="height: 50px;"></div>
      </van-tab>
      <van-tab title="相册">
        <van-list
          v-model="loadPhoto.loading"
          :finished="loadPhoto.finished"
          :offset="5"
          finished-text="没有更多了"
          @load="onLoadPhoto"
        >
          <van-grid :border="false" :column-num="3" square>
              <van-grid-item v-for="photo in photos" :key="photo.id">
                <van-image
                  :src="photo.photo"
                  @click="imgPreview(photo.photo)"/>
              </van-grid-item>
          </van-grid>
          <!--
          <van-icon name="photo" size="60" color="#bbcccc"
                    style="margin-left: 42%; margin-top: 10%;"
          />
          <van-image
            width="165"
            height="35"
            src="./static/images/user_photo.PNG"
            style="margin-top: 10px; margin-left: 25%"
          />
          <div></div>
          <van-button plain type="default" size="small" color="#bbcccc" style="margin-left: 41%;" @click="goAddMessage">发布动态</van-button>
        -->
        </van-list>
        <div style="height: 50px;"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Icon,Image,Swipe, SwipeItem,Toast,Row,Col,Button,Tab, Tabs, Grid, GridItem,List,Card,ImagePreview } from 'vant';

  Vue.use(Icon).use(Image).use(Swipe).use(SwipeItem).use(Toast).use(Row).use(Col).use(Button)
    .use(Tab).use(Tabs).use(Grid).use(GridItem).use(List).use(Card).use(ImagePreview);
  export default {
    name: "userpage",
    data() {
      return{
        headImg:'',
        backgroundImg:'',
        nickname:'',
        sex:'',// 1 男  2 女
        sex_icon:'',
        introduction:'',
        like_num:'',   //赞
        //charm_num:66,  //魅力值
        focus_num:'', //关注
        fans_num:'',   //粉丝
        petHeadImg:'./static/images/dog_icon.png',
        message:[],
        loadMore: {
          loading: false,
          finished: false,
        },
        loadPhoto: {
          loading: false,
          finished: false,
        },
        photos:[],
        isAttentioned: false,  // 是否已关注
        momentCurrentPage: 1,
        photoCurrentPage: 1
      }
    },
    created(){
      this.id = this.$route.query.id; // 路由传递用户id，
      this.$getData('judgeConcernOrNot', {
        targetId:this.id
      }).then(res => {
        let sign = res.data;
        if(sign==1){
          this.isAttentioned = true;
        }else{
          this.isAttentioned = false;
        }
      });
    },
    mounted() {
      this.id = this.$route.query.id; // 路由传递用户id，
      console.log("this.id:", this.id);
      // 后台获取用户信息……
      this.$getData('getUserHomePageInfo', {id: this.id}).then(res => {
          console.log("Info:", res.data);
          // 基本信息
          let basicInfo = res.data.basicInfo;
          this.headImg = basicInfo.userInfo.headImg;
          this.backgroundImg = basicInfo.userInfo.backgroundImg == '' ? "./static/images/head3.jpeg" : basicInfo.userInfo.backgroundImg;
          this.sex = basicInfo.userInfo.sex;
          this.sex_icon = basicInfo.userInfo.sex == 1 ? "./static/images/male.png" : "./static/images/female.png";
          this.nickname = basicInfo.userInfo.nickname;
          this.introduction = (basicInfo.userInfo.introduction == null || basicInfo.userInfo.introduction == "") ? '我还没想好怎么介绍自己 ouo' : basicInfo.userInfo.introduction;
          this.like_num = basicInfo.allPraiseNum;
          this.focus_num = basicInfo.concernNum;
          this.fans_num = basicInfo.fansNum;
      });
    },
    methods: {
      onChange(index) {
        // Toast('当前 Swipe 索引：' + index);
      },
      goBack() {
        // Toast("返回");
        if (this.id != null) {// 查看他人主页时
          this.$router.go(-1);
        } else {
          this.$router.push('/usercenter');
        }
      },
      goUserInfo() {
        // Toast("前往个人资料界面");
        this.$router.push('/userInfo2');
      },
      imgPreview(src) {
        ImagePreview({
          images: [src],
          showIndex: false
        });
      },
      goPet() {
        // Toast("前往宠物信息界面");
        //this.$router.push('/mypet');
        this.$router.push({path:'/mypet',query: {flag:2}});
      },
      goAddPet() {
        // Toast("前往添加宠物界面");
        this.$router.push('/addpet');
      },
      goFocus() {
        // Toast("前往关注界面");
        let page = 0, flag = 1;
        if(this.$route.query.flag == 1){  // 其他用户在查看
          page = 0;
          flag = 1;
        }
        else{
          page = 1;
          flag = 0;
        }
        this.$router.push({path:'/friends',query: {page:page, flag: flag}});  // flag: 表示是其他用户在查看  下个界面隐去好友列
      },
      goFans() {
        // Toast("前往粉丝界面");
        let page = 0, flag = 1;
        if(this.$route.query.flag == 1){  // 其他用户在查看
          page = 1;
          flag = 1;
        }
        else{
          page = 2;
          flag = 0;
        }
        this.$router.push({path:'/friends',query: {page:page, flag: flag}});
      },
      goLike() {
        // Toast("前往赞");
        this.$router.push({path:'/likesanddiscuss',query: {page:0}});
      },
      tellCharm() {
        Toast("魅力值由粉丝数以及关注数计算");
      },
      goMomentDetail(momentId) {
        // Toast("前往动态详情");
        this.$router.push({path:'/momentdetail',query: {id: momentId}});
      },

      /*
      goAddMessage() {
        Toast("发布动态");
      },*/
      onLoad() {
        this.loadMore.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getMemberMomentList', {currentPage: this.momentCurrentPage, id: this.id}).then(res => {
            console.log("------------------moment_load_start------------------");
            let momentList = res.data.momentList;
            console.log("currentPage:", this.momentCurrentPage, "  momentList:", momentList);
            for (let i = 0; i < momentList.length; i++) {
              let time = momentList[i].createTime.split(" ")[0].split("-");
              let y = time[0];
              let md = time[1] + "-" + time[2];
              let temp = {
                id: i + (this.momentCurrentPage - 1) * 10,
                momentId: momentList[i].id,
                createTime_y: y,
                createTime_md: md,
                comment: momentList[i].comment,
                first_pic: momentList[i].attachment.length > 0 ?  momentList[i].attachment[0].attachment : ''
              };
              // console.log(temp);
              this.message.push(temp);
            }

            this.momentCurrentPage++;
            this.loadMore.loading = false;
            if (momentList.length == 0) {// 加载完了
              console.log("加载完了");
              this.loadMore.finished = true;
            }
            console.log("------------------moment_load_end------------------");
          });
        }, 500);
      },
      onLoadPhoto() {
        this.loadPhoto.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getMemberMomentAttachmentList', {currentPage: this.photoCurrentPage, id: this.id}).then(res => {
            console.log("------------------photo_load_start------------------");
            let photoList = res.data.photoList;
            console.log("currentPage:", this.photoCurrentPage, "  photoList:", photoList);
            for (let i = 0; i < photoList.length; i++) {
              this.photos.push({
                id: photoList[i].id,
                photo: photoList[i].attachment
              })
            }

            this.photoCurrentPage++;
            this.loadPhoto.loading = false;
            if (photoList.length == 0) {// 加载完了
              console.log("加载完了");
              this.loadPhoto.finished = true;
            }
            console.log("------------------photo_load_end------------------");
          });
        }, 500);
      },
      addAttention() {
        setTimeout(() => {
          this.$getData("addMemberFans", {
            targetId: this.id
          }).then(res => {
            var data = res.data;
            if(data==0){
              this.isAttentioned = true;
              Toast("关注成功");
            }else{
              Toast("关注失败");
            }
          });
        }, 500);
      },
      cancelAttention() {
        setTimeout(() => {
          this.$getData("removeMemberFans", {
            targetId: this.id
          }).then(res => {
            var data = res.data;
            if(data==0){
              this.isAttentioned = false;
              Toast("取消关注成功");
            }else{
              Toast("取消关注失败");
            }
          });
        }, 500);
      },
    },
  }
</script>

<style scoped>
  .go_back {
    margin-top: 10px;
    margin-left: 10px;
    height: 25px;
    width: 25px;
    background: #999999;
    border-radius: 25px;
    opacity: 0.8;
  }

  .go_back_icon {
    margin-top: 4px;
    margin-left: 3px;
  }

  .user_info {
    margin-top: -20px;
    margin-left: 83%;
    background: #999999;
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    width: 40px;
    border-radius: 25px;
    opacity: 0.8;
  }

  .user_addAttention {
    margin-top: -20px;
    margin-left: 80%;
    background: #e15244;
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    width: 50px;
    border-radius: 25px;
    opacity: 0.8;
  }

  .user_isAttentioned {
    margin-top: -20px;
    margin-left: 80%;
    background: white;
    color: #e15244;
    font-size: 12px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    width: 50px;
    border-radius: 25px;
    opacity: 0.8;
  }

  .user_info_1 {
    margin-left: 40%;
    margin-top: 10px;
    width: 70%;
    z-index: 1;
  }

  .user_sex {
    margin-left: 25px;
    height: 12px;
    width: 12px;
  }

  .user_level {
    margin-top: -15px;
    margin-left: 45px;
    background: #eeeeee;
    color: #553322;
    font-size: 9px;
    text-align: center;
    width: 20px;
    height: 12px;
    border-radius: 6px;
  }

  .introduction {
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    margin-top: 90px;
  }

  .block_1 {
    margin-top: -90px;
    width:95%;
    height:60px;
    line-height: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    background: white;
    z-index: 1;
  }

  .block_num {
    font-size: 14px;
    color: #777777;
  }

  .block_text {
    font-size: 12px;
    color: #777777;
  }

  .go_pet_icon {
    margin-top: 8px;
  }

  .go_addpet_icon {
    margin-top: -2px;
    margin-left: -2px;
  }
</style>
