import q11 from "../quiz_images/q11.png";
import q12 from "../quiz_images/q12.png";
import q13 from "../quiz_images/q13.png";
import q14 from "../quiz_images/q14.png";
import q4 from "../quiz_images/q4.png";
import q5 from "../quiz_images/q5.png";
import q6 from "../quiz_images/q6.png";

export const quiz = {
  0: [
    {
      question:
        "Which of the following is complete binary tree representation of array [1,2,3,4,5]?",
      answers: [
        `<img src='${q14}'/>`,
        `<img src='${q11}'/>`,
        `<img src='${q12}'/>`,
        `<img src='${q13}'/>`,
      ],
      type: "single",
      correctAnswer: `<img src='${q11}'/>`,
      score: 4,
      qid: 1,
      negScore: 1,
    },
    {
      question:
        "[Assuming 0 indexing]If parent node is at ith index. What are the indexes of left and right child respectively in Complete Binary Tree representation of array?",
      answers: ["2i+1,2i+4", "3i,3i+1", "4i+1,4i+2", "2i+1,2i+2"],
      type: "single",
      correctAnswer: "2i+1,2i+2",
      score: 4,
      qid: 2,
      negScore: 1,
    },
    {
      question:
        "What is the root node of the max heap of the array [10,1,100,25,4]",
      answers: ["1", "25", "4", "100"],
      type: "single",
      correctAnswer: "100",
      score: 4,
      qid: 3,
      negScore: 1,
    },
  ],
  1: [
    {
      question: `In the heapify algorithm, which node is picked first for heapifying for following complete binary tree? <img src='${q4}'/>`,
      answers: ["9", "4", "100", "2"],
      type: "single",
      correctAnswer: "4",
      score: 4,
      qid: 4,
      negScore: 1,
    },
    {
      question: `How will you convert the given Complete Binary Tree into Max Heap? <img src='${q5}'/>`,
      answers: [
        "already a max heap",
        "swapping node 1,2",
        "swapping node 2,3",
        "swapping node 1,3",
      ],
      type: "single",
      correctAnswer: "swapping node 1,3",
      score: 4,
      qid: 5,
      negScore: 1,
    },
    {
      question: `How many swaps are needed to convert given complete binary tree to Max Heap? <img src='${q6}'/>`,
      answers: ["3", "1", "0", "2"],
      type: "single",
      correctAnswer: "2",
      score: 4,
      qid: 6,
      negScore: 1,
    },
  ],
  2: [
    {
      question:
        'Given a Max Heap, order the steps of heap sort algorithm that are run in loop? <ol class="list-decimal list-inside"><li>Remove last node from tree</li> <li>Swap the values of last and root node</li><li>Heapify root node</li></ol>',
      answers: ["2,3,1", "2,1,3", "1,3,2", "1,2,3"],
      type: "single",
      correctAnswer: "2,1,3",
      score: 4,
      qid: 7,
      negScore: 1,
    },
  ],
};
