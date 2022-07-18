<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import UsKeyboard from "../components/UsKeyboard.vue";
import { codeStore } from "../stores/code";
import { recordStore } from "../stores/record";
import { timerStore } from "../stores/timer";
import { userStore } from "../stores/user";

const user = userStore();
const code = codeStore();
const timer = timerStore();
const record = recordStore();
const { getMinString, getSecString, getPointMsec } = storeToRefs(timer);
const { getMissCount, getSuccessPer } = storeToRefs(code);
const { lang, level } = storeToRefs(user);
const { resetMisses, resetScore } = user;
onMounted(() => {
  makeItRed();
});
let twitterShare = "";

function hasLangLevel(): void {
  if (user.lang === "") {
    twitterShare =
      "http://twitter.com/share?url=" +
      "https://recursion-code-typing.netlify.app/&text=" +
      "Code typingを自分のソースコードでクリアしました！" +
      "%0A%20%23RecursionCS%0a";
  } else {
    twitterShare =
      "http://twitter.com/share?url=" +
      "https://recursion-code-typing.netlify.app/&text=" +
      "Code typing: " +
      user.lang +
      "でレベル" +
      user.level +
      "をクリアしました！%0A%20%23RecursionCS%0a";
  }
}
hasLangLevel();
function makeItRed(): void {
  user.codeMissTypes.forEach((index, key) => {
    if (index < 3) {
      document?.querySelectorAll("." + key)[0]?.classList.remove("bg-gray-100");
      document?.querySelectorAll("." + key)[0]?.classList.add("bg-red-200");
    } else if (index < 7) {
      document?.querySelectorAll("." + key)[0]?.classList.remove("bg-gray-100");
      document?.querySelectorAll("." + key)[0]?.classList.add("bg-red-500");
    } else {
      document?.querySelectorAll("." + key)[0]?.classList.remove("bg-gray-100");
      document?.querySelectorAll("." + key)[0]?.classList.add("bg-red-900");
    }
  });
}
onMounted(async () => {
  await record.saveRecord();
});
</script>

<template>
  <!-- ヘッダーの追加 -->
  <div class="flex items-center" style="background-color: #f9f9f9">
    <div
      class="h-full container mx-auto px-5 sm:py-12 py-4 flex justify-between flex-col md:flex-row-reverse"
    >
      <div
        class="left-box bg-white flex flex-col justify-around lg:ml-8 ml-2 p-4 result-card rounded-lg border border-gray-200 shadow-md"
      >
        <div class="lg:text-5xl text-3xl font-bold text-center">
          スコア: {{ user.score }}
        </div>
        <ol class="result-box text-center">
          <li class="text-2xl mt-1">選択言語: {{ lang }}</li>
          <li class="text-2xl mt-2">レベル: {{ level }}</li>
          <li class="text-2xl mt-2">
            時間: {{ getMinString }}:{{ getSecString }}:{{ getPointMsec }}
          </li>
          <li class="text-2xl mt-2">ミスタイプ数: {{ getMissCount }}</li>
          <li class="text-2xl mt-2">
            成功率: {{ code.fullCode.length === 0 ? 0 : getSuccessPer + "%" }}
          </li>
        </ol>

        <div class="flex justify-center items-center mt-5">
          <a
            v-bind:href="twitterShare"
            class="flex items-center hover:bg-sky-200 px-8 py-2 rounded-lg shadow-lg bg-white text-sky-600 justify-center text-2xl text-center"
            target="_blank"
          >
            <img class="h-10 pr-2" src="../image/twitter2.png" />
            tweet
          </a>
        </div>
        <div class="flex items-center justify-around">
          <RouterLink
            @click="
              code.resetCode();
              timer.resetTimer();
              resetMisses();
              resetScore();
            "
            class="inline-block mr-4 px-2 py-3 text-center w-full hover:bg-indigo-400 rounded-lg shadow-lg bg-indigo-700 text-white"
            to="/"
            >メインに戻る
          </RouterLink>

          <RouterLink
            @click="
              code.resetCode();
              timer.resetTimer();
              resetMisses();
              resetScore();
            "
            class="inline-block ml-4 px-2 py-3 s-button text-center w-full rounded-lg hover:bg-gray-400 shadow-lg bg-gray-600 text-white"
            to="/game"
            >リスタート
          </RouterLink>
        </div>
      </div>

      <div
        class="right-box flex justify-between flex-col lg:mr-8 mr-2 p-4 bg-white rounded-lg border border-gray-200 shadow-md"
      >
        <div class="nigate-keys upper-box flex flex-col">
          <div class="text-4xl font-bold underline mb-4 text-center">
            あなたの苦手キー
          </div>
          <div class="h-full text-3xl p-2 m-2 flex flex-wrap overflow-y-scroll">
            <span
              class="text-3xl m-2"
              v-for="value in user.missTypes"
              :key="value[0]"
              >[ {{ value[0] }}: {{ value[1] }}回 ]
            </span>
          </div>
        </div>
        <div class="flex mt-2 justify-center items-center">
          <!-- キーボード-->
          <div class="bottom-box bg-gray-200 rounded-lg border">
            <UsKeyboard />
          </div>
          <!-- キーボード -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upper-box {
  height: 50%;
  width: 100%;
}
.bottom-box {
  width: 100%;
}
.nigate-box {
  height: 80%;
  width: 100%;
}
.left-box {
  width: 40%;
}
.right-box {
  width: 60%;
}

.nigate-keys {
  font-family: Georgia;
}
</style>
