// import { useEffect, useState } from "react";
// import { webSocket } from "./socket/socket";

// const WebSocketClient = () => {
//     const [messages, setMessages] = useState<string[]>([]);
//     const [input, setInput] = useState("");
//     const [socket, setSocket] = useState<WebSocket>();

//     useEffect(() => {
//         // Initialize WebSocket connection
//         setSocket(webSocket);

//         webSocket.onopen = () => {
//             console.log("WebSocket connection established");
//         };

//         webSocket.onmessage = (event) => {
//             console.log("Message from server:", event.data);
//             setMessages((prev) => [...prev, event.data]);
//         };

//         webSocket.onclose = () => {
//             console.log("WebSocket connection closed");
//         };

//         webSocket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         return () => {
//             webSocket.close();
//         };
//     }, []);

//     const sendMessage = () => {
//         if (socket && input) {
//             socket.send(input);
//             setInput("");
//         }
//     };

//     return (
//         <div>
//             <h1>WebSocket Client</h1>
//             <div>
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Type a message"
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//             <div>
//                 <h2>Messages</h2>
//                 <ul>
//                     {messages.map((msg, index) => (
//                         <li key={index}>{msg}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default WebSocketClient;