<template>
  <div class="chat-container">
    <h2>Chat Room - {{ userId }}</h2>
    <div class="chat-box">
      <div v-for="(msg, index) in messages" :key="index"
           :class="msg.sender === userId ? 'user-message' : 'server-message'">
        <strong>{{ msg.sender }}:</strong> {{ msg.message }}
      </div>
    </div>
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { ref, onMounted } from "vue";
import {io } from "socket.io-client";
import axios from "axios";

export default {
  props : ["userid"],
  setup(props) {
    const socket = io("http://localhost:5000", {query : {userid : props.userid}}); // handshake 만들기. prop으로 받은 userid 포함하여 보냄.
    const messages = ref([]); // DB에서 불러오는 메세지 리스트 // ref는 반응형. ref로 안하려면 computed로 하면 됨.
    const message = ref(); // 입력한 값. 

    const loadChatHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/chat/${props.userid}`);
        messages.value = res.data;
      }catch(error) {
        console.error("Error loading chat history", error );
      }
    }
    onMounted(() => {
    loadChatHistory();
    socket.on("receive-message", (msg) => messages.value.push(msg))
    })

    const sendMessage = () => {
      if (message.value.trim()){
        socket.emit("send-message", message.value);
        messages.value.push ({sender : props.userid, message : message.value});
        message.value = "";
      }
    };

    return {messages, message, sendMessage};
  }, 
};


</script>