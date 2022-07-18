<script setup lang="ts">
import { timerStore } from "../stores/timer";
import { storeToRefs } from "pinia";
import { codeStore } from "../stores/code";

const timer = timerStore();
const code = codeStore();
const { getMinString, getSecString, getPointMsec } = storeToRefs(timer);
const { getSuccessPer, getMissCount } = storeToRefs(code);

defineProps<{
  showMyCodeDialog: boolean;
}>();
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        ref="modal-backdrop"
        class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
        v-show="showMyCodeDialog"
      >
        <div
          class="flex items-start justify-center min-h-screen pt-24 text-center"
        >
          <div
            class="modal-content"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div
              class="modal-header flex flex-shrink-0 items-center justify-center p-4 border-b border-gray-200 rounded-t-md"
            >
              <p class="text-4xl text-cyan-600 font-bold">
                おめでとうございます！
              </p>
            </div>
            <div
              class="modal-body results relative flex flex-col justify-around items-center h-32 px-4 pb-4"
            >
              <p class="text-3xl mb-2 font-bold">
                時間: {{ getMinString }}:{{ getSecString }}:{{ getPointMsec }}
              </p>
              <p class="text-3xl mb-2 font-bold">
                ミスタッチ数: {{ getMissCount }}
              </p>
              <p class="text-3xl font-bold">正確率: {{ getSuccessPer }}%</p>
            </div>

            <div
              class="modal-footer flex items-center justify-center py-4 px-8 border-t border-gray-200 rounded-b-md"
            >
              <RouterLink
                class="inline-block px-20 py-3 hover:bg-indigo-400 rounded-lg shadow-lg bg-indigo-700 text-white"
                to="/result"
                >結果画面へ
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.btn {
  @apply inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md;
}
.menu-item {
  @apply rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm w-24;
}
.menu-content {
  @apply rounded-r-lg flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base;
}
.modal-content {
  @apply border-none shadow-lg relative flex flex-col justify-around w-5/12 max-w-3xl h-[500px] pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current;
}
</style>
