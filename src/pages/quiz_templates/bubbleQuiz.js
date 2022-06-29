export const quiz = {
  0: [
    {
      question: "Which two indices are swapped in bubble sort?",
      answers: ["i,i+1", "0,i", "i,i+2", "i,n-1"],
      type: "single",
      correctAnswer: "i,i+1",
      score: 4,
      qid: 1,
      negScore: 1,
    },
    {
      question: "When do you swap indices i,j in bubble sort?",
      answers: ["A[i]>A[j]", "A[i]==A[j]", "A[i]<A[j]", "A[i]<=A[j]"],
      type: "single",
      correctAnswer: "A[i]>A[j]",
      score: 4,
      qid: 2,
      negScore: 1,
    },
    {
      question:
        "After kth pass of bubble sort, which element definitely gets to it's sorted position?",
      answers: [
        "kth largest",
        "k-1th largest",
        "kth smallest",
        "bubble sort doesn't guarantee this.",
      ],
      type: "single",
      correctAnswer: "kth largest",
      score: 4,
      qid: 3,
      negScore: 1,
    },
    {
      question:
        "What is the number of swaps and comparisons respectively in <strong>first</strong> pass of bubble sort for the following array [10,1,4,100,2]",
      answers: ["3,4", "1,1", "1,4", "3,5"],
      type: "single",
      correctAnswer: "3,4",
      score: 4,
      qid: 4,
      negScore: 1,
    },
    {
      question:
        "What is the number of swaps and comparisons respectively in <strong>second</strong> pass of bubble sort for the following array [10,1,4,100,2]",
      answers: ["3,4", "1,1", "1,4", "3,5"],
      type: "single",
      correctAnswer: "3,4",
      score: 4,
      qid: 5,
      negScore: 1,
    },
  ],
};
