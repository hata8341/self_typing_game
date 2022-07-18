<script setup lang="ts">
import { storeToRefs } from "pinia";
import { authStore } from "../stores/auth";
import { soundStore } from "../stores/sound";
import StopWatch from "./StopWatch.vue";

const sound = soundStore();
const auth = authStore();

const { getMuteStatus, vol } = storeToRefs(sound);
const { currentUser, isLoggedIn } = storeToRefs(auth);

auth.getAuthState();
</script>

<template>
  <nav class="bg-white border-b">
    <div class="container m-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="px-2 font-bold text-2xl"
        >CODE-TYPING
      </RouterLink>
      <StopWatch v-show="$route.name == 'game'" />
      <div class="px-2 flex items-center">
        <span
          class="bg-yellow-300 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer"
          v-show="isLoggedIn"
        >
          <RouterLink to="/myPage" class="px-2"> Myページ </RouterLink>
        </span>
        <!-- 音量バー -->
        <div class="flex cursor-pointer mr-4">
          <div
            class="cursor-pointer"
            v-show="getMuteStatus"
            @pointerdown.once="sound.onSound()"
            @click="sound.toggleMute()"
          >
            <p class="mr-2">
              <font-awesome-icon
                icon="volume-xmark"
                class="text-gray-500/75 ml-1"
              />
            </p>
          </div>
          <div
            class="cursor-pointer"
            v-show="!getMuteStatus"
            @click="sound.toggleMute()"
          >
            <p class="mr-2">
              <font-awesome-icon icon="volume-high" class="ml-1" />
            </p>
          </div>
          <div>
            <input
              @change="sound.setVol(vol)"
              type="range"
              min="0"
              step="0.01"
              max="0.5"
              v-model.number="vol"
              class="volume-bar h-3 rounded-lg overflow-hidden appearance-none bg-gray-800 w-24 cursor-pointer border"
              style="background-color: #f9f9f9"
            />
          </div>
        </div>
        <!-- ログインボタン -->
        <div class="flex">
          <button
            v-show="!isLoggedIn"
            @click="auth.login()"
            type="button"
            class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm mr-4 px-3 py-2.5 text-center inline-flex items-center"
          >
            <svg
              class="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            ログイン
          </button>

          <button
            v-show="!isLoggedIn"
            @click="auth.guestsLogin()"
            class="relative inline-flex items-center justify-center p-4 px-6 py-2 bg-white overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group cursor-pointer"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease"
              >ゲスト ログイン
            </span>
            <span class="relative invisible">Button Text</span>
          </button>
        </div>
        <!-- avatar -->
        <div
          v-show="isLoggedIn"
          class="flex justify-center items-center space-x-4"
        >
          <div class="flex items-center space-y-1 font-medium">
            <img
              v-show="currentUser?.displayName != null"
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="w-10 h-10 rounded-full"
              :src="String(currentUser?.photoURL)"
              alt=""
            />

            <div
              v-show="currentUser?.displayName == null"
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
              <svg
                class="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              id="dropdownNavbar"
              class="hidden z-10 w-22 bg-white rounded divide-y divide-gray-100 shadow"
            >
              <div class="py-1 text-center">
                <button
                  @click="auth.logout()"
                  class="block m-auto py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    background: #3478f6;
    box-shadow: -405px 0 0 400px #3478f6;
    border-radius: 50%;
  }
}
</style>
