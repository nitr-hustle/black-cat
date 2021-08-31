const express=require("express");
const server=express();
const request=require("request");
const https=require("https");

server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

server.get("/signup.html", function(req, res){
    res.sendFile(__dirname+"/Signup.html");
})

server.post("/signup.html", function(req, res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const emailId=req.body.emailId;
    const data={
        members:[
            {
                email_address:emailId,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us5.api.mailchimp.com/3.0/lists/02fd4c1a35";
    const options={
        method:"POST",
        auth:"avipson:b33b22a1d986cad1b3751addc3e3b58f-us5"
    }

    const request=https.request(url,options,function(response){
       if(response.statusCode===200){
           res.sendFile(__dirname+"/success.html");
       } 
       else{
        res.send("<h1>Uh oh !! Go back and try again or contact the developer .</h1>");
       }
        response.on("data",function(data){
        });
    })
    request.write(jsonData);
    request.end();
});

// b33b22a1d986cad1b3751addc3e3b58f-us5

// 02fd4c1a35
server.get("/success.html",function(req,res){
res.sendFile(__dirname+"/success.html");
});
server.post("/success.html",function(req, res){
        res.redirect("/");
});

server.get("/sell.html",function(req, res){
    res.sendFile(__dirname+"/sell.html");
});

server.get("/purchase.html",function(req, res){
    res.sendFile(__dirname+"/purchase.html");
});


server.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
});



server.listen(process.env.PORT || 3000, function(req, res){
    console.log("the server is running on port 3000 of project");
});