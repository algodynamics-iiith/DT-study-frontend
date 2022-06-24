import templatesBubble from "./templatesBubble";
import templatesHeap from "./templatesHeap";

const algorithmsIdToTemplate = {
  1: templatesBubble,
  2: templatesHeap,
};

const algorithmsIdToName = {
  1: "bubbleSort",
  2: "heapSort",
};

export { algorithmsIdToTemplate, algorithmsIdToName };
