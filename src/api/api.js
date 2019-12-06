let baseUrl = 'https://www.hepper.cn'; //部署后的地址

let proxy = '/api';
//proxy = baseUrl + '/pet';

export default {
  userLogin:  proxy + '/user/userLogin',

  getAdvertiseImgList: proxy + '/notify/getAdvertiseImgList',
  getpetinfolist: proxy + '/notify/getPetInfoList',
  getPetInfoDetail: proxy + '/notify/getPetInfoDetail',
  getNotify: proxy + '/notify/getNotify',

  //专家诊断
  getExpertList: proxy + '/expert/getExpertList',
  getExpertDetail: proxy + '/expert/getExpertDetail',
  getIncompleteConsultation: proxy + '/expert/getOngoingCounselList', //获取未完成的诊断列表
  getCompleteConsultation: proxy + '/expert/getFinishedCounselList',
  addConsultationResponse:proxy + '/expert/addConsultationResponse',//专家答复

  releaseConsultation: proxy + '/consultation/addConsultation',
  onLoadIncomplete: proxy + '/consultation/getMyOngoingConsultationList',
  onLoadComplete: proxy + '/consultation/getMyFinishedConsultationList',
  getCounselDetail:proxy + '/consultation/getConsultationDetail',  //获取咨询详情

  getConsultationInteraction:proxy + '/consultation/getConsultationInteraction',//获取问诊答复历史
  addFurtherConsultation:proxy + '/consultation/addFurtherConsultation',//用户追问
  getUserInfo:proxy + '/consultation/getUserInfo',//获取当前登录用户信息 1-用户2-专家
  judgeExpertOrNot:proxy + '/consultation/judgeExpertOrNot',//获取当前登录用户信息 1-用户2-专家
  haveCounselMsgNotRead:proxy + '/consultation/getMyConsultationNotRead',//判断是否有未读的回复or追问

  getPostList: proxy + '/forum/getPostList',//获取精华置顶帖子
  getCreamTopPostList: proxy + '/forum/getCreamTopPostList',//获取精华置顶帖子
  getCreamBelowPostList: proxy + '/forum/getCreamBelowPostList',//获取精华非置顶帖子
  register: proxy + '/user/register',//注册
  sendCode: proxy + '/message/sendcode',//发送验证码
  getMemberAllType: proxy + '/user/getMemberAllType',//获取用户列表

  getNewestPostList: proxy + '/forum/getNewestPostList',//获取最新帖子
  getMyPostList: proxy + '/forum/getMyPostList',//获取我的帖子
  getPostInfo: proxy + '/forum/getPostInfo',//获取帖子详情
  getPostCommentList: proxy + '/forum/getPostCommentList',//获取帖子评论
  getMoreAnswerList: proxy + '/forum/getMoreAnswerList',//获取帖子评论
  getMomentList: proxy + '/forum/getMomentList',//获取娱乐休闲帖子
  getMomentAttachmentList: proxy + '/forum/getMomentAttachmentList',//获取娱乐休闲帖子附件
  getMomentDetail: proxy + '/forum/getMomentDetail', // 获取动态详情
  getCommentList: proxy + '/forum/getCommentList', // 获取评论列表，每条带最多3条回复
  getReplyList: proxy + '/forum/getReplyList', // 获取某评论的所有回复
  addMomentCommentAndReply: proxy + '/forum/addMomentCommentAndReply',  // 添加动态评论/回复
  addMoment: proxy + '/forum/addMoment',  // 添加动态
  deleteMoment: proxy + '/forum/deleteMoment',  // 删除动态
  getMemberMomentList: proxy + '/forum/getMemberMomentList', // 获取用户所有娱乐休闲动态数据
  getMemberMomentAttachmentList: proxy + '/forum/getMemberMomentAttachmentList', // 获取用户所有娱乐休闲动态的图片数据


  forgetPassword:proxy + '/user/forgetPassword',//忘了密码


  insertPost: proxy + '/forum/insertPost',//添加帖子
  addPost: proxy + '/forum/addPost',//添加帖子
  addReply: proxy + '/forum/addReply',//添加回复
  deletePost: proxy + '/forum/deletePost',//删除帖子
  uploadFile: proxy + '/file/Upload',  // 上传文件 flag=4 - 用户帖子上传图片

  addAttention: proxy + '/forum/addAttention',//添加关注
  cancelAttention: proxy + '/forum/cancelAttention',//取消关注
  addCollect: proxy + '/forum/addCollect',//添加收藏
  cancelCollect: proxy + '/forum/cancelCollect',//取消收藏
  addPraise: proxy + '/forum/addPraise',//添加赞
  cancelPraise: proxy + '/forum/cancelPraise',//取消赞

  getMemberInfo: proxy + '/user/getUserInfo',//获取用户本人信息 头像昵称
  getUserHomePageInfo: proxy + '/user/getUserHomePageInfo', //获取个人中心->个人主页数据
  updateMemberInfo: proxy + '/user/updateMemberInfo', //修改个人资料
  getMessagePraiseList: proxy + '/user/getMessagePraiseList', // 获取消息->点赞列表数据
  getMessageCommentList: proxy + '/user/getMessageCommentList', // 获取消息->评论列表数据

  //个人宠物
  addNewPet: proxy + '/pet/addNewPet',      //添加宠物
  setMyPet: proxy + '/pet/setMyPet',        //修改宠物信息
  deleteMyPet: proxy + '/pet/deleteMyPet',  //删除宠物
  getMyPetList: proxy + '/pet/getMyPetList',  //获取我的宠物列表
  getMyPetDetail: proxy + '/pet/getMyPetDetail',  //查看宠物详情

  //粉丝关注好友
  judgeConcernOrNot: proxy + '/friend/judgeConcernOrNot',      //判断是否已关注当前用户
  addMemberFans: proxy + '/friend/addMemberFans',      //添加关注
  removeMemberFans: proxy + '/friend/removeMemberFans',        //取消关注
  getMyFriends: proxy + '/friend/getMyFriends',  //好友列表
  getMyConcerns: proxy + '/friend/getMyConcerns',  //关注列表
  getMyFans: proxy + '/friend/getMyFans',  //粉丝列表
  getMyFriendsByName: proxy + '/friend/getMyFriendsByName',  //好友列表（通过关键字查找）
  getMyConcernsByName: proxy + '/friend/getMyConcernsByName',  //关注列表（通过关键字查找）
  getMyFansByName: proxy + '/friend/getMyFansByName',  //粉丝列表（通过关键字查找）
  getUserListByName: proxy + '/friend/getUserListByName',  //添加好友（通过关键字查找出用户列表）

  getSecondarySymptoms:proxy + '/diagnosis/getSecondarySymptoms',//获取二级症状
  getDiagnosticResults:proxy+'/diagnosis/getDiagnosticResults',//获取诊断结果

  expertVerify: proxy + '/expert/expertVerify',   // 专家认证
  getExpertVerifyDetail: proxy + '/expert/getExpertVerifyDetail',   // 获取专家认证提交信息
  getCollectPostList:proxy+"/forum/getCollectPostList",

  getMemberNotifyList:proxy+"/user/getMemberNotifyList",        //获取通知列表
}
