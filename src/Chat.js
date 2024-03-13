import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,username,room}) {
    const[currentMessage,setCurrentMessage]=useState("")
    const[messageList,setMessageList]=useState([])


    const sendMessage=async()=>{
        if(currentMessage !==""){
            const messageData={
                room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }
            await socket.emit('sendMessage',messageData)
            setMessageList((prev)=>[...prev,messageData])   // saving the sending messages from sender also  to messages array 
            setCurrentMessage("")

        }
    }
    useEffect(()=>{
        socket.on('receive-message',(data)=>{
            // console.log(data);

            setMessageList((prev)=>[...prev,data])
        })


    },[socket])
  return (
    <div className='chat-window'>
        <div className="chat-header">
            <p>Chat App</p>

        </div>
        <div className="chat-body">
          <ScrollToBottom className='message-container'>
          {
              messageList.map((msg,key)=>{
                return(
                    <div className="message" id={username===msg.author? 'you':'other'}>
                    <div>

                        <div className='message-content '>
                            <p>{msg.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id='time'>{msg.time}</p>
                            <p id='author'>{msg.author}</p>
                        </div>
                    </div>
                    </div>
                )
              })
            }
          </ScrollToBottom>

        </div>
        <div className="chat-footer">
            <input onKeyPress={(e)=>{e.key=='Enter' && sendMessage()}} value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}  type="text" placeholder='enter message...' />
            <button onClick={sendMessage}>&#9658;</button>

        </div>


      
    </div>
  )
}

export default Chat
