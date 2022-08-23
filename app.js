//api key
//1e552179e78c03303c54a81a64fff3c7-us10
//audience IdleDeadlinebe62141180
 const express = require('express');
 const path=require('path')
 const app = express();
 const request= require('request');
 const bodyParser= require('body-parser');
 const https= require('https');
const { setInterval } = require('timers');
 //app.use('/mailchublic', express.static(__dirname +'public'))
 app.use(express.static(__dirname +'public2'));
 app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
    console.log();
})

app.post('/', (req,res)=>{
    const firstName= req.body.firstName
    const lastName= req.body.lastName
    const email= req.body.email
    const data={
        members:[{
            email_address:email,
            status:'subscribed'

        }],
        merge_fields: {
            FNAME:firstName,
            LNAME:lastName
        }
    }
const  JSONData= JSON.stringify(data)
console.log(JSONData);
const url='https://us10.api.mailchimp.com/3.0/lists/be62141180'
const option={
    auth:`obinna:q1e552179e78c03303c54a81a64fff3c7-us10`,
    method:'POST'
}
const requestHtpps =https.request(url, option, function (response) {
        response.on('data', function(data){
            console.log(JSON.parse(data));
            if (response.statusCode===200){
                res.sendFile(__dirname + "/success.html");
                
            }
            else{
                res.sendFile(__dirname + "/fail.html")
            
            }
        })
        
    
})
requestHtpps.write(JSONData)
requestHtpps.end()




})


app.post('/failure', function(req,res){
    setInterval(() => {
        res.redirect("/")
    }, 3000);
    
})


app.listen(3000, function(){console.log(`listen`);})