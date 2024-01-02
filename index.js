import express from "express"
import axios from "axios"
import bodyparser from "body-Parser"

let app=express();
const port=3000;
let API_URL="https://api.blockchain.com/v3/exchange";
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/submit',async(req,res)=>{
    let stock_name=req.body["stock"]; 
    console.log(stock_name);
    try{
      const result=await axios.get(API_URL+"/tickers/"+stock_name)
      res.render("index.ejs",{stock: result.data});
      console.log(result.data)
    }catch(error){
      res.render("index.ejs",{stock: error.response.data});
      console.log(error.response.data);
    }
})


app.listen(port,()=>{
    console.log("app is running on port :"+port);
})