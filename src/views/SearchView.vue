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
  <div class="p-6 max-w-2xl mx-auto min-h-screen bg-slate-900 text-slate-100">
    <div class="relative group">
      <input 
        v-model="usernameInput" 
        class="w-full bg-slate-800 border border-slate-700 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all shadow-xl text-lg" 
        placeholder="Enter Instagram Username..."
        @keyup.enter="handleSearch" 
      />
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <button 
        @click="handleSearch"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl transition-colors font-medium"
      >
        Search
      </button>
    </div>

    <div v-if="igStore.loading" class="mt-8 animate-pulse bg-slate-800 p-8 rounded-3xl border border-slate-700">
      <div class="w-40 h-40 bg-slate-700 rounded-2xl mx-auto"></div>
      <div class="h-6 bg-slate-700 rounded w-1/3 mx-auto mt-6"></div>
      <div class="h-4 bg-slate-700 rounded w-1/4 mx-auto mt-2"></div>
      <div class="h-20 bg-slate-700 rounded w-full mt-8"></div>
    </div>

    <div v-else-if="igStore.currentUser" class="mt-8 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden relative">
      <div class="absolute top-0 left-0 w-full h-50 bg-linear-to-r from-sky-600 to-indigo-600 opacity-20"></div>

      <div class="relative z-10">
        <img 
          :src="`https://images.weserv.nl/?url=${encodeURIComponent(igStore.currentUser.profile_pic_url_hd)}`" 
          class="w-80 h-80 rounded-3xl mx-auto shadow-2xl border-4 border-slate-800 object-cover" 
        />
        
        <div class="text-center mt-6">
          <h2 class="text-3xl font-bold tracking-tight text-white">{{ igStore.currentUser.full_name }}</h2>
          <p class="text-sky-400 font-medium text-lg">@{{ igStore.currentUser.username }}</p>
        </div>

        <!-- <div class="mt-8 grid grid-cols-3 gap-4 border-y border-slate-700 py-6">
          <div class="text-center">
            <p class="text-2xl font-bold text-white">{{ igStore.currentUser.media_count || 0 }}</p>
            <p class="text-slate-500 text-xs uppercase tracking-widest">Posts</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-white">{{ igStore.currentUser.total_clip_count || 0 }}</p>
            <p class="text-slate-500 text-xs uppercase tracking-widest">Reels</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-white">{{ igStore.currentUser.is_verified ? 'Yes' : 'No' }}</p>
            <p class="text-slate-500 text-xs uppercase tracking-widest">Verified</p>
          </div>
        </div> -->

        <div class="mt-8">
          <h3 class="text-slate-400 text-xs uppercase font-bold tracking-widest mb-3">Biography</h3>
          <p class="text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
            {{ igStore.currentUser.biography }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="!igStore.loading && !igStore.error" class="mt-20 text-center text-slate-500">
      <p>Search for a profile to view analytics</p>
    </div>
  </div>
</template>