import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';
// const socket = io.connect('http://localhost:8080')
const socket = io.connect('https://chat-app-socket-io-server-2p4w.onrender.com')
function App() {
  const[username,setUsername]=useState("")
  const[room,setRoom]=useState("")
  const[showChat,setShowChat]=useState(false)

  const joinRoom=()=>{
    if(room!=="" && username !==''){
      socket.emit('join-room',room)
      setShowChat(true)

    }else{
      alert('please provide username and roomid')
      setShowChat(false)

    }

  }

 
  return (
    <div className="App">
     

{
  !showChat ?   <div className="joinChatContainer">
  <h3>Join A Chat</h3>
  <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="" id="" placeholder='john...' />
  <input value={room} onChange={(e)=>setRoom(e.target.value)} type="text" name="" id="" placeholder='Room ID' />
  <button onClick={joinRoom}>Join A Room</button>
</div>   :   <Chat socket={socket} username={username} room={room}/>

}

      {/* <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" />
      <button onClick={sendMessage}>Send Message</button> */}
      
    
    </div>
  );
}

export default App;
