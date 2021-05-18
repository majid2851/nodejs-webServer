

const request=require('request'); 

const getForecast=(lat,long,callback)=>{
    const Url='https://api.darksky.net/forecast/a4c5cc9dbeb9c02c37c435046393fa6e/'+
    lat+','+long+'?units=si&lang=en'
    request({url:Url,json:true},(error,response)=>{
        if(error)
        {
            console.log('unable to connect')
        }else if(response.body.error)
        {
            console.log('unable to find location')
        }else
        {
            callback(undefined,response.body);
        }
    })
}
module.exports=getForecast;








