export class AsyncTool {
  async asyncForEach(array: string[], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
