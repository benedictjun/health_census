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
function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }