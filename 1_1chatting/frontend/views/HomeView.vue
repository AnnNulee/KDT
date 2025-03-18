<template>
  <div class="home-container">
    <h1>채팅방 입장</h1>
    <input v-model="userId" type="text" placeholder="사용자 ID 입력" />
    <button @click="enterChat">채팅방 입장</button>

    <h2>최근 채팅 목록</h2>
    <ul v-if="chatRooms.length > 0">
      <li v-for="chat in chatRooms" :key="chat" @click="enterExistingChat(chat)">
        {{ chat }}
      </li>
    </ul>
    <p v-else class="no-chat">저장된 채팅이 없습니다.</p>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const userId = ref("");
    const chatRooms = ref([]);

    // ✅ 사용자가 새로운 채팅방에 입장
    const enterChat = () => {
      if (userId.value.trim()) {
        router.push(`/chat/${userId.value}`); // 사용자의 ID를 기반으로 채팅방 이동
      } else {
        alert("사용자 ID를 입력해주세요!");
      }
    };

    // ✅ 기존 채팅방 클릭 시 해당 채팅방으로 이동
    const enterExistingChat = (chatId) => {
      router.push(`/chat/${chatId}`);
    };

    // ✅ 최근 채팅 목록 불러오기 (백엔드에서 가져오기)
    const loadChatRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/chat/rooms");  // ✅ MongoDB에서 사용자 ID 목록 가져오기
        chatRooms.value = res.data;
        console.log("✅ 채팅 목록 불러오기 성공:", res.data);
      } catch (error) {
        console.error("❌ Error loading chat rooms:", error);
      }
    };

    // ✅ 컴포넌트가 마운트되면 채팅 목록 불러오기
    onMounted(() => {
      loadChatRooms();
    });

    return { userId, enterChat, chatRooms, enterExistingChat };
  },
};
</script>

