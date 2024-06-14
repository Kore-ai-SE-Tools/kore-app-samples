const  route=require("express").Router()
const  {incomingMsgHandler}=require('../controller/handleIncomingMsg')

route.post('/',incomingMsgHandler)


module.exports=route