import React from "react";

// import { RouterProvider } from 'react-router-dom';
// import {routes} from "./routes/Routes"
import Routes from "./routes/Routes";
import { ChatContextProvider } from "../context/ChatContextProvider";
import { UserContextProvider } from "../context/UserContextProvider";
import { SocketContextProvider } from "../context/SocketContextProvider";
function App() {
  

  return (
    <UserContextProvider>
        <ChatContextProvider>
        <SocketContextProvider>
          <Routes />
        </SocketContextProvider>
        </ChatContextProvider>
      </UserContextProvider>
  );
}

export default App;
