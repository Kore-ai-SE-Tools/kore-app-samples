const config = require('../config');
const axios = require('axios');
const convoStatusUtil=require("./convoStatusUtil").newInstance()

const SinchMsgPreprocessor=(data)=>{

    try{
      const sinch_msg=JSON.parse(data)
      console.log('in SinchMsgPreprocessor crt')

      return JSON.stringify(sinch_msg)
  
    }catch (error) {
        if (error instanceof SyntaxError) {
      console.log('in SinchMsgPreprocessor wrng')

          console.error('JSON parsing error:', error.message);
          return JSON.stringify({"text_message":{"text":data}})
        }else {
          console.error('Unexpected error:', error);
        }
  }
      
  } 

const koreBotHandle=async(message, userId, isNew)=>{
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${config.koreConfig.AUTH_TOKEN}`
            }; 

    const post_data={
                "session":{
                        "new": isNew
                         },
                "message":{
                       "type": "text",
                       "val":message
                       },
               "from" :{
                   "id": userId
                       }
           }  
           console.log(post_data)
    try{
        const result=await axios.post(config.koreConfig.WEBHOOK_URL, post_data, { headers })
        console.log('in kore bot handle',result.data)
        return [result.data,null]
    }
    catch(error){
        console.log('in error',error)
        return [null,error]
        
    }
}

const koreWebhookFetch=async(message,conversationId,contactId,channel,channelId)=>{
    console.log('in koreWebhookFetch',message,conversationId,contactId,channel,channelId)
   

    const[convoIsStarted,err1]=await convoStatusUtil.isStarted(conversationId)
     
    console.log(convoIsStarted)

    if(convoIsStarted===0)
    {   
        const[result, err2]=await convoStatusUtil.Start(conversationId, contactId, channel,channelId)
        console.log(result)
        
        const [response, err3]=await koreBotHandle(message,contactId,true)
        return [response,err3]
    }else{
        const [response, err4]=await koreBotHandle(message,contactId,false)
        return [response,err4]
    }
    
}



   


const KoreMsgPreprocessor=(requestBody)=>{
    if(requestBody.message.contact_message.text_message?.text!=undefined)
    {
        return requestBody.message.contact_message.text_message?.text
    }else{
        let msg=requestBody.message.contact_message.choice_response_message?.postback_data
        console.log('in preprocessor',msg)
        msg=msg.split("_")
        return msg[1]
    }

}
module.exports={koreWebhookFetch,KoreMsgPreprocessor,koreBotHandle,SinchMsgPreprocessor}