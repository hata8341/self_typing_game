<script setup lang="ts">
// todo
// script内の記述未記入
// Left Right飛ばない
import { onMounted } from "vue";
import HomeLeftContainer from "../components/HomeLeftContainer.vue";
import HomeRightContainer from "../components/HomeRightContainer.vue";
import { authStore } from "../stores/auth";
import { userStore } from "../stores/user";

const auth = authStore();
auth.getAuthState();
const user = userStore();

onMounted(() => {
  user.resetGame();
  user.resetMisses();
});
</script>

<template>
  <main>
    <div class="h-full flex items-center" style="background-color: #f9f9f9">
      <div class="container mx-auto px-5 sm:py-6">
        <div class="mb-20">
          <div class="text-center">
            <p class="text-xl">
              A website focused on improving your coding skills
            </p>
            <h2 class="text-yellow-300 text-7xl font-bold my-4">CODE-TYPING</h2>
          </div>
        </div>

        <div class="flex justify-around">
          <HomeLeftContainer />
          <HomeRightContainer />
        </div>
      </div>
    </div>
  </main>
</template>
