import { defineStore } from "pinia";

export const codeStore = defineStore({
  id: "code",
  state: () => ({
    fullcode: config.newcode,
    correctcode: "",
    pointercode: config.newcode.substring(0, 1),
    notyetcode: config.newcode.substring(1),
    finishcode: config.newcode.replace(/\s+$/g, ""),
    sampleCode:
      `<function getLowestTemperature(x, y) { return x - y; }>` as string,
  }),
  getters: {
    getSampleCode(state): string {
      return `${state.sampleCode}`;
    },
  },
  actions: {
    setFullCode(value: string): void {
      this.fullcode = value;
    },
    setPointerCode(value: string): void {
      this.pointercode = value;
    },
    setNotYetCode(value: string): void {
      this.notyetcode = value;
    },
    setFinishCode(value: string): void {
      this.finishcode = value;
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
  },
});

//仮のデータ
const config = {
  newcode: `
      <HeaderAll />
      <div class=7box bg-yellow-400'>
      <div class=7box bg-yellow-400'>
          <div class='upperbox bg-white flex justify-center items-center'>
            <div class='codearea flex justify-center items-center '>
              <input class='codearea p-5' type='textarea' placeholder='hello' disabled>
            </div>
          </div>
        </div>
        <div class=7box bg-yellow-400'>
          <div class='upperbox bg-white flex justify-center items-center'>
            <div class='codearea flex justify-center items-center '>
              <input class='codearea p-5' type='textarea' placeholder='hello' disabled>
            </div>
          </div>
        </div>
      </div>
    `,
};
