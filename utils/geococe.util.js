const request=require('request')


const geocode= async (address, callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicnViYW11dGFzaW0iLCJhIjoiY2tncDQ3NW14MGo3YjJ5bXRnOTQ3ZGZhcCJ9.sqWKHLuHysDkovGTWhbkzQ&limit=1'
    await request({url, json:true }, (error,{body})=>{
        if (error) {
            callback('unable to connect to location services!',undefined)                    
        } else if(body.features.length===0) {
            callback('unable to find location! try another search ',undefined) 
        } else {
                callback(undefined,{
                    latitude:body.features[0].center[1], 
                    longitude:body.features[0].center[0],
                    location:body.features[0].place_name

                 })
                // console.log('latitude is ' +response.body.features[0].center[1] + ' ,longitude is ' +  response.body.features[0].center[0])
            
                }


    })
}


module.exports= geocode