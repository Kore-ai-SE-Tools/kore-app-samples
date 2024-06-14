const fetch = require('cross-fetch');
const {koreWebhookFetch,KoreMsgPreprocessor,SinchMsgPreprocessor}=require('../utils/koreWebhookUtil')
const config=require('../config')
//handler for msg handler(webhook url)


const incomingMsgHandler=async (req, res) => {
    console.log('in msg handler')
    var requestBody = req.body;
    console.log(requestBody)

    if (requestBody.message != undefined) {
        const  incoming_msg=KoreMsgPreprocessor(requestBody)
        // console.log(incoming_msg);
        console.log(incoming_msg,requestBody.message.conversation_id,requestBody.message.contact_id,requestBody.message.channel_identity.channel,requestBody.message.channel_identity.identity)

        //webhook call to kore.ai bot
        const [data,err]= await koreWebhookFetch(incoming_msg,requestBody.message.conversation_id,requestBody.message.contact_id,requestBody.message.channel_identity.channel,requestBody.message.channel_identity.identity)
        
        if(err) return  res.sendStatus(400)
        console.log(data)

        for(let i=0;i<data.data.length;i++){

            //payload for sinch
            const sendMessage = {
                app_id: requestBody.app_id,
                recipient: {
                    contact_id: requestBody.message.contact_id
                },
                message: JSON.parse(SinchMsgPreprocessor(data.data[i].val)),
                channel_priority_order: [requestBody.message.channel_identity.channel]
            };

            console.log(sendMessage);



            //sending response msg to sinch
            try{
            let result = await fetch(
                    "https://us.conversation.api.sinch.com/v1/projects/" + requestBody.  project_id + "/messages:send",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: 'Basic ' + Buffer.from(config.sinchConfig.ACCESS_KEY + ":" +config.sinchConfig.ACCESS_SECRET).toString('base64')
                        },
                        body: JSON.stringify(sendMessage)
                    }
                );
            console.log(await result.json());
    }
    catch(error){
          console.log(error)
        }
    }

       
        res.send("Ok");
        
      
    }
    else {
        res.send("Ok");
    }
}
module.exports={incomingMsgHandler}