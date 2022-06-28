export const quiz = [
  {
    question: "Do you know the song?",
    answers: ["Yes", "No"],
    type: "single",
    correctAnswer: "Yes",
    score: 10,
    qid: 1,
  },
  {
    question:
      "Rate the song on 1-5 how much of an earworm do you think the song is?",
    answers: ["1", "2", "3", "4", "5"],
    type: "multiple",
    correctAnswers: ["1", "3"],
    score: 5,
    negScore: 2.5,
    qid: 2,
  },
  {
    question: "Do you like this song being stuck in your head?",
    type: "single",
    answers: ["Yes", "No", "It is not in my Head"],
    score: 10,
    correctAnswer: "Yes",
    qid: 3,
  },
  {
    question: "Do you like this song being stuck in your head?",
    type: "single",
    answers: ["Yes", "No", "It is not in my Head"],
    score: 10,
    correctAnswer: "Yes",
    qid: 4,
  },
];
