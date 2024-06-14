const config = require('../config');
const axios = require('axios');
const {addData,getData}=require('./demodpd')

function convoStatusUtil() {}

convoStatusUtil.prototype.isStarted=async (conversationId)=>{

    try{
        
        const response=await getData(conversationId)
        console.log(response.data)
        return [response.data.length,null]
    }
    catch(error){
        console.log(error)
        return [null,error]
    }
}

convoStatusUtil.prototype.Start=async(conversationId, contactId, channel,channelId)=>{

    try{
        
        const response=await addData(conversationId, contactId, channel,channelId)
        console.log(response.data)
        return [response.data,null]
    }
    catch(error){
        console.log(error)
        return [null,error]
    }

    
}

module.exports.newInstance=()=>{
    return new convoStatusUtil()
}