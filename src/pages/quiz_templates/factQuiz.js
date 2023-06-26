export const quiz = {
  0: [
    {
      question:
        "What is fatorial of 5?",
      answers: [
        10,
        20,
        30,
        120
      ],
      type: "single",
      correctAnswer: 120,
      score: 4,
      qid: 1,
      negScore: 1,
    },
    {
      question:
        "What is fatorial of 0?",
      answers: [
        0,
        1,
        "Infinity",
        "Undefined"
      ],
      type: "single",
      correctAnswer: 1,
      score: 4,
      qid: 2,
      negScore: 1,
    },
    {
      question:
        "Which of the following is false?",
      answers: [
        "Factorial of infinity is undefined.",
        "Factorial cannot be a negative number.",
        "The factorial of a number is always greater than the number itself.",
        "The set of all factorials is a subset of the Natural number set."
      ],
      type: "single",
      correctAnswer: "The factorial of a number is always greater than the number itself.",
      score: 4,
      qid: 4,
      negScore: 1,
    },
    {
      question:
        "What is the return condition for factorial in recursion if the input parameter number is n?",
      answers: [
        "n = 0",
        "n = 1",
        "n < 0",
        "n >= 1"
      ],
      type: "single",
      correctAnswer: "n = 0",
      score: 4,
      qid: 3,
      negScore: 1,
    },
  ]
};
