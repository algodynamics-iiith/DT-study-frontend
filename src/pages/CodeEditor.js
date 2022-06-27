import { useState } from "react";
import Editor from "@monaco-editor/react";
import { languagesToMonacoId, languagesToId } from "./data/languages";
import { algorithmsIdToTemplate } from "./data/algorithms";
import { encode, decode } from "./Utils";
import encodedTestCases from "./data/testCases";
import headers from "./data/headers";
import { generateFinalCode, mainFunctions } from "./data/main";
import client from "./api";
import Swal from "sweetalert2";
import config from "./Config";
import { PulseLoader } from "react-spinners";

const CodeEditor = () => {
  const algorithmId = 1;
  const userId = "EimCVP8SB0";
  const [language, setLanguage] = useState("C (GCC 9.2.0)");
  const [value, setValue] = useState(algorithmsIdToTemplate[algorithmId]);
  const [disabledS, setDisabledS] = useState(false);
  const [disabledT, setDisabledT] = useState(false);

  const [output, setOutput] = useState("Output Test/Submit will display here!");
  const [loading, setLoading] = useState(false);

  const { minValidStatus, maxValidStatus } = config.judge0;
  const { testCasesCount } = config;
  const { compilation } = config.errors;
  const { theme } = config.editor;
  const { lengthArray, minValue, maxValue } = config[algorithmId];

  const onChangeText = (newValue, e) => {
    value[language] = newValue;
    setValue(value);
  };

  const displayText = (submissions) => {
    return submissions
      .map((x, i) => `Test Case ${i + 1} : ${x.status.description}`)
      .join("\n");
  };

  const showTestOutput = (submissions) => {
    const op = submissions[0].stdout;
    if (op !== null) return decode(op);
    else return submissions[0].status.description;
  };

  const validateInput = (input) => {
    const splittedInput = input.trim().split("\n");
    console.log(splittedInput);
    if (splittedInput.length < 2)
      return {
        message: "There should be two lines in input.",
        flag: false,
      };
    else {
      const n = parseInt(splittedInput[0].trim());
      if (isNaN(n) || (!isNaN(n) && (n < 0 || n > lengthArray)))
        return {
          message: "First line should be a valid number.",
          flag: false,
        };
      else {
        const a = splittedInput[1].trim().split(" ");

        if (
          a
            .filter((x) => !isNaN(x))
            // .filter(!isNaN)

            .filter((x) => x >= minValue && x <= maxValue).length !== n
        )
          return {
            message: `There should be exactly ${n} numbers.`,
            flag: false,
          };
        else return { message: "Okay!", flag: true };
      }
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const swalError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      footer: "Please try again.",
    });
  };
  const submitCode = async (
    count,
    display,
    disabled,
    test,
    inputs,
    outputs
  ) => {
    disabled(true);
    setOutput("");

    Toast.fire({
      icon: "success",
      title: "Submitted Successfully!",
    });
    const finalCode = generateFinalCode(
      headers[language],
      value[language],
      mainFunctions[language]
    );

    const encodedCode = encode(finalCode);

    setLoading(true);
    await client
      .post(
        "/submitCode",
        JSON.stringify({
          id: userId,
          source_code: encodedCode,
          language_id: languagesToId[language],
          inputs,
          outputs,
          test,
        })
      )
      .then((response) => {
        setLoading(false);
        let submissions = response.data.submissions;

        let filteredSubmission = submissions.filter(
          (x) => x.status.id >= minValidStatus && x.status.id <= maxValidStatus
        );
        if (filteredSubmission.length === count) {
          if (submissions[0].status.id === compilation) {
            setOutput(decode(submissions[0].compile_output));
          } else {
            setOutput(display(submissions));
          }
        } else {
          swalError("Something went wrong(Server)!");
        }
      })
      .catch((error) => {
        setLoading(false);
        swalError("Something went wrong!");
      });
    disabled(false);
  };

  const onClickSubmit = async (e) => {
    submitCode(
      testCasesCount,
      displayText,
      setDisabledS,
      false,
      encodedTestCases.inputs,
      encodedTestCases.outputs
    );
  };

  const onClickTest = async (e) => {
    Swal.fire({
      title: "Enter Custom Input",
      input: "textarea",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (input) => {
        const { message, flag } = validateInput(input);
        if (flag)
          submitCode(
            1,
            showTestOutput,
            setDisabledT,
            true,
            [encode(input)],
            []
          );
        else {
          setOutput(message);
        }
      },
      backdrop: true,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div className="flex flex-grow overflow-hidden">
      {/* Beautify the div */}
      {/* Add border */}
      <div style={{ width: "50%", height: "100%" }}>
        <p>This is the problem:</p>
        <p>Complete the given function, to print the value</p>
      </div>
      <div
        style={{
          display: "flex",
          width: "50%",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Add three buttons side by side */}
        {/* One for language select */}
        {/* One to test */}
        {/* One to submit */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <label>Language: </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Object.keys(languagesToMonacoId).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              width: "50%",
            }}
          >
            <button onClick={onClickTest} disabled={disabledT}>
              Test
            </button>
            <button onClick={onClickSubmit} disabled={disabledS}>
              Submit
            </button>
          </div>
        </div>
        <Editor
          height="65vh"
          language={languagesToMonacoId[language]}
          theme={theme}
          value={value[language]}
          onChange={onChangeText}
          quickSuggestions={false}
        />

        <div>
          <PulseLoader loading={loading} color="#36D7B7" />
          <pre
            style={{ width: "100%", height: "15vh" }}
            className={("overflow-y-scroll", "overflow-x-scroll")}
          >
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
