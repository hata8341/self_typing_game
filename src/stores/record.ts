import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { authStore } from "./auth";
import { codeStore } from "./code";
import { timerStore } from "./timer";
import { userStore } from "./user";

const db = getFirestore();
const user = userStore();

const sleep = (waitSeconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitSeconds);
    }, waitSeconds * 1000);
  });
};

type InputRecord = {
  lang: string;
  level: string;
  score: number;
  time: string;
  codeMissTypes: object;
  missCount: number;
  successPer: number;
  createdAt: Timestamp;
};

type Record = {
  lang: string;
  level: string;
  score: number;
  time: string;
  codeMissTypes: Map<string, number>;
  missCount: number;
  successPer: number;
  createdAt: Timestamp;
};

export const recordStore = defineStore({
  id: "record",
  state: () => ({
    records: [] as Record[],
  }),
  getters: {
    getRecords(state): Record[] {
      return state.records;
    },
    getRecordsLength(state): number {
      return Object.keys(state.records).length;
    },
    getLatestRecord(state): Record {
      return state.records[0];
    },
    getSuccessPerAvg(state): number {
      const total = state.records.reduce(
        (preValue, currRecord) => preValue + currRecord.successPer,
        0
      );
      return Math.round((total / this.getRecordsLength) * 10) / 10;
    },
    getStars(): number {
      if (this.getSuccessPerAvg >= 80) {
        return 5;
      } else if (this.getSuccessPerAvg >= 60) {
        return 4;
      } else if (this.getSuccessPerAvg >= 40) {
        return 3;
      } else if (this.getSuccessPerAvg >= 20) {
        return 2;
      } else {
        return 1;
      }
    },
  },
  actions: {
    setRecords(value: Record[]) {
      // 取得した履歴を新しい順にソートする
      this.records = value.sort((a, b) => {
        const firstDate = a.createdAt.toDate();
        const secondDate = b.createdAt.toDate();

        if (firstDate > secondDate) return -1;
        if (firstDate < secondDate) return 1;
        return 0;
      });
    },
    async getDbRecords() {
      const auth = authStore();
      await sleep(1);
      const records: Record[] = [];
      const temp: Record[] = [];
      const querySnapshot = await getDocs(
        collection(db, `users/${auth.getUid}/records/`)
      );
      if (querySnapshot.empty == true) {
        console.log("スナップショットが取得できませんでした。");
      }
      querySnapshot.forEach((doc) => {
        temp.push(doc.data().saveRecord);
      });
      temp.forEach((value) => {
        const record: Record = {
          lang: value.lang,
          level: value.level,
          score: value.score,
          time: value.time,
          codeMissTypes: value.codeMissTypes,
          missCount: value.missCount,
          successPer: value.successPer,
          createdAt: value.createdAt,
        };
        records.push(record);
      });
      this.setRecords(records);
    },
    createRecord(): InputRecord {
      const code = codeStore();
      const timer = timerStore();
      const time: string =
        timer.getMinString +
        ":" +
        timer.getSecString +
        ":" +
        timer.getPointMsec;
      const record: InputRecord = {
        lang: user.getLang,
        level: user.getLevel,
        score: user.getScore,
        time: time,
        // objectへ変換
        codeMissTypes: Object.fromEntries(user.getCodeMissTypes),
        missCount: code.getMissCount,
        successPer: code.getSuccessPer,
        createdAt: Timestamp.fromDate(new Date()),
      };
      return record;
    },
    async saveRecord() {
      const currRecord = this.createRecord();
      try {
        const auth = authStore();
        const saveRecord = currRecord as object;
        console.log("uuidは", auth.getUid);
        await addDoc(collection(db, `users/${auth.getUid}/records/`), {
          saveRecord,
        });
      } catch (error) {
        console.log("ドキュメントへ追加時のエラー: ", error);
      }
    },
    getCreatedAtString(createdAt: Timestamp): string {
      const date = createdAt.toDate();
      // getMonth()メソッドは０〜１１の間の数値を返すので＋１を加える
      return `${date.getFullYear().toString()}年${(
        date.getMonth() + 1
      ).toString()}月${date.getDate().toString()}日`;
    },
    async makeItRed(codeMissTypes: Map<string, number>): Promise<void> {
      await sleep(0.3);
      for (const [key, index] of Object.entries(codeMissTypes)) {
        if (index < 3) {
          document
            ?.querySelectorAll("." + key)[0]
            ?.classList.remove("bg-gray-100");
          document?.querySelectorAll("." + key)[0]?.classList.add("bg-red-200");
        } else if (index < 7) {
          document
            ?.querySelectorAll("." + key)[0]
            ?.classList.remove("bg-gray-100");
          document?.querySelectorAll("." + key)[0]?.classList.add("bg-red-500");
        } else {
          document
            ?.querySelectorAll("." + key)[0]
            ?.classList.remove("bg-gray-100");
          document?.querySelectorAll("." + key)[0]?.classList.add("bg-red-900");
        }
      }
    },
  },
});
