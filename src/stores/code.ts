import { defineStore } from "pinia";
import { codeBoxStore } from "./codeBox";

export const codeStore = defineStore({
  id: "code",
  state: () => ({
    fullCode: "",
    correctCode: "",
    pointerCode: "",
    notYetCode: "",
    //コード全体の最後にある空白を全て消す
    finishCode: "",
    index: 0,
    missCount: 0,
    sampleCode: "",
  }),
  getters: {
    getSampleCode(state): string {
      return `${state.sampleCode}`;
    },
    getSuccessPer(state): number {
      const actualLength = state.fullCode.replace(/^\s+|\s+$/g, "").length;
      const totalTouch = actualLength + state.missCount;
      return Math.round((actualLength / totalTouch) * 1000) / 10;
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
    setSampleCode(): void {
      this.setJustCode(this.getSampleCode);
    },
    setJustCode(code: string): void {
      this.setFullCode(code);
      this.setPointerCode(code.substring(0, 1));
      this.setNotYetCode(code.substring(1));
      this.setFinishCode(code.replace(/\s+$/g, ""));
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
      if (this.finishCode.length + 1 === this.index) {
        return;
      }
      if (this.pointerCode === "\n") {
        this.changeLine();
      }
    },
    setSelectCode(): void {
      const codeBox = codeBoxStore();
      codeBox.setSelectCode();
      const selectCode = codeBox.getSelectCode;
      this.setJustCode(selectCode);
    },
    setMissCount(): void {
      this.missCount += 1;
    },
    resetCode(): void {
      this.correctCode = "";
      this.pointerCode = "";
      this.notYetCode = "";
      this.index = 0;
      this.missCount = 0;
    },
  },
});
