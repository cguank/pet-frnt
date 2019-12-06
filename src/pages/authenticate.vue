<template>
  <div>
    <van-nav-bar
      title="专家认证"
      left-text=""
      :right-text="sendText"
      left-arrow
      @click-left="goBack"
      @click-right="gotoSend"
    />

    <div class="headImg">
      <van-uploader v-model="expert.headImg"
                    :max-count="1"
                    :before-read="headImgBeforeRead"
                    :disabled="flag2 == true"
                    :deletable="flag2 == false"/>
    </div>
    <div style="margin-top: 10px; ">
      <div v-if="flag2 == false && flag1 == true" style="font-size: 12px; color: #e1836e; width:80%; margin: 0 auto; text-align: center;">若本次未上传新图片，则默认使用上次的图片</div>
      <div style="margin-top: 20px;"></div>
    </div>
    <van-cell-group>
      <van-field
        v-model="expert.name"
        required
        clearable
        label="姓名"
        placeholder="请输入姓名"
        :disabled="flag2 == true"
      />

      <van-field
        v-model="expert.occupation"
        required
        clearable
        label="具体职业"
        placeholder="请输入具体职业"
        :disabled="flag2 == true"
      />

      <van-field
        v-model="expert.workplace"
        required
        clearable
        label="工作地点"
        placeholder="请输入工作地点"
        :disabled="flag2 == true"
      />

      <van-field
        v-model="expert.currentPosition"
        required
        clearable
        label="现任岗位"
        placeholder="请输入现任岗位"
        :disabled="flag2 == true"
      />

      <van-field
        v-model="expert.professionalTitle"
        required
        clearable
        label="职称"
        placeholder="请输入职称"
        :disabled="flag2 == true"
      />

      <van-field
        v-model="expert.email"
        required
        clearable
        label="邮箱"
        placeholder="请输入邮箱"
        :disabled="flag2 == true"
      />

      <van-field
        v-model="expert.qualification_id"
        required
        clearable
        label="资格证编号"
        placeholder="请输入执业兽医资格证编号"
        :disabled="flag2 == true"
      />

      <van-field
        readonly
        clickable
        label="获取时间"
        :value="expert.qualification_date"
        placeholder="选择职业兽医资格证取得时间"
        @click="dateShowPicker"
        :disabled="flag2 == true"
      />
      <van-popup v-model="date_showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="date_showPicker = false"
          @confirm="onConfirmDate"
          :disabled="flag2 == true"
        />
      </van-popup>

      <van-field
        readonly
        required
        clickable
        label="学历"
        :value="expert.education"
        placeholder="选择学历"
        @click="educationShowPicker"
      />
      <van-popup v-model="education_showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="education_columns"
          @cancel="education_showPicker = false"
          @confirm="onConfirmEducation"
          :disabled="flag2 == true"
        />
      </van-popup>

      <div style="height: 40px; line-height: 40px; font-size: 14px; margin-left: 15px;">专家介绍：</div>
      <van-field v-model="expert.introduction"
                 placeholder="介绍一下自己的资历吧"
                 type="textarea"
                 rows="2"
                 autosize
                 maxlength="50"
                 clearable
                 show-word-limit
                 :disabled="flag2 == true"
      />
      <!--  1、申请人  2、申请日期 3、任职机构  4、执业兽医资格证编号
      5、职业兽医资格证取得时间 5、学历  下拉选择   6、上传附件的功能
      小学、初中、中专/高中、专科、本科、硕士研究生、博士研究生 -->
    </van-cell-group>

    <div style="margin-top: 10px; margin-left: 15px;">
      <span style="font-size: 14px; color:#cd1e12; margin-left: -7px;">*</span><span style="font-size: 14px;  margin-left: 5px;">资格证书：</span>
      <span style="font-size: 12px; color: #e17b40;" v-if="flag2 == true">审核中</span>
    </div>
    <van-uploader
      style="margin-left: 15px; margin-top: 10px;"
      v-model="expert.fileList"
      multiple
      :max-count="1"
      :disabled="flag2 == true"
      :deletable="flag2 == false"
      :before-read="fileListBeforeRead"
    />  <!-- 此处若传入flag会提示检查类型不是boolean（迷） -->
    <div style="margin-top: 10px; " v-if="flag2 == false && flag1 == true">
      <div style="font-size: 12px; color: #e1836e; width:80%; margin-left: 15px;">若本次未上传新图片，则默认使用上次的图片</div>
      <div style="margin-top: 10px;"></div>
    </div>
    <div style="margin-top: 10px; margin-left: 15px; font-size: 12px; color: #e1836e;" v-if="flag2 == false">完成后请点击右上角“提交”</div>
    <div style="margin-top: 10px; margin-left: 15px; font-size: 12px; color: #dd0e00;" v-if="flag1 == true && flag2 == false">审核意见：{{expert.comment}}</div>
    <div style="height: 40px;"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Button,Notify,NavBar,Toast,Field,Popup,Picker,CellGroup,DatetimePicker,Uploader } from 'vant';

  Vue.use(Button).use(Notify).use(NavBar).use(Toast).use(Field).use(Popup).use(Picker).use(CellGroup).use(DatetimePicker).use(Uploader);
  export default {
    name: "authenticate",
    data() {
      return{
        expert:{
          headImg:[],  // 专家头像 != 用户头像
          name:'',  // 姓名
          occupation:'',          // 具体职业
          workplace:'',          // 工作地点
          currentPosition:'',    // 现任岗位
          professionalTitle:'',    // 职称
          email:'',               // 邮箱
          qualification_id:'',    // 资格证编号
          qualification_date:'',  // 获取时间
          education:'',           // 学历  1-小学 2-初中 3-中专/高中 4-专科 5-本科 6-硕士研究生 7-博士研究生
          introduction:'',    // 个人介绍
          fileList:[],            // 上传资格证书图片
        },
        minDate: new Date(1950,1,1),  // 资格证获取时间最早/晚时间
        maxDate: new Date(),
        date_showPicker:false,
        education_showPicker:false,
        education_columns:['小学', '初中', '中专/高中', '专科','本科','硕士研究生','博士研究生'],
        flag1:false,  // true: 获取已填写过的数据； false: 不获取  路由传入
        flag2:false,  // true: 禁用； false: 可编辑  路由传入
        sendText:'提交',
        fileListStr: '',  // 存放图片路径
        headImgStr: '',  // 存放头像路径
      }
    },
    methods: {
      goBack() {
        // Toast('返回');
        this.$router.go(-1);
      },
      // 返回布尔值
      headImgBeforeRead(file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' ) {
          Toast('请上传 jpg 或 png 格式图片');
          return false;
        }
        else{
          if (file.type.indexOf('image') == -1) {
            Toast('请上传图片');
            return false;
          }
          let config = {
            headers: {
              filePost: true
            }
          };
          let params = new FormData();
          params.append('file', file);
          params.append('flag', 2); //只返回路径,不负责存数据库
          this.$postData('uploadFile', params, config).then(res => {
            this.headImgStr += res.data;
            console.log(this.headImgStr)
          }).catch(err => {
            Notify({ type: 'danger', message: '系统跑丢了' });
          });
          return true;
        }
      },
      // 返回布尔值
      fileListBeforeRead(file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' ) {
          Toast('请上传 jpg 或 png 格式图片');
          return false;
        }
        else{
          if (file.type.indexOf('image') == -1) {
            Toast('请上传图片');
            return false;
          }
          let config = {
            headers: {
              filePost: true
            }
          };
          let params = new FormData();
          params.append('file', file);
          params.append('flag', 2); //只返回路径,不负责存数据库
          this.$postData('uploadFile', params, config).then(res => {
            console.log("file = "+res.data);
            this.fileListStr += res.data;
            console.log(this.fileListStr)
          }).catch(err => {
            Notify({ type: 'danger', message: '系统跑丢了' });
          });
          return true;
        }
      },
      formatDate(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
      },
      onConfirmDate(value) {
        this.expert.qualification_date = this.formatDate(value); // 转化为 yyyy-MM-dd
        this.date_showPicker = false;
      },
      onConfirmEducation(value) {
        this.expert.education = value;
        this.education_showPicker = false;
      },
      educationShowPicker() {
        if(this.flag2 == true) return;
        else{
          this.education_showPicker = true;
        }
      },
      dateShowPicker() {
        if(this.flag2 == true) return;
        else{
          this.date_showPicker = true;
        }
      },
      gotoSend() {

        if(this.flag2 == true) return; // 禁止编辑/提交（以防万一）
        if(this.headImgStr == ''){
          Toast("头像不可为空");
          return;
        }
        if(this.expert.name == ''){
          Toast("姓名不可为空");
          return;
        }
        if(this.expert.occupation == ''){
          Toast("具体职业不可为空");
          return;
        }
        if(this.expert.workplace == ''){
          Toast("工作地点不可为空");
          return;
        }
        if(this.expert.currentPosition == ''){
          Toast("现任岗位不可为空");
          return;
        }
        if(this.expert.professionalTitle == ''){
          Toast("职称不可为空");
          return;
        }
        if(this.expert.email == ''){
          Toast("邮箱不可为空");
          return;
        }
        if(this.expert.qualification_id == ''){
          Toast("资格证编号不可为空");
          return;
        }
        if(this.expert.education == ''){
          Toast("学历不可为空");
          return;
        }
        if(this.expert.fileListStr == ''){
          Toast("资格证图片不可为空");
          return;
        }
        console.log(this.expert);
        let educationId = 0;
        //1-小学 2-初中 3-中专/高中 4-专科 5-本科 6-硕士研究生 7-博士研究生
        if(this.expert.education == '小学') educationId = 1;
        else if(this.expert.education == '初中') educationId = 2;
        else if(this.expert.education == '中专/高中') educationId = 3;
        else if(this.expert.education == '专科') educationId = 4;
        else if(this.expert.education == '本科') educationId = 5;
        else if(this.expert.education == '硕士研究生') educationId = 6;
        else if(this.expert.education == '博士研究生') educationId = 7;
        this.$postData('expertVerify',{
          'headImg': this.headImgStr,
          'name': this.expert.name,
          'occupation': this.expert.occupation,
          'workplace': this.expert.workplace,
          'currentPosition': this.expert.currentPosition,
          'professionalTitle': this.expert.professionalTitle,
          'email': this.expert.email,
          'qualificationId': this.expert.qualification_id,
          'qualificationTime': this.expert.qualification_date,
          'education': educationId,
          'introduction': this.expert.introduction,
          'fileList': this.fileListStr,
        }).then(res => {
          if(res.data == 0){  // 返回0 成功； 1 失败
            // Toast("提交审核");
            this.$router.push('/authenticatesendsuccess');
          }
          else{
            Toast("提交失败，请重试");
          }
        });
      },
    },
    mounted() {
      this.flag1 = this.$route.query.flag1; // 传入是否获取后台已填写过的数据
      this.flag2 = this.$route.query.flag2; // 传入是否禁用编辑
      if(this.flag2 == true) this.sendText = '';  // 不可编辑、不可再次提交
      if(this.flag1 == true){// 获取后台已提交过的审核
        this.$postData('getExpertVerifyDetail',{}).then(res => {
          let obj = res.data.verifyDetail;
          console.log(obj);
          let text = '';
          if(this.flag2 == true) text = '（审核中）';  // 不可编辑、不可再次提交
          else text = '';
          this.expert.name = obj.name + text;  // 姓名
          this.expert.headImg = [{url: obj.headImg}];  // 姓名
          this.headImgStr = obj.headImg;
          this.expert.occupation = obj.occupation + text;  // 姓名
          this.expert.workplace = obj.workplace + text;  // 姓名
          this.expert.currentPosition = obj.currentPosition + text;  // 姓名
          this.expert.professionalTitle = obj.professionalTitle + text;  // 姓名
          this.expert.email = obj.email + text;  // 姓名
          this.expert.qualification_id = obj.qualificationId + text;  // 姓名
          this.expert.qualification_date = obj.qualificationTime + text;  // 姓名
          this.expert.education = obj.education + text;  // 学历
          this.expert.introduction = obj.introduction + text;  // 介绍
          this.expert.fileList = [{url: obj.qualificationPath}];  // 资格证照片
          this.fileListStr = obj.qualificationPath;
          this.expert.comment = obj.comment;  // 审核意见
          this.expert.state = obj.state;  // 审核结果 1-通过 2-不通过
        });
      }
    }
  }
</script>

<style scoped>
  .headImg {
    margin-top: 20px;
    text-align: center;
  }
</style>
