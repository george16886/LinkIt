//var fs = require('fs');
// **** 注意 ****
// 1. 下面的 SD-P1 代表的意思是，讀取 SD 卡的第一個磁碟分割
// 2. Linkit smart 上的不論你接 usb host 還是 SD 卡，都一律會在/Media 資料夾下找到
//fs.readdir('/Media/SD-P1', function (err, data) {
//    if (err) throw err;
//    console.log(data);
//});

var mcs = require('mcsjs');
var exec = require('child_process').exec;
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var deviceId = 'DjyiL5Dd'; 
var deviceKey = 'VulXRHrIA49ersgF';

var myApp = mcs.register({
deviceId: deviceId,
deviceKey: deviceKey,
host: 'api.mediatek.com'
});

myApp.on('LED', function(data, time) {
  if(Number(data) === 1){
    console.log('blink');
  } else {
    console.log('off');
  }
});

child = exec('IMAGE', function (error, stdout, stderr) {

    fs.readdir('/Media/SD-P1', function (err, data) {
        if (err) throw err;
        console.log(data);
    });

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
        console.log('exec error: ' + error);
    }

    fs.readFileAsync('/Media/SD-P1/pika.jpg')
    .then(function(data) {
        myApp.emit('image','', new Buffer(data).toString('base64'));
    });

});

