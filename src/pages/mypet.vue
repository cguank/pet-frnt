<template>
    <div>
      <van-nav-bar
        title="我的宠物"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
      />

      <van-list
        v-model="loadMore.loading"
        :finished="loadMore.finished"
        :offset="5"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in pet_info" :key="item.id">
          <div style="height: 10px;"></div>
          <van-row @click="goCheckPet(item)">
            <van-col span="1"></van-col>
            <van-col span="4">
              <van-image
                round
                width="3rem"
                height="3rem"
                fit="cover"
                :src="item.headimg"
              />
            </van-col>
            <van-col span="16">
              <div>
                <span class="pet_name">{{item.name}}</span>
                <van-image
                  width="1rem"
                  height="1rem"
                  fit="cover"
                  :src="item.sex_img"
                  style="margin-left: 5px;"
                />
              </div>
              <div>
                <div class="pet_kind">{{item.kind}}</div> <div class="pet_age">{{item.age}}岁</div>
              </div>
            </van-col>
            <van-col span="2">
              <van-icon name="arrow" style="margin-top: 15px;" color="#bbbbbb"/>
            </van-col>
          </van-row>
          <div style="height: 1px; background: #eeeeee; margin-top: 5px;"></div>
        </div>
      </van-list>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Progress,Row, Col,Image,Icon,List  } from 'vant';
  import { addList } from "@/assets/js/utils";
  Vue.use(NavBar).use(Toast).use(Progress).use(Row).use(Col).use(Image).use(Icon).use(List);
  export default {
    name: "mypet",
    data() {
      return {
        pet_info:[],
        flag:0,
        petNum:0,
        currentPage:1,
        loadMore: {
          loading: false,
          finished: false,
        },
      }
    },
    created(){
      this.flag = this.$route.query.flag;
    },
    methods: {
      onClickLeft() {
        Toast('返回');
        this.flag = this.$route.query.flag;
        if(this.flag==1){
          this.$router.push({path:'/usercenter'});
        }else if(this.flag==2){
          this.$router.push({path:'/userpage'});
        }else{
          this.$router.go(-1);
        }
        //this.$router.go(-1);
      },
      onLoad() {
        this.loadMore.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData("getMyPetList", {
            currentPage: this.currentPage
          }).then(res => {
            var data = res.data.petList;
            //console.log(data);
            //console.log(data.length);
            this.petNum = res.data.total;
            //console.log(this.petNum);
            this.currentPage++;
            if (data) {
              data.map(item => {
                item.name = item.petName;
                item.headimg = item.headImg;
                item.age = item.petAge;
                item.sex_img = (item.petSex==1)?'./static/images/male.png':'./static/images/female.png';
                item.sex = (item.petSex==1)?'GG':'MM';
                if(item.petType==1){
                  item.kind='狗';
                }else if(item.petType==2){
                  item.kind='猫';
                }else{
                  item.kind='其他';
                }
              });
              addList(this.pet_info, data);
            }
            if (data == null || data.length < 10) {
              //加载完了
              this.loadMore.loading = false;
              this.loadMore.finished = true;
            } else this.loadMore.loading = false;
          });

        }, 500);
/*        setTimeout(() => {
          this.loadMore.finished = true;
          this.loadMore.loading = false;
        }, 500);*/
      },
      goCheckPet(item) {
        this.flag = this.$route.query.flag;
        //Toast('前往宠物详情界面');
        console.log(this.flag);
        this.$router.push({path:'/petdetail',query: {pet: item,flag:this.flag}});
      }
    },
    created() {
      /*this.pet_info=[{
        id:1,
        name:'pet_1',
        headimg:'./static/images/head1.jpeg',
        age:2,
        sex:'MM',
        sex_img:'./static/images/female.png',
        kind:'其他品种',
      },{
        id:2,
        name:'pet_2',
        headimg:'./static/images/head3.jpeg',
        age:4,
        sex:'GG',
        sex_img:'./static/images/male.png',
        kind:'其他品种',
      }]*/
    }
  }
</script>

<style scoped>
  .pet_name {
    font-size: 16px;
    color: #555555;
  }

  .pet_kind {
    height: 17px;
    width: 50px;
    text-align: center;
    line-height: 17px;
    font-size: 10px;
    color: #bbbbbb;
    margin-top: 7px;
    display: block;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
  }

  .pet_age {
    font-size: 14px;
    color: #777777;
    margin-top: -19px;
    margin-left: 60px;
  }
</style>
