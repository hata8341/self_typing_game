import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";

const auth = getAuth();
const originUser = auth.currentUser;
const provider = new GoogleAuthProvider();

export const authStore = defineStore("auth", {
  state: () => ({
    currentUser: originUser,
  }),
  getters: {
    isLoggedIn: (state) => state.currentUser !== null,
    getDisplayname: (state) =>
      state.currentUser?.displayName != null
        ? state.currentUser?.displayName
        : "ゲスト",
    getUid: (state) =>
      state.currentUser?.displayName != null ? state.currentUser?.uid : "guest",
  },
  actions: {
    async login(): Promise<void> {
      try {
        const res = await signInWithPopup(auth, provider);
        this.$patch({ currentUser: res.user });
      } catch (err) {
        if (err instanceof Error) {
          alert("適切なアカウントを選択してください");
          return;
        }
        throw err;
      }
    },
    async logout(): Promise<void> {
      try {
        await signOut(auth);
        await this.$reset();
        // ルーティングを入れる
      } catch (err) {
        if (err instanceof Error) {
          alert("ログアウトに失敗しました");
          return;
        }
        throw err;
      }
    },
    async getAuthState(): Promise<unknown> {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(
          auth,
          async (user) => {
            this.$patch({ currentUser: user });
            resolve(user);
          },
          (error) => {
            alert("ログイン状態ではありません");
            reject(error);
          }
        );
      });
    },
    async guestsLogin(): Promise<void> {
      try {
        const guest = await signInAnonymously(auth);
        this.$patch({ currentUser: guest.user });
        alert("ログインしました");
      } catch (err) {
        if (err instanceof Error) {
          alert("ログインに失敗しました");
          return;
        }
        throw err;
      }
    },
  },
});
