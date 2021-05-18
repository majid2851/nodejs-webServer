
const hbs=require('hbs')
const express=require('express')
const path=require('path') 
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app=express()
const publicDirectoryPath=path.join(__dirname,'../public') 
const viewsPath=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partials')
const getForecast=require('./utils/forecast')
const getGeometry = require('./utils/geocode')




app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather ',
        name:'majid bagheri'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'majid2851'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help!',name:'majid'})
})
 
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide a location'
        })
    }
    
    getGeometry(req.query.address,(Error,{lat,long}={})=>{
        if(Error){
            return res.send({error:Error})
        }
        getForecast(lat,long,(Error,data)=>{
            if(Error)
            {
                res.send({error:Error})
            }
            // res.send({'city ':req.query.address},
            // {'timeZone':data.timezone});
            res.send({'city':req.query.address,
            timezone:data.timezone})  
        })
 

    })

})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
         products:[]
    })
})

app.get('/help/*',(req,res)=>{
    
    res.render('404',{title:'help article not found'})
})

app.get('*',(req,res)=>{
    //res.send('error 404 in this page.')
    res.render('404',{title:'page not found'})
})




app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})




