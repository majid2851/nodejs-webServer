
 
const request=require('request')

const getGeometry=(address,callback)=>{
    
    const Url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address
    +'.json?access_token=pk.eyJ1IjoibWFqaWQyODUxIiwiYSI6ImNqeHNxdHdzMDBrdGQzbm1yY3Y3YzR5YmsifQ.GW4HLeV8zdzzDsWQxadBQA'
     
    request({url:Url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to server',undefined)
        }else if(response.body.features.length===0)
        {
            callback('unable to get location',undefined)
        }else
        {
            callback(undefined,{
                'lat':response.body.features[0].center[1],
                'long':response.body.features[0].center[0]
            })
        }


    })

}

module.exports=getGeometry ;

