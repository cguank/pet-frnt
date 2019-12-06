<template>
  <div>
    <van-dialog
      v-model="show"
      confirmButtonText="x"
    >
      <symptom-tree
        @getTreeInfo="getTreeInfo"
        :type="$route.query.type"
        ref="refSymptomTree"
      ></symptom-tree>
    </van-dialog>

    <div class="top">
      <van-row>
        <van-col span="6" offset="1" @click="$router.go(-1)">
          <a href="#" class="top-left">
            <img src="@/assets/icon/arrow-left1.svg"/>
            返回
          </a>
        </van-col>
      </van-row>
      <div id="dog_cat" class="static-image">
        <div class="first">
          <van-row>
            <van-col span="4" offset="1">
              <el-button type="primary" plain @click="selectSymptom(11)">鼻子</el-button>
            </van-col>
            <van-col span="4" offset="14">
              <el-button type="primary" plain @click="selectSymptom(6)">眼睛</el-button>
            </van-col>
          </van-row>
        </div>
        <div class="second">
          <van-row>
            <van-col span="4" offset="1">
              <el-button type="primary" plain @click="selectSymptom(2)">口腔</el-button>
            </van-col>
            <van-col span="4" offset="14">
              <el-button type="primary" plain @click="selectSymptom(7)">耳朵</el-button>
            </van-col>
          </van-row>
        </div>
        <div class="third">
          <van-row>
            <van-col span="4" offset="1">
              <el-button type="primary" plain @click="selectSymptom(5)">皮肤</el-button>
            </van-col>
            <van-col span="4" offset="14">
              <el-button type="primary" plain @click="selectSymptom(9)">肺部</el-button>
            </van-col>
          </van-row>
        </div>
        <div class="fourth">
          <van-row>
            <van-col span="4" offset="1">
              <el-button type="primary" plain @click="selectSymptom(10)">腹部</el-button>
            </van-col>
            <van-col span="4" offset="14">
              <el-button type="primary" plain @click="selectSymptom(4)">泌尿部</el-button>
            </van-col>
          </van-row>
        </div>
        <div class="fifth">
          <van-row>
            <van-col span="4" offset="1">
              <el-button type="primary" plain @click="selectSymptom(1)">乳房</el-button>
            </van-col>
            <van-col span="4" offset="14">
              <el-button type="primary" plain @click="selectSymptom(8)">肛门</el-button>
            </van-col>
          </van-row>
        </div>
        <div class="sixth">
          <van-row>
            <van-col span="4" offset="1">
              <el-button type="primary" plain @click="selectSymptom(0)">全身</el-button>
            </van-col>
            <van-col span="4" offset="14">
              <el-button type="primary" plain @click="selectSymptom(3)">四肢</el-button>
            </van-col>
          </van-row>
        </div>

      </div>
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      已选症状
    </van-divider>
    <div class="content">
      <div class="selected-symptom">
        <div class="line" v-for="(item,index) in symptomList" :key="item.id">
          <van-row>
            <van-col span="6" offset="2">
              <div class="left-label">
                {{item.text}}
              </div>
            </van-col>
            <van-col span="6" offset="9">
              <el-button type="danger" round @click="deleteSymptom(index)">删除</el-button>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="submit">
       <van-button type="info" round size="large" @click="submit">立即诊断</van-button>
      </div>
      <van-tabs :active=active :change="onChange" >
        <van-tab v-for="(item,index) in result" :title=item.title :key="item.id">
          <van-row>
            <van-col span="3" offset="1">
              <div >疾病</div>
            </van-col>
            <van-col span="18" offset="1">
              {{item.disease_name}}
            </van-col>
          </van-row>
          <br>
          <van-row>
            <van-col span="3" offset="1">
              <div >类名</div>
            </van-col>
            <van-col span="18" offset="1">
              {{item.className}}
            </van-col>
          </van-row>
          <br>
            <van-row v-if="item.diagnosis">
              <van-col span="3" offset="1">
                <div >确诊</div>
              </van-col>
              <van-col span="18" offset="1">
               {{item.diagnosis}}
              </van-col>
            </van-row>
          <br>
          <van-row v-if="item.main_sym">
              <van-col span="3" offset="1">
                <div >病症</div>
              </van-col>
              <van-col span="18" offset="1">
                {{item.main_sym}}
              </van-col>
          </van-row>
          <br>
            <van-row v-if="item.reason">
            <van-col span="3" offset="1">
              <div>原因</div>
            </van-col>
            <van-col span="18" offset="1">
              {{item.reason}}
            </van-col>
          </van-row>
          <br>
          <van-row v-if="item.cure">
            <van-col span="3" offset="1">
              <div>治疗</div>
            </van-col>
            <van-col span="18" offset="1">
              {{item.cure}}
            </van-col>
          </van-row>
          <br>
          <van-row v-if="item.summary">
            <van-col span="3" offset="1" >
              <div>结论</div>
            </van-col>
            <van-col span="18" offset="1">
              {{item.summary}}
            </van-col>
          </van-row>
          <br>
          <van-row v-if="item.prevention">
            <van-col span="3" offset="1" >
              <div>预防</div>
            </van-col>
            <van-col span="18" offset="1">
              {{item.prevention}}
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import {Row, Col, Divider, Dialog, Toast,Tabs,Tab} from 'vant';

  Vue.use(Row).use(Col).use(Divider).use(Dialog).use(Toast).use(Tabs).use(Tab);

  import {Button} from 'element-ui'

  Vue.use(Button);
  import 'element-ui/lib/theme-chalk/index.css'

  import symptomTree from '@/components/symptomtree'

  import {addList} from '@/assets/js/utils'

  export default {
    name: '',
    components: {
      symptomTree
    },
    data: function () {
      return {
        firstChoice: 0,//0鼻子1眼睛2口腔```````
        symptomList: [
          {
            id: 0,
            text: 'lsjdfoi'
          },
          {
            id: 1,
            text: '离开家是的覅'
          }, {
            id: 2,
            text: '及地方'
          },
        ],
        show: false,
        result:[],
        active:0,
      };
    },
    created() {
      this.symptomList = [];
    },
    mounted() {
      if(this.$route.query.type == '1'){
        document.getElementById("dog_cat").style.background = "url('./static/images/dog-zz.png') no-repeat center ";
      }
      else if(this.$route.query.type == '2'){
        document.getElementById("dog_cat").style.background = "url('./static/images/Inkedcatshadow_LI.jpg') no-repeat center ";
      }
      else {
        document.getElementById("dog_cat").style.background = "url('./static/images/xy.png') no-repeat center ";
        document.getElementById("dog_cat").style.backgroundSize = "80%";
        document.getElementById("dog_cat").style.backgroundPositionX = "right";
      }

    },
    methods: {
      onChange(event) {
        Toast(event)
      },
      deleteSymptom(index) {
        this.$refs.refSymptomTree.activeId.splice(index,1);
        this.$refs.refSymptomTree.selected.splice(index,1);
        this.symptomList.splice(index, 1);
        //this.$router.push('/symptomtree')
      },
      selectSymptom(choice) {
        this.show = true;
        this.$nextTick(() => {
          this.$refs.refSymptomTree.activeIndex=choice;
        })
        this.$getData("getSecondarySymptoms", {
          type: this.$route.query.type,
          position:choice+1
        }).then(res => {
          var systomList=res.data.SymptomsList;
          var list=[];
          if (systomList) {
            systomList.map(item => {
              list.push({id:item.petSymptomId,text:item.symptom})
            });
          }
          this.$refs.refSymptomTree.items[choice].children=list;
        }).catch(res => {
          Toast("服务器繁忙");
        })
      },
      getTreeInfo(array) {
       // console.log(array)
        this.symptomList=[];
        addList(this.symptomList, array);
        // this.symptomList = array;
        this.show = false;
      },
      submit() {
        if(this.symptomList.length == 0){
          Toast("请选择症状");
        }else {
          var symptom=[];
          for (var i=0;i<this.symptomList.length;i++){
           symptom.push(this.symptomList[i].id)
          }
          this.$getData("getDiagnosticResults", {
            type: this.$route.query.type,
            symptom:JSON.stringify(symptom).replace('[','').replace(']','')
          }).then(res => {
            if(res.data) {
              this.result = res.data.result;
              for (var i = 0; i < this.result.length; i++)
                this.result[i].title = "可能疾病" + (i + 1);
              this.result[0].title = "最可能疾病";
              setTimeout(() => {
                window.scrollTo(0, 450)
              }, 100)
            }else{
              Toast("没有找到结果")
            }

          }).catch(res => {
            Toast("服务器繁忙");
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .top {
    margin: 10px;

  img {
    height: 15px;
  }

  .top-left {
    color: #DDBE8E;
  }

  .static-image {
    margin: 10px 0;
    height: 390px;
    width: 352px;
    /*background:url('../../static/images/dog-zz.png') no-repeat center ;*/

  .first {
    position: relative;
    top: 12px;
  }

  .second {
    position: relative;
    top: 41px;
  }

  .third {
    position: relative;
    top: 67px;
  }

  .fourth {
    position: relative;
    top: 97px;
  }

  .fifth {
    position: relative;
    top: 123px;
  }

  .sixth {
    position: relative;
    top: 147px;
  }

  }
  }

  .content {

  .line {
    margin: 10px 0;

  .left-label {
    height: 26px;
    padding: 7px 0;
  }

  }

  }

  .submit {
    margin: 60px 0;
    padding: 0 10%;
    width: 80%;
  }
</style>
