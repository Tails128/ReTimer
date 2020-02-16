import { spawn } from "threads";

export class LazySorterManager {
  private static thread;

  public static async addToSorter(key: string, sortFunction: () => void) {
    if (LazySorterManager.thread == undefined) {
      LazySorterManager.thread = await spawn(new Worker("./lazySorter"));
    }

    LazySorterManager.thread.addToSorter(key, sortFunction);
  }
}
