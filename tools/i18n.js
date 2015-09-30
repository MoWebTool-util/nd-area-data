var nodePinYin = require('node-pinyin');

var fs = require('fs');

var enUS = require('./zh-CN-new');
var zhCN = require('./zh-CN');

var i = 0;
var obj = {};
var keys = [];
var values = [];

for (var key in enUS) {
  i++;
  var arr = nodePinYin(key, {
    style: 'normal'
  });

  for (var m = 0; m < arr.length; m++) {
    var item = arr[m].toString(),
      len = item.length;

    arr[m] = item.slice(0, 1).toUpperCase() + item.slice(1, len);
  }
  console.log(i + '---' + arr.join(''));
  values.push(arr.join(''));
}

for (var key in zhCN) {
  keys.push(key);
}

for (var m = 0; m < keys.length; m++) {
  obj[keys[m]] = values[m];
}

console.log(JSON.stringify(obj));

fs.writeFile('./en-US-PinYin.json', JSON.stringify(obj), function(err) {
  if (!err) {
    console.log('拼音文件生成失败');
  } else {
    console.log('拼音文件生成成功');
  }
});
