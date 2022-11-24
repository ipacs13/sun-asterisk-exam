<script>

import { ref } from 'vue';
import { search } from './components/Search.js'

export default {
  name: 'App',
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    const topVideo = ref()

    const selectVideo = (item) => {
      const previousVideo = topVideo.value;
      topVideo.value = item;
      const topVideoIndex = searchResults.value.indexOf(topVideo.value)
      searchResults.value.splice(topVideoIndex, 1, previousVideo)
    }
    const searchVideo = () => {
      search({ apiKey: 'AIzaSyACLAZ3zc-_kk_RXmEXrTev1tPuHFrHSJE', query: searchQuery.value }).then((res) => {

        searchResults.value = res.data.items;
        topVideo.value = res.data.items[0];
        searchResults.value.shift()
      });
    }

    return {
      searchQuery,
      searchResults,
      topVideo,
      selectVideo,
      searchVideo
    }
  }
}

</script>

<template>
  <div class="h-full">
    <div class="max-w-screen-lg mx-auto py-2">
      <div id="input">
        <input type="text"
               rer="searchQuery"
               placeholder="Search video..."
               v-model="searchQuery"
               class="w-full border-2 rounded-md p-2 text-lg"
               @keyup.enter="searchVideo">
      </div>
      <div id="videoContainer"
           class="my-10">
        <div class="grid gap-4 grid-cols-12">
          <div class="col-span-7 border p-2">
            <div id="topVideo"
                 v-if="topVideo">
              <iframe :src="`https://www.youtube.com/embed/${topVideo.id.videoId}`"
                      class="w-full h-96"
                      frameborder="0"></iframe>
              <h1 class="text-2xl font-bold my-3"
                  :title="topVideo.snippet.title">{{ topVideo.snippet.title }}</h1>
              <p>{{ topVideo.snippet.description }}</p>
            </div>
          </div>
          <div class="col-span-5 border p-2">
            <div v-for="item in searchResults"
                 @click="selectVideo(item)"
                 role="button"
                 class="mb-3"
                 :key="item.id.videoId">
              <div class="flex">
                <div class="shrink-0">
                  <img :src="item.snippet.thumbnails.default.url"
                       :alt="item.snippet.title">
                </div>
                <div class="flex-grow pl-3">
                  <div class="text-lg font-semibold">
                    {{ item.snippet.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
