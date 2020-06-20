const express=require('express')
const hbs=require('hbs')
const path=require('path')
const code=require('./utils')
const { query } = require('express')
parpath=path.join(__dirname,'/views/partials')
hbs.registerPartials(parpath)
const app=express()
const p=path.join(__dirname,'/wbpage')
app.set('view engine', 'hbs')
app.use(express.static(p))
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        text: 'Help me'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res .send({
            error:'Error Occured'
        })
    }
  code.weathercode(req.query.address,(error,data)=>{
      if(error){
          return res.send({
              error
          })
      }else{
          res.send(data)
      }
  })
})
app.get('',(req, res)=>{
    res.render('weather')
})
app.listen(3000,()=>{
    console.log('Server is Running...')
})