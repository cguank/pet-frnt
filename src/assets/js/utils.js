function addList(list1, list2, index = list1.length) {
  list2.map(item => {
    list1.splice(index, 0, item)
    index += 1;
  })
}

function getScrollTop() {
  var scroll_top = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop;
  } else if (document.body) {
    scroll_top = document.body.scrollTop;
  }
  return scroll_top;
}

function setScrollTop(val) {
  if (document.documentElement && document.documentElement.scrollTop) {
    document.documentElement.scrollTop = val;
  } else if (document.body) {
    document.body.scrollTop = val;
  }
}


function isLogin() {
  var login = false;
  let token = localStorage.getItem('token');
  let expire = Date.now() - localStorage.getItem('date') > 3600000; //过期时间为1小时
  if (token==0 && !expire) {
    login = true;
  }
  return login;
}

function utf16toEntities(str) { //转换存储表情
  var patt=/[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  str = str.replace(patt, function(char){
    var H, L, code;
    if (char.length===2) {
      H = char.charCodeAt(0);
      // 取出高位
      L = char.charCodeAt(1);
      // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
      // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}

function stopKeyBoard(obj) {
  obj.focus();
  obj.setAttribute('readonly', 'readonly');
  setTimeout( () => {
    obj.removeAttribute('readonly');
  }, 200);
}
export {addList, getScrollTop, setScrollTop, isLogin, utf16toEntities, stopKeyBoard }
