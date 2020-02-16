import { expose } from "threads/worker";

let orderList: Map<string, () => void> = new Map<string, () => void>();
let isRunning: boolean;

const lazySorter = {
  addSorter(key: string, sortFunction: () => void) {
    orderList[key] = sortFunction;
    this.startRunning();
  },
  removeSorter(key: string, sortFunction: () => void) {
    orderList.delete(key);
    this.startRunning();
  },
  startRunning() {
    // don't spawn a second watcher
    if (isRunning) {
      return;
    }
    isRunning = true;

    // TODO use a proper iteration
    // {

    // stop executing if something required to stop the sorting by blocking the isRunning bool
    if (!isRunning) {
      return;
    }
    if (ResourcesEvaluator.isDownTime) {
      //call ONE of the sorters, then check again if we are in downTime
    }

    // }
    isRunning = false;
  }
};

expose(lazySorter);
