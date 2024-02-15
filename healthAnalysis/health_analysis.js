//addPatientButton: The button used to add patient data
const addPatientButton = document.getElementById("addPatient");

//report: The HTML element where you will see analysis reports displayed
const report = document.getElementById("report");

//btnSearch: The variable name of the button which displays the search results when clicked
const btnSearch = document.getElementById('btnSearch');

//An empty array named patients is also created to store the collected patient data.
const patients = [];

//This function retrieves the patient's details in the form such as name, gender, age, and condition.
function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition }); //appends patients details to patients array
      resetForm(); //clear input fields
      generateReport(); //update and display the analysis report based on the newly added patient data
    }
  }
//This function clears the values of the name, gender, age, and condition fields in the HTML form by setting them to empty strings or unchecked for radio buttons, effectively resetting the form to its initial state. Hence it is ready for new data entry.
  function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }

// function calculates and constructs an analysis report based on the collected patient data stored in the patients array 
  function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      },
    };

    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
      report.innerHTML += `${gender}:<br>`;
      for (const condition in genderConditionsCount[gender]) {
        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
      }
    }
  }

addPatientButton.addEventListener("click", addPatient);