import { defineStore } from "pinia";
//import { stat } from "fs";

export const codeStore = defineStore({
  id: "code",
  state: () => ({
    fullCode: config.newCode,
    correctCode: "",
    pointerCode: "",
    notYetCode: config.newCode.substring(0),
    //コード全体の最後にある空白を全て消す
    finishCode: config.newCode.replace(/\s+$/g, ""),
    actualString: config.newCode.replace(/^\s+|\s+$/g, ""),
    index: 0,
    missCount: 0,
    sampleCode: "",
  }),
  getters: {
    getSource(state): string {
      return state.sampleCode;
    },
    getMyCode(state): string {
      return state.writeCode;
    },
    getSuccessPer(state): number {
      const actual = state.actualString.length;
      const totalTouch = actual + state.missCount;
      return (actual / totalTouch) * 100;
    },
    getMissCount(state): number {
      return state.missCount;
    },
  },
  actions: {
    setFullCode(value: string): void {
      this.fullCode = value;
    },
    setPointerCode(value: string): void {
      this.pointerCode = value;
    },
    setNotYetCode(value: string): void {
      this.notYetCode = value;
    },
    setFinishCode(value: string): void {
      this.finishCode = value;
    },
    setSampleCode(value: string): void {
      this.sampleCode = value;
    },
    setJustCode(): void {
      this.setFullCode(this.getSampleCode);
      this.setPointerCode(this.getSampleCode.substring(0, 1));
      this.setNotYetCode(this.getSampleCode.substring(1));
      this.setFinishCode(this.getSampleCode.replace(/\s+$/g, ""));
    },
    setNextIndexCode(i: number): void {
      this.correctCode = this.fullCode.substring(0, i);
      this.pointerCode = this.fullCode.substring(i, i + 1);
      this.notYetCode = this.fullCode.substring(i + 1);
    },
    startGame(): void {
      if (this.fullCode[0] !== "\n" && this.fullCode[0] !== " ") {
        this.setNextIndexCode(0);
        this.index += 1;
      } else {
        for (let i = 0; i < this.fullCode.length; i++) {
          if (this.fullCode[i] !== "\n" && this.fullCode[i] !== " ") {
            this.setNextIndexCode(i);
            this.index = i + 1;
            break;
          }
        }
      }
    },
    changeLine(): void {
      for (let i = this.index; i < this.fullCode.length; i++) {
        if (this.fullCode[i] !== "\n" && this.fullCode[i] !== " ") {
          this.setNextIndexCode(i);
          this.index = i + 1;
          break;
        }
      }
    },
    moveIndex(): void {
      this.setNextIndexCode(this.index);
      this.index += 1;
    },
    setMissCount(): void {
      this.missCount += 1;
    },
    resetCode(): void {
      this.correctCode = "";
      this.pointerCode = "";
      this.notYetCode = config.newCode.substring(0);
      this.index = 0;
      this.missCount = 0;
    },
  },
});

//仮のデータ
const config = {
  newCode: `
    <template>
    <div ref="upper"></div>
    `,
};