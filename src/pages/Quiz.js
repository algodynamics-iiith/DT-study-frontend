import { useEffect, useState } from "react";
import { quiz as impQ } from "./quiz_templates/quizExampleDB";

const QuizPage = () => {
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quiz, setQuiz] = useState(impQ);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    // load selected options from local storage if available
    const selectedOptions = localStorage.getItem("selectedOptions");
    if (selectedOptions) {
      setSelectedOptions(JSON.parse(selectedOptions));
    }
    setQuiz(shuffle(impQ));
  }, []);

  const handleAnswerOption = (currentQuestionId, answer) => {
    selectedOptions[currentQuestionId] = { answerByUser: answer };
    setSelectedOptions({ ...selectedOptions });
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    // console.log(selectedOptions);
  };

  const handleMultipleAnswerOption = (currentQuestionId, answer) => {
    // Initialize the array if it is not initialized
    if (!selectedOptions[currentQuestionId]) {
      selectedOptions[currentQuestionId] = { answerByUser: [] };
      setSelectedOptions({ ...selectedOptions });
      // console.log(selectedOptions[currentQuestionId]);
    }
    if (selectedOptions[currentQuestionId]?.answerByUser.includes(answer)) {
      selectedOptions[currentQuestionId]?.answerByUser.splice(
        selectedOptions[currentQuestionId]?.answerByUser.indexOf(answer),
        1
      );
    } else {
      selectedOptions[currentQuestionId]?.answerByUser.push(answer);
    }
    setSelectedOptions({ ...selectedOptions });
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    // console.log(selectedOptions);
  };

  // const handlePrevious = () => {
  //   const prevQues = currentQuestion - 1;
  //   prevQues >= 0 && setCurrentQuestion(prevQues);
  // };

  // const handleNext = () => {
  //   const nextQues = currentQuestion + 1;
  //   nextQues < quiz.length && setCurrentQuestion(nextQues);
  // };

  const handleSubmitButton = () => {
    console.log("Submit Button Clicked");
    console.log(selectedOptions);
    let newScore = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i].type === "single") {
        if (
          selectedOptions[quiz[i].qid]?.answerByUser === quiz[i].correctAnswer
        ) {
          newScore += quiz[i].score;
        }
      } else {
        console.log(quiz[i].qid);
        // For each answer in the correct answers, check if it is in the selected options
        for (let answer in selectedOptions[quiz[i].qid]?.answerByUser) {
          if (
            quiz[i].correctAnswers.includes(
              selectedOptions[quiz[i].qid]?.answerByUser[answer]
            )
          ) {
            newScore += quiz[i].score;
          } else {
            newScore -= quiz[i].negScore;
          }
        }
      }
    }
    setScore(newScore);
    setShowScore(true);
  };

  // Create a list of questions render below each other
  const questions = quiz.map((qObj, index_q) => {
    return (
      <div key={"qq" + qObj.qid}>
        <div className="flex flex-col items-start w-full">
          <h4 className="mt-10 text-xl text-white/60">
            Question {index_q + 1} of {quiz.length}
          </h4>
          <div className="mt-4 text-2xl text-white">{qObj.question}</div>
        </div>
        <div className="flex flex-col w-full">
          {qObj.type === "single"
            ? qObj.answers.map((answer, index) => (
                <div
                  key={"q" + qObj.qid + index}
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                  onClick={(e) => handleAnswerOption(qObj.qid, answer)}
                >
                  {/* {console.log(
                    qObj.qid,
                    selectedOptions[qObj.qid]?.answerByUser,
                    answer
                  )} */}
                  <input
                    key={"a" + qObj.qid + index}
                    type="radio"
                    name={qObj.qid + answer}
                    value={answer}
                    checked={answer === selectedOptions[qObj.qid]?.answerByUser}
                    onChange={(e) => handleAnswerOption(qObj.qid, answer)}
                    onClick={(e) => handleAnswerOption(qObj.qid, answer)}
                    className="w-6 h-6 bg-black"
                  />
                  <p className="ml-6 text-white">{answer}</p>
                </div>
              ))
            : qObj.answers.map((answer, index) => (
                <div
                  key={"q" + index}
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                  onClick={(e) => handleMultipleAnswerOption(qObj.qid, answer)}
                >
                  <input
                    key={"a" + { index }}
                    type="checkbox"
                    name={qObj.qid + answer}
                    value={answer}
                    checked={
                      selectedOptions[qObj.qid]?.answerByUser.includes(
                        answer
                      ) || false
                    }
                    onChange={(e) =>
                      handleMultipleAnswerOption(qObj.qid, answer)
                    }
                    onClick={(e) =>
                      handleMultipleAnswerOption(qObj.qid, answer)
                    }
                    className="w-6 h-6 bg-black"
                  />
                  <p className="ml-6 text-white">{answer}</p>
                </div>
              ))}
        </div>
      </div>
    );
  });

  return (
    // add scroll verticaly to the page
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] overflow-y-auto">
      <h1 className="text-3xl text-white item-start w-full">Quiz</h1>
      {showScore ? (
        <h1 className="text-3xl font-semibold text-center text-white">
          You scored {score}
        </h1>
      ) : (
        <>
          {questions}
          <div className="flex justify-between w-full mt-4 text-white">
            <button
              onClick={handleSubmitButton}
              className="w-[49%] py-3 bg-indigo-600 rounded-lg margin"
            >
              Submit
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default QuizPage;
