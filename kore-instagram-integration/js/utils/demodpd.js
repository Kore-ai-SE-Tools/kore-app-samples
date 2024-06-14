const axios = require('axios');
const config = require('../config');

const addData=async(conversationId, contactId, channel,channelId)=>{
    console.log('in add convo data')
    const data={
        conversationId,
         contactId, 
         channel,
         channelId
    }
    const headers = {
        'content-type': 'application/json',
      };
    const response=await axios.post(config.demoDpd.ACCESS_LINK, data, { headers })
    console.log(response.data)
    return response
}

const getData=async(conversationId)=>{
    console.log('in get convo data')

    const headers = {
        'content-type': 'application/json',
      };
    const response=await axios.get(`${config.demoDpd.ACCESS_LINK}?conversationId=${conversationId}`, { headers })
    console.log(response.data.length)
    return response

}
// addData('1','22','instagram','1211AA')
//getData('1')
module.exports={addData,getData}