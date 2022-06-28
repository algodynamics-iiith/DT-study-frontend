import { templatesBubble, templatesHeap } from "./templates";

const dbIdToAlgorithmId = {
  0: 1,
  1: 1,
  2: 2,
  3: 2,
};

const algorithmsIdToTemplate = {
  1: templatesBubble,
  2: templatesHeap,
};

const algorithmsIdToName = {
  1: "bubbleSort",
  2: "heapSort",
};

export { algorithmsIdToTemplate, algorithmsIdToName, dbIdToAlgorithmId };
