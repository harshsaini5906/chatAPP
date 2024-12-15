import React from "react";

function Message() {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-bubble text-black bg-white">You were the Chosen One!</div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>

      <div className="chat chat-end">
        <div className="chat-bubble text-black bg-green-300">You were the Chosen One!</div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:46</time>
        </div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </div>
  );
}

export default Message;
