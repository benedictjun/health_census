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
    const numPatients = patients.length; //number of patients stored in array
    const conditionsCount = {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    }; //Counters for conditions initially set to zero
    const genderConditionsCount = {
      Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      }, //Gender counter set to zero
      Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
      }, //Gender counter set to zero
    };

    //for loop to iterate through patients' data in the array
    for (const patient of patients) {
      conditionsCount[patient.condition]++;
      genderConditionsCount[patient.gender][patient.condition]++;
    } 

    //Dynamically updates the HTML content within the report element
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

//This function fetches the health condition data from the health.json file and searches for a matching condition based on user input
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase(); //This retrieves the value entered into the input field with the ID conditionInput. It converts the entered text to lowercase to ensure case-insensitive comparison.
    const resultDiv = document.getElementById('result'); 
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
      .then(response => response.json()) //Converts the fetched response into JSON format.
      .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input); // This searches within the JSON data for a health condition whose name matches the entered input.

        if (condition) {
          const symptoms = condition.symptoms.join(', ');
          const prevention = condition.prevention.join(', ');
          const treatment = condition.treatment;

          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })

      //This handles any errors that might occur during the fetch request or data processing.
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);