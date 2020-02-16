import { LazySortManager } from "../lazySorter/LazySortManager";

class LazyArray<T> extends Array<T> {
  sortingFunction: ((a: T, b: T) => number) | null;
  needsSorting: boolean = false;
  sortingKey: keyof T;
  thread: Promise<any>;

  public lazySort(index: keyof T, sortingFunction: (a: T, b: T) => number) {
    this.stopLazySorter();
    this.setLazySorter(index, sortingFunction);
  }

  private setLazySorter(
    index: keyof T,
    sortingFunction: (a: T, b: T) => number
  ) {
    this.sortingKey = index;
    this.sortingFunction = sortingFunction;

    LazySortManager.addToSorter();
  }

  private lazySortExecutor(sortingFunction: (a: T, b: T) => number) {
    //TODO: think about possible issues with parallelysm & solve them
    if (ResourcesEvaluator.isDownTime()) {
      this.sort(sortingFunction);
      this.needsSorting = false;
    }

    // Set aside from the previous "if" in order to prevent parallelysm issues.
    if (!this.needsSorting) {
      this.stopLazySorter();
    }
  }

  public stopLazySorter() {
    if (this.thread) {
      this.thread.terminate;
      this.thread = null;
    }
  }
}
