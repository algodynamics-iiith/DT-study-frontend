import Swal from "sweetalert2";
import client from "./api";
import paths from "./data/paths";

const Homepage = () => {
  // Restructure
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
          localStorage.setItem("path", JSON.stringify(paths[algorithmId % 2]));
          window.location.href =
            "." + JSON.parse(localStorage.getItem("path"))[0];
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
    Swal.fire({
      title: "Enter User ID",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (input) => {
        localStorage.setItem("userId", input);
        getAlgorithm(input);
      },
      backdrop: true,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div className="flex flex-grow justify-center items-start overflow-y-scroll">
      <div className="container flex-grow flex flex-col justify-evenly p-10 text-gray-900 px-48">
        <h1 className="text-2xl">Consent Form </h1>
        <h2 className="text-xl">Purpose of the research </h2>
        <p className="py-3">
          This survey is part of a research study conducted at IIIT Hyderabad
          for algodynamics. The aim of the research is to
          <strong>
            &nbsp; investigate interactive exams for testing understanding of
            algorithms.{" "}
          </strong>
          .
        </p>
        <h2 className="text-xl">Your Role in the research</h2>
        <p className="py-3">
          You will take an interactive game like test and some traditional tests
          about an algorithm. No special preparation is required. The whole
          process is divided into following sections
        </p>
        <ol className="list-decimal list-inside text-md text-blue-600 p-4 ">
          <li>An interactive game like exam</li>
          <li>Coding Test</li>
          <li>Debugging Test</li>
          <li>An MCQ/Short Answer Quiz</li>
        </ol>
        <h2 className="text-xl">General Instructions</h2>
        <p className="py-3">
          Follow the instructions as given in each section. After finishing each
          section click the{" "}
          <strong>
            <code> &nbsp; NEXT &nbsp; </code>
          </strong>
          button present on top right corner to move to the next section. Try
          not to refresh the page. Please answer all the following questions and
          make sure you are in a comfortable environment with no distractions
        </p>
        <h2 className="text-xl">Time Required</h2>
        <p className="py-3">The whole process might take around 1 hour.</p>
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
          be collected as part of the survey. You need to provide the email-id
          for claiming the incentives. The{" "}
          <strong>email ids will be hashed for maintaining anonymity</strong>{" "}
          and will not be used for any other purpose.
        </p>
        <h2 className="text-xl">Points of contact</h2>
        <ol className="list-disc list-inside py-3">
          <li>Archit Goyal, IIIT-H</li>
          <li>Prince Varshney, IIIT-H</li>
        </ol>
        <p className="py-3">
          Please enter the User-id in the following box for consent,
        </p>
        <button onClick={onClickAgree}>Agree</button>
      </div>
    </div>
  );
};

export default Homepage;
