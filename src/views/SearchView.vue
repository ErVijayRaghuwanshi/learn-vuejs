<script setup>
import { ref, onMounted, watch} from 'vue';
import { useInstagramStore } from '@/stores/instagram';

// const usernameInput = ref('');
// Initialize with a default string instead of an empty one
const usernameInput = ref('sakshi_raghu_1c_');

const igStore = useInstagramStore();

// Watch the store for changes
watch(() => igStore.currentUser, (newUser) => {
  if (newUser) {
    document.title = `${newUser.full_name} (@${newUser.username}) | InstaScraper`;
  } else {
    document.title = 'InstaScraper - Search';
  }
}, { immediate: true }); // immediate: true runs the logic as soon as component loads

const handleSearch = () => {
  if (usernameInput.value) {
    igStore.searchUser(usernameInput.value);
  }
};

// This triggers the search automatically when the component loads
onMounted(() => {
  handleSearch();
});

</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <input v-model="usernameInput" class="border p-2 w-full rounded" placeholder="Enter Instagram Username..."
      @keyup.enter="handleSearch" />

    <div v-if="igStore.loading" class="mt-4">Searching...</div>

    <div v-if="igStore.currentUser" class="mt-6 border p-4 rounded bg-slate-500/10">
      <img :src="`https://images.weserv.nl/?url=${encodeURIComponent(igStore.currentUser.profile_pic_url_hd
      )}`" class="w-20 h-20 rounded-full mx-auto" />
      <!-- <img :src="igStore.currentUser.profile_pic_url" referrerpolicy="no-referrer" class="w-20 h-20 rounded-full mx-auto" /> -->
      <h2 class="text-xl font-bold text-center mt-2">{{ igStore.currentUser.full_name }}</h2>
      <p class="text-gray-600 text-center italic">@{{ igStore.currentUser.username }}</p>
      <pre class="mt-4 text-sm">{{ igStore.currentUser.biography }}</pre>
    </div>
  </div>
</template>