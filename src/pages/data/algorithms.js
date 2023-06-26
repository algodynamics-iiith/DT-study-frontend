import { templatesBubble, templatesFact, templatesHeap } from "./templates";

const dbIdToAlgorithmId = {
  0: 1, // Bubble Sort
  1: 1, // Bubble Sort
  2: 2, // Heap Sort
  3: 2, // Heap Sort
  4: 3, // Factorial
  5: 3, // Factorial
};

const algorithmsIdToTemplate = {
  1: templatesBubble,
  2: templatesHeap,
  3: templatesFact
};

const algorithmsIdToName = {
  1: "bubbleSort",
  2: "heapSort",
  3: "factorial",
};

export { algorithmsIdToTemplate, algorithmsIdToName, dbIdToAlgorithmId };
