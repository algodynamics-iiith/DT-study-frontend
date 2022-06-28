import headers from "./headers";
import { bodyBubble, bodyHeap } from "./functionBody";
import { mainBubble, mainHeap } from "./main";

const generateFinalCode = (header, code, main) => {
  return header + "\n\n" + code + "\n\n" + main;
};

const templatesBubble = Object.keys(mainBubble).reduce((accumulator, key) => {
  return {
    ...accumulator,
    [key]: generateFinalCode(headers[key], bodyBubble[key], mainBubble[key]),
  };
}, {});

const templatesHeap = Object.keys(mainHeap).reduce((accumulator, key) => {
  return {
    ...accumulator,
    [key]: generateFinalCode(headers[key], bodyHeap[key], mainHeap[key]),
  };
}, {});

export { templatesBubble, templatesHeap };
