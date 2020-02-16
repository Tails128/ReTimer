class LazyArray<T> extends Array<T> {
  sortingFunction: (a: T, b: T) => number;
  needsSorting: boolean;

  public lazySort(sortingFunction: (a: T, b: T) => number) {
    //TODO: handle parallelysm
    this.sortingFunction = sortingFunction;
    //TODO: in a separate thread
    if (ResourcesEvaluator.isDownTime()) {
      this.sort(sortingFunction);
    }
  }
}
