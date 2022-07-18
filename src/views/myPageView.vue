<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import UsKeyboard from "../components/UsKeyboard.vue";
import { authStore } from "../stores/auth";
import { recordStore } from "../stores/record";

const auth = authStore();
auth.getAuthState();
const { currentUser, getDisplayname } = storeToRefs(auth);

// firebaseの個人プロジェクトとしての設定
// .gitignoreの設定
const useRecord = recordStore();
const {
  getRecords,
  getRecordsLength,
  getLatestRecord,
  getSuccessPerAvg,
  getStars,
} = storeToRefs(useRecord);

onMounted(() => {
  useRecord.getDbRecords();
});
</script>

<template>
  <div
    class="top h-auto py-3 flex justify-around"
    style="background-color: #f9f9f9"
  >
    <div
      class="left-container h-auto w-4/12 flex flex-col bg-white rounded-lg shadow-md text-center"
    >
      <div class="img-wrap max-h-1/5">
        <!-- アカウントimage -->
        <div
          class="relative m-auto w-1/4 h-24 overflow-hidden bg-gray-100 rounded-full"
        >
          <img
            v-show="currentUser?.displayName != null"
            id="dropdownNavbarLink"
            data-dropdown-toggle="dropdownNavbar"
            class="absolute w-32 h-32 rounded-full"
            :src="String(currentUser?.photoURL)"
            alt=""
          />
        </div>
      </div>
      <div class="">
        <h5 class="text-base font-semibold tracking-tight text-gray-900 mt-2">
          {{ getDisplayname }} さん
        </h5>
        <h5 class="text-base font-semibold tracking-tight text-gray-900 mt-2">
          トータルプレイ回数：{{ getRecordsLength }} 回
        </h5>
        <h5 class="text-base font-semibold tracking-tight text-gray-900 mt-2">
          成功率の平均:{{ getSuccessPerAvg }} %
        </h5>
        <div class="flex justify-center items-center mt-2.5 mb-5">
          <svg
            v-for="(n, index) in getStars"
            :key="index"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3"
            >{{ getStars }}</span
          >
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-white border-t w-full sm:pt-2 sm:px-4">
            <h5 class="mb-2 text-lg font-medium text-gray-500">
              最新のプレイ情報
            </h5>
            <div class="flex justify-center items-baseline text-gray-900">
              <span class="text-xl font-semibold">スコア</span>
              <span class="text-xl font-extrabold tracking-tight"> : </span>
              <span class="text-xl font-extrabold tracking-tight"
                >{{ getRecordsLength == 0 ? "none" : getLatestRecord.score }}
              </span>
            </div>

            <ul role="list" class="flex-col">
              <li class="flex justify-around space-x-3 mt-2">
                <div class="flex-shrink-0 w-20 h-5 text-blue-600">言語</div>
                <span
                  class="text-base font-normal leading-tight text-gray-500"
                  >{{
                    getRecordsLength == 0 ? "none" : getLatestRecord.lang
                  }}</span
                >
              </li>
              <li class="flex justify-around space-x-3 mt-2">
                <div class="flex-shrink-0 w-20 h-5 text-blue-600">レベル</div>
                <span
                  class="text-base font-normal leading-tight text-gray-500"
                  >{{
                    getRecordsLength == 0 ? "none" : getLatestRecord.level
                  }}</span
                >
              </li>
              <li class="flex justify-around space-x-3 mt-2">
                <div class="flex-shrink-0 w-20 h-5 text-blue-600">時間</div>
                <span
                  class="text-base font-normal leading-tight text-gray-500"
                  >{{
                    getRecordsLength == 0 ? "none" : getLatestRecord.time
                  }}</span
                >
              </li>
              <li class="flex justify-around space-x-3 mt-2">
                <div class="flex-shrink-0 w-20 h-5 text-blue-600">
                  ミスタイプ
                </div>
                <span class="text-base font-normal leading-tight text-gray-500"
                  >{{
                    getRecordsLength == 0 ? "none" : getLatestRecord.missCount
                  }}
                  回</span
                >
              </li>
              <li class="flex justify-around space-x-3 mt-2">
                <div class="flex-shrink-0 w-20 h-5 text-blue-600">成功率</div>
                <span class="text-base font-normal leading-tight text-gray-500"
                  >{{
                    getRecordsLength == 0 ? "none" : getLatestRecord.successPer
                  }}%</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="right-container h-auto w-7/12 p-4 bg-white rounded-lg shadow-md"
    >
      <div class="right-top-container flex flex-col w-full h-2/4">
        <div class="shadow-md sm:rounded-lg h-max">
          <div class="scroll-wrap">
            <table class="w-full text-sm text-left text-gray-500 m-0">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-center">言語</th>
                  <th scope="col" class="px-6 py-3 text-center">
                    ミスタイプ数
                  </th>
                  <th scope="col" class="px-6 py-3 text-center">日付</th>
                  <th scope="col" class="px-6 py-3 text-center">苦手キー</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(record, index) in getRecords"
                  :key="index"
                  class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
                  >
                    {{ record.lang }}
                  </th>
                  <td class="px-6 py-4 text-center">
                    {{ record.missCount }}回
                  </td>
                  <td class="px-6 py-4 text-center">
                    {{ useRecord.getCreatedAtString(record.createdAt) }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <p
                      @click="useRecord.makeItRed(record.codeMissTypes)"
                      class="font-medium text-blue-600 hover:underline cursor-pointer"
                    >
                      Display
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        class="right-bottom-container w-full h-2/4 flex justify-center items-center"
      >
        <UsKeyboard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-wrap {
  overflow: auto;
  width: 100%;
  height: 200px;
}

.scroll-wrap table {
  margin: 0;
  border-spacing: 0;
}

.scroll-wrap td {
  white-space: nowrap;
  padding: 5px;
}

.scroll-wrap th {
  white-space: nowrap;
}

.scroll-wrap tr:first-child th:first-child {
  z-index: 1;
}
</style>
