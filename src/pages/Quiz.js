import { quiz } from "./quiz_templates/quizExampleDB";
import Quiz from "react-quiz-component";

const QuizPage = () => {
  const onCompleteHandler = (result) => {
    console.log("something", result);
  };
  return (
    <div className="flex flex-grow overflow-y-scroll">
      <h1> Quiz</h1>
      <Quiz
        quiz={quiz}
        shuffle={true}
        showInstantFeedback={false}
        onComplete={onCompleteHandler}
      />
    </div>
  );
};

export default QuizPage;
