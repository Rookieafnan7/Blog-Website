//jshint esversion:6
const lodash = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/blogpostDB");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const BlogPost = new mongoose.Schema({
  postTitle:{
    type:String,
    required:true
  },
  postContent:String
});

const blogPost = new mongoose.model("blogpost",BlogPost);

// const blogposttest = new blogPost({
//   postTitle:"Test",
//   postContent:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac dapibus quam. Nam tempus, erat et imperdiet consequat, leo metus dapibus purus, ut finibus leo orci quis neque. Duis ac ex eget tortor porttitor rutrum. Aenean eu cursus diam. Praesent efficitur a purus in mattis. Proin in porttitor turpis, in molestie metus. Maecenas quis diam eget nisi porta efficitur. Pellentesque posuere porttitor leo vel cursus. Nullam ac erat a lorem laoreet pretium ut finibus enim. Morbi vel diam eu lacus feugiat suscipit et nec enim. Phasellus pulvinar purus non diam ornare, non dignissim sem facilisis. Cras laoreet erat nec dignissim congue.

//   Quisque dignissim nulla odio, ac placerat ante vehicula consectetur. Duis vestibulum mattis tortor vitae vehicula. Quisque suscipit orci at orci sodales, ut pellentesque nulla lacinia. Sed a urna vel libero vestibulum iaculis. Nulla eleifend tortor quis ligula pulvinar, in finibus leo ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas hendrerit in lacus et semper. Suspendisse tellus purus, luctus ut felis ut, tincidunt congue justo. Suspendisse ullamcorper est id nunc placerat, nec cursus tortor maximus. Curabitur tristique, libero sed placerat consequat, augue lacus placerat urna, vel pulvinar orci dolor eget erat. Donec at lectus dui. Cras sed ullamcorper metus, eget viverra turpis. Nunc consectetur dui ex, eget commodo ex fermentum id. Morbi facilisis ac orci non elementum. Aliquam placerat, risus dignissim scelerisque semper, lacus justo dapibus odio, in laoreet nisi ex nec ligula.`
// })  

// blogposttest.save();


app.get("/",(req,res)=>{

  blogPost.find({},function(err,foundPosts){
    if(!err){
      res.render("home",{
        heading:"Home",
        heading_content:homeStartingContent,
        blogLogs:foundPosts
      }) 
    }else{
      console.log(err);
    }
  })

});

app.get("/about",function(req,res){
  res.render("about",{
    aboutDesc: aboutContent 
  });
});
app.get("/contact",function(req,res){
  res.render("contact",{
    contactDesc: contactContent
  });
});
// app.get("/compose",(req,res)=>{
//   res.render("compose",{

//   });
// })
// app.post("/post:")
app.get("/posts/:parameter",function(req,res){
  let searchParam = req.params.parameter;
  // let decodedParam = decodeURI(searchParam);
  // console.log(searchParam);
  // var foundPost = posts.find((element)=>{return lodash.kebabCase(element.postTitle)===searchParam});
  // // console.log(foundPost);
  // if(foundPost===undefined){
  //   res.send("Wrong parameter");
  // }else{
  //   res.render("post",{blogPost: foundPost});
  // }

  blogPost.findOne({_id:searchParam},function(err,foundPost){
    if(!err){
      res.render("post",{blogPost:foundPost})
    }else{
      console.log(err);
    }
  })
});

app.get("/compose",function(req,res){
  res.render("compose",{});
})

app.post("/compose",function(req,res){
  // const post = {
  //   postTitle : req.body.blogTitle,
  //   postDesc : req.body.blogDesc
  // }

  const post = new blogPost({
    postTitle:req.body.blogTitle,
    postContent:req.body.blogDesc
  })
  post.save();
  // posts.push(post);
  res.redirect("/");
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
