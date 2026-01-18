<script setup>
import { ref } from 'vue';
import { useInstagramStore } from '@/stores/instagram';

const usernameInput = ref('');
const igStore = useInstagramStore();

const handleSearch = () => {
  if (usernameInput.value) {
    igStore.searchUser(usernameInput.value);
  }
};
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <input 
      v-model="usernameInput" 
      class="border p-2 w-full rounded" 
      placeholder="Enter Instagram Username..."
      @keyup.enter="handleSearch"
    />
    
    <div v-if="igStore.loading" class="mt-4">Searching...</div>

    <div v-if="igStore.currentUser" class="mt-6 border p-4 rounded bg-slate-50">
        <img 
  :src="`https://images.weserv.nl/?url=${encodeURIComponent(igStore.currentUser.profile_pic_url_hd
  )}`" 
  class="w-20 h-20 rounded-full mx-auto" 
/>
      <!-- <img :src="igStore.currentUser.profile_pic_url" referrerpolicy="no-referrer" class="w-20 h-20 rounded-full mx-auto" /> -->
      <h2 class="text-xl font-bold text-center mt-2">{{ igStore.currentUser.full_name }}</h2>
      <p class="text-gray-600 text-center italic">@{{ igStore.currentUser.username }}</p>
      <p class="mt-4 text-sm">{{ igStore.currentUser.biography }}</p>
    </div>
  </div>
</template>