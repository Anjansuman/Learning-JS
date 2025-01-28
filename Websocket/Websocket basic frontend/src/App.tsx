import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  let [ws, setWs] = useState();
  const inputRef = useRef<HTMLInputElement>();

  function sendMessage() {
    const message = inputRef.current?.value;
    ws.send(message);
  }

  // this is how we receive a message
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setWs(ws);
    console.log("server connected");
    ws.onmessage = (ev) => {
      alert(ev.data);
    }
  }, [])

  return <div>
    <input ref={inputRef} type="text" placeholder='message' />
    <button onClick={sendMessage}>send</button>
  </div>
}

export default App
