const express = require("express");
const cors = require("cors");
require ('./db/config')
const User = require('./db/user')
const Product = require('./db/product');
const app = express();


const jwt  =  require ('jsonwebtoken') ;
const jwtkey='e-comm';

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
let user = new User(req.body)
let result = await user.save();
result  = result.toObject();
delete result.password;
jwt.sign({result},jwtkey,{expiresIn:"2h"} , (err,token)=>{
    if (err){
        res.send({result:"someting went wronng"})
    }
    res.send({result ,auth:token})     
})

});

app.post('/login',async  (req,res) =>{
    if(req.body.email && req.body.password){
        let user  = await User.findOne(req.body).select("-password")
        if(user){
            jwt.sign({user},jwtkey,{expiresIn:"2h"} , (err,token)=>{
                if (err){
                    res.send({result:"someting went wronng"})
                }
                res.send({user ,auth:token})     
            })
           
        }
        else{
            res.send({result :  'no user found '})
        }
    }
    else{
        res.send({result :  'no user found'})
    }
});

app.post("/add-product", verifyToken, async (req, res)=>{
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
    console.log(product)
})

app.get("/products", verifyToken,async (req, res)=>{

    let product = await Product.find()
    if(product.length > 0){
        res.send(product)
    }
    else{
        res.send({result:"no data found"})
    }
    
});

app.delete("/product/:id",verifyToken , async(req , res)=>{
    const result =await Product.deleteOne({_id:req.params.id})
    res.send(result)
})
app.get("/product/:id" ,verifyToken , async(req , res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"not fond"})
    }
})
app.put("/product/:id" ,verifyToken, async(req , res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    );
    res.send(result)
})
app.get('/search/:key' ,verifyToken ,async (req, res) => {
    let result = await Product.find({
        "$or":
        [
            {name:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company :{$regex:req.params.key}},
        ]
    });
    res.send(result);
})

function verifyToken(req, res , next) {
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called" ,token)
        jwt.verify(token ,jwtkey,(err , valid)=>{
            if(err){
                res.status(401).send({result:"please provide a valid token"})
            }
            else{
                next();
            }
        } )


    }
    else{
        res.status(403).send({result:"please provide a header"})
    }
}


app.listen(5000)
