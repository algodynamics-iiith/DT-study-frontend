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

  const onChangeText = (newValue, e) => {
    value[language] = newValue;
    setValue(value);
  };

  const displayText = (submissions) => {
    const t = submissions
      .map((x, i) => `Test Case ${i + 1} : ${x.status.description}`)
      .join("\n");
    console.log(t);
    return t;
  };

  const showTestOutput = (submissions) => {
    const op = submissions[0].stdout;
    if (op !== null) return decode(op);
    else return submissions[0].status.description;
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
  const submitCode = async (data, count, f) => {
    setLoading(true);
    await client
      .post("/submitCode", JSON.stringify(data))
      .then((response) => {
        setLoading(false);
        let submissions = response.data.submissions;
        console.log(submissions);

        let filteredSubmission = submissions.filter(
          (x) => x.status.id >= minValidStatus && x.status.id <= maxValidStatus
        );
        if (filteredSubmission.length === count) {
          if (submissions[0].status.id === compilation) {
            setOutput(decode(submissions[0].compile_output));
          } else {
            setOutput(f(submissions));
          }
        } else {
          swalError("Something went wrong(Server)!");
        }
      })
      .catch((error) => {
        setLoading(false);
        swalError("Something went wrong!");
      });
  };

  const onClickSubmit = async (e) => {
    setDisabledS(true);
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

    submitCode(
      {
        id: userId,
        source_code: encodedCode,
        language_id: languagesToId[language],
        inputs: encodedTestCases.inputs,
        outputs: encodedTestCases.outputs,
      },
      testCasesCount,
      displayText
    );
    setDisabledS(false);
  };

  const onClickTest = async (e) => {
    setDisabledT(true);
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
    console.log(finalCode);

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
        submitCode(
          {
            id: userId,
            source_code: encodedCode,
            language_id: languagesToId[language],
            inputs: [encode(input)],
            outputs: [],
            test: true,
          },
          1,
          showTestOutput
        );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    setDisabledT(false);
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
