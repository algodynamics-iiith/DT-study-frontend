import Swal from "sweetalert2";
import client from "./api";
import { dbIdToAlgorithmId } from "./data/algorithms";
import { drvingTestUrl } from "./data/paths";

const Homepage = () => {
  // Restructure
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
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
  //

  const getAlgorithm = async (input) => {
    let final = "/getAlgorithm/" + input;
    await client
      .get(final)
      .then((response) => {
        let id = response.data.id;
        let algorithmId = response.data.algorithmId;
        localStorage.setItem("userId", id);
        localStorage.setItem("algorithmId", algorithmId);
        Toast.fire({
          icon: "success",
          title: "Redirecting!",
        }).then((result) => {
          localStorage.setItem("current", 0);
          let algorithm = dbIdToAlgorithmId[algorithmId];
          let path = [drvingTestUrl[algorithm] + id];
          console.log(path);
          localStorage.setItem("path", JSON.stringify(path));
          window.location.href = JSON.parse(localStorage.getItem("path"))[0];
        });
      })
      .catch((error) => {
        if (error.response.data.error.match(/User .* not found/)) {
          swalError(error.response.data.error + "!");
        } else {
          swalError("Something went wrong!");
        }
      });
  };

  const onClickAgree = async (e) => {
    // disable button
    e.target.disabled = true;
    // also remove hover and blue color from class
    e.target.classList.remove("hover:bg-blue-700");
    e.target.classList.remove("bg-blue-500");
    // add gray color
    e.target.classList.add("bg-gray-500");
    let input = "";
    while (true) {
      // generate a random uuid
      const id = Math.random().toString(36).substring(2, 15);
      // create user through endpoint
      const res = await client.get("/createUser/" + id);
      // if input has message "User already exists", try again
      if (res.data.msg) continue;
      // {"id":"DDb_9B9f9l","rollno":"12","timestamp":1683025815718,"completed":false}
      input = res.data.id;
      break;
    }
    localStorage.setItem("userId", input);
    getAlgorithm(input);
  };

  return (
    <div className="flex flex-grow justify-center items-start overflow-y-scroll">
      <div className="container flex-grow flex flex-col justify-evenly p-10 text-gray-900 px-48">
        <h1 className="text-2xl">Consent Form </h1>
        <h2 className="text-xl">Purpose of the research </h2>
        <p className="py-3">
          This activity is part of a research study conducted at IIIT Hyderabad
          for algodynamics. The aim of the research is to
          <strong>&nbsp; explore understanding of the algorithm. </strong>.
        </p>
        <h2 className="text-xl">Your Role in the research</h2>
        <p className="py-3">
          You will take an interactive game like test and some traditional tests
          about an algorithm. No special preparation is required. It will be an
          interactive game like exam{" "}
        </p>
        <h2 className="text-xl">Time Required</h2>
        <p className="py-3">The whole process might take around 30 minutes.</p>
        <h2 className="text-xl">Risks</h2>
        <p className="py-3">
          There is no risk for the participants. Participation in this survey is
          completely voluntary. You can withdraw your consent to participate at
          any time.
        </p>
        <h2 className="text-xl">Data Protection</h2>
        <p className="py-3">
          Your <strong> &nbsp; data will remain confidential &nbsp; </strong>{" "}
          and will be used for research purposes only. The research may result
          in scientific publications, conference and seminar presentations, and
          teaching. No Direct identifiers (ex: name, address, photo, video) will
          be collected as part of the survey.
        </p>
        <h2 className="text-xl">Points of contact</h2>
        <ol className="list-disc list-inside py-3">
          <li>Nishant Sachdeva, IIIT-H</li>
          <li>VJS Pranavasri, IIIT-H</li>
        </ol>
        <p className="py-3">
          Please click on the agree button below to start the test.
        </p>
        <button
          id="agree"
          onClick={onClickAgree}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 m-1 rounded"
        >
          Agree
        </button>
      </div>
    </div>
  );
};

export default Homepage;
