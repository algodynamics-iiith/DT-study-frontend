import { useState } from "react";
import { quiz } from "./quiz_templates/quizExampleDB";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handleMultipleAnswerOption = (answer) => {
    if (selectedOptions[currentQuestion]?.answerByUser.includes(answer)) {
      selectedOptions[currentQuestion]?.answerByUser.splice(
        selectedOptions[currentQuestion]?.answerByUser.indexOf(answer),
        1
      );
    } else {
      selectedOptions[currentQuestion]?.answerByUser.push(answer);
    }
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < quiz.length && setCurrentQuestion(nextQues);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i].type === "single") {
        for (let answer of quiz[i].answers) {
          if (selectedOptions[i]?.answerByUser === answer) {
            newScore += quiz[i].score;
          }
        }
      } else {
        // For each answer in the correct answers, check if it is in the selected options
        for (let answer in selectedOptions[i]?.answerByUser) {
          if (quiz[i].correctAnswers.includes(answer)) {
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

  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <h1 className="text-3xl text-white item-start w-full">Quiz</h1>
      {showScore ? (
        <h1 className="text-3xl font-semibold text-center text-white">
          You scored {score}
        </h1>
      ) : (
        <>
          <div className="flex flex-col items-start w-full">
            <h4 className="mt-10 text-xl text-white/60">
              Question {currentQuestion + 1} of {quiz.length}
            </h4>
            <div className="mt-4 text-2xl text-white">
              {quiz[currentQuestion].question}
            </div>
          </div>
          <div className="flex flex-col w-full">
            {quiz[currentQuestion].type === "single"
              ? quiz[currentQuestion].answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                    onClick={(e) => handleAnswerOption(answer)}
                  >
                    <input
                      type="radio"
                      name={answer}
                      value={answer}
                      checked={
                        answer ===
                        selectedOptions[currentQuestion]?.answerByUser
                      }
                      onChange={(e) => handleAnswerOption(answer)}
                      className="w-6 h-6 bg-black"
                    />
                    <p className="ml-6 text-white">{answer}</p>
                  </div>
                ))
              : quiz[currentQuestion].answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                    onClick={(e) => handleMultipleAnswerOption(answer)}
                  >
                    <input
                      type="checkbox"
                      name={answer}
                      value={answer}
                      checked={selectedOptions[
                        currentQuestion
                      ]?.answerByUser.includes(answer)}
                      onChange={(e) => handleMultipleAnswerOption(answer)}
                      className="w-6 h-6 bg-black"
                    />
                    <p className="ml-6 text-white">{answer}</p>
                  </div>
                ))}
          </div>
          <div className="flex justify-between w-full mt-4 text-white">
            <button
              onClick={handlePrevious}
              className="w-[49%] py-3 bg-indigo-600 rounded-lg"
            >
              Previous
            </button>
            <button
              onClick={
                currentQuestion + 1 === quiz.length
                  ? handleSubmitButton
                  : handleNext
              }
              className="w-[49%] py-3 bg-indigo-600 rounded-lg"
            >
              {currentQuestion + 1 === quiz.length ? "Submit" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
