var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/gettotal',function(req,res){
    fs.readFile(__dirname + '/public/pages.json',function(err,data){
        if(err){
            console.log(err)
        }else {
            //页面输出数据
            // res.json(data.toString())


            //页面输出页数
            var length = JSON.parse(data).result.length;
            res.json({"length":length});
        }
    })
})


app.post('/getlist',function(req,res){


    fs.readFile(__dirname + '/public/pages.json',function(err,data){
        if(err){
            console.log(err)
        }else {

            var start = parseInt(req.body.page_index);
            var start = start*req.body.page_size;
            var end = start + parseInt(req.body.page_size);

            var data = data.toString();
            var json = JSON.parse(data);
            var result = json.result;

            console.log(start + ',' + end)
            var res_arr = result.slice(start,end);

            var res_data = {
                "result":res_arr
            }
            // console.log(res_data)
            res.json(res_data);
        }
    })
})


app.get('/mapmarker',function(req,res){
    fs.readFile(__dirname + '/public/map.json',function(err,data){
        if(err){
            console.log(err)
        }else{
            var json = JSON.parse(data.toString());
            console.log(json)
            res.json(json);
        }
    })
})
app.listen(3002,function(){
    console.log('服务器启动.....3002/gettotal分页')
})
