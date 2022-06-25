import { useState } from "react";
import Editor from "@monaco-editor/react";
import { languagesToMonacoId } from "./data/languages";
import { algorithmsIdToTemplate } from "./data/algorithms";
// import headers from "./data/headers";
// import { generateFinalCode, mainFunctions } from "./data/main";

const CodeEditor = () => {
  const algorithmId = 1;
  const [language, setLanguage] = useState("C (GCC 9.2.0)");
  const [value, setValue] = useState(algorithmsIdToTemplate[algorithmId]);

  const [theme, setTheme] = useState("vs-dark");

  const onChangeText = (newValue, e) => {
    value[language] = newValue;
    setValue(value);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Beautify the div */}
      {/* Add border */}
      <div style={{ width: "50%" }}>
        <p>This is the problem:</p>
        <p>Complete the given function, to print the value</p>
      </div>
      <div style={{ display: "flex", width: "50%", flexDirection: "column" }}>
        <div>
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
              <button>Test</button>
              <button>Submit</button>
            </div>
          </div>
          <Editor
            height="77vh"
            language={languagesToMonacoId[language]}
            theme={theme}
            // value={generateFinalCode(
            //   headers[language],
            //   value[language],
            //   mainFunctions[language]
            // )}
            value={value[language]}
            onChange={onChangeText}
            quickSuggestions={false}
          />
        </div>
        {/* Create box of height 100px */}
        <div style={{ height: "100px" }}>
          {/* Add a button to change theme */}
          <button
            onClick={() => setTheme(theme === "vs-dark" ? "vs" : "vs-dark")}
          >
            Change theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
