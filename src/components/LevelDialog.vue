<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { codeStore } from "../stores/code";
import { userStore } from "../stores/user";

defineProps<{
  showLevelDialog: boolean;
}>();
const emit = defineEmits<{
  (event: "closeDialog"): void;
}>();
const closeDialog = (): void => {
  emit("closeDialog");
};

const code = codeStore();
const user = userStore();
const router = useRouter();

const { getLang, getLevel } = storeToRefs(user);
const goToGamePage = () => router.push("/game");
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
        v-show="showLevelDialog"
      >
        <div class="flex items-center justify-center min-h-screen text-center">
          <div
            class="modal-content"
            role="dialog"
            ref="modal"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div
              class="modal-header flex flex-shrink-0 items-center justify-center border-b border-gray-200 rounded-t-md"
            >
              <p class="text-2xl font-bold">練習メニュー</p>
            </div>
            <div
              class="modal-body relative flex flex-col justify-around items-center h-72"
            >
              <div class="flex relative w-10/12 max-w-sm">
                <span class="menu-item"> 使用言語 </span>
                <div type="text" class="menu-content">
                  <p>{{ getLang }}</p>
                </div>
              </div>
              <div class="flex relative w-10/12 max-w-sm">
                <span class="menu-item"> レベル </span>
                <div type="text" class="menu-content">
                  <p>{{ getLevel }}</p>
                </div>
              </div>
            </div>
            <div
              class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-around"
            >
              <button
                type="button"
                class="btn bg-purple-600"
                data-bs-dismiss="modal"
                @click="closeDialog()"
              >
                Close
              </button>
              <button
                @click="
                  code.setSelectCode();
                  goToGamePage();
                "
                type="button"
                class="btn bg-blue-600"
              >
                start
              </button>
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
  @apply border-none shadow-lg relative flex flex-col w-3/4  max-w-2xl p-4 pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current;
}
</style>
