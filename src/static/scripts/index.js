import data from '../json/exercises.json' assert { type: 'json' };

// Get ID of area where the forms will go
const FormArea = document.getElementById('forms');
const AwnserListArea = document.getElementById('awnser-list');

let form_num = data.length; // Change this if you don't want the size to be the same as in the JSON but don't go over the size of the JSON
let count = 0;

// Randomize the question to be used in the form
let exercise = Math.floor(Math.random() * data.length);
// Initialize a list to save the already used exercises
let alreadyused = [];

// Failsafe if the form_num is bigger than the number of questions available for use
if (form_num > data.length){
    console.log("|| PREVENTED INFINITE LOOP || DECREASE THE FORM_NUM VARIABLE TO A SIZE WITHIN THE LIMITS OF THE JSON");
    form_num = data.length;
}

for (;count<form_num;count++){
    
    if (alreadyused.includes(exercise)){

            // console.log(count,exercise);
            // console.log(alreadyused);
            // console.log(`${exercise} is already in`);

        // Randomizes the question again
        exercise = Math.floor(Math.random() * data.length) 
        // Removes one from the counter to make the final count still match the size of questions wanted
        count = count - 1
    }
    else{

    // Creates a div tag in the area of the forms for the individual questions
    let FormPlace = document.createElement("div");
    FormPlace.id = count;
    FormPlace.className = "form-question";
    FormArea.appendChild(FormPlace);

    // Creates a box to put the contents inside for css styling
    let FormBox = document.createElement('div');
    FormBox.className ="form-box";
    FormPlace.appendChild(FormBox);

    let QuestionNum = document.createElement('h4');
    QuestionNum.innerText = count+1;
    FormBox.appendChild(QuestionNum);

    // Inside the div creates a h1 tag and puts the exercise title inside of it
    let Header = document.createElement("h1");
    Header.innerText = String(data[exercise].exercise_text);
    FormBox.appendChild(Header);

    // For each "anwsers" in the JSON creates a radio input and label for it
    for (let key in data[exercise].anwsers){

        // Creates the label and gives it the awnser in the JSON and a class
        let Label = document.createElement("label");
        Label.innerHTML = String(data[exercise].anwsers[key]);
        Label.className = "form-label";

        // Creates the input and gives it a 'type=radio' and a name based on the counter
        let Form = document.createElement("input");
        Form.name = `${count}`;
        Form.value = key;
        Form.type = "radio";

        // Creates a span for customization of the radio look using CSS
        let FormSpan = document.createElement("span");
        FormSpan.className = "form-span";
        Form.appendChild(FormSpan);

        FormBox.appendChild(Label);
        Label.appendChild(Form);     
        
        
    };
        // Puts the exercise used in the list
        alreadyused.push(exercise)
            // console.log(count,exercise);
            // console.log("CREATED");
            // console.log(alreadyused);
        
        let qAwnsers = document.createElement('div');
        qAwnsers.id = count;
        qAwnsers.className = "awnser-list-object";
        
        let linkAwnser = document.createElement('a');

        linkAwnser.innerText = `${count+1}`
        linkAwnser.href = `#${count}`
        linkAwnser.style.textDecoration  = 'none';
        linkAwnser.style.color = 'black';
        AwnserListArea.appendChild(qAwnsers);
        qAwnsers.appendChild(linkAwnser);
        
    };
    
};

// Retry Button to refresh the page
let retryButton = document.createElement('button');
retryButton.id = "retry-btn";
retryButton.innerText = '↻';
AwnserListArea.appendChild(retryButton);

retryButton.onclick = function(){window.location.reload()};

const submitButton = document.getElementById('submit-btn');

let awnserSheet = document.getElementsByClassName('awnser-list-object');

submitButton.onclick = function(){
    let count = 0;    
    // For every value in the "alreadyused" List
    for (;count<alreadyused.length;count++){

            //console.log(alreadyused[count]);

        // Grabs correct awnser in the JSON
        let correct_answer = data[alreadyused[count]].anwser;
        
        let response;

        // Grabs every input tag using the counter
        document.getElementsByName(count).forEach(input =>{
            input.disabled=true;
            if(input.checked == true){
                // Gives the response variable the value of the input
                response = input.value;
                    // console.log(response,correct_answer);
            };
        });


        // Compares the response given and the correct one  
        // Correct response gets the class "right"
        
        if (response == correct_answer){
                // console.log(`${count+1} está correta`);
            awnserSheet.item(count).className +=  ' right';
            document.getElementById(count).className +=  ' right';
        }
        // Wrong response gets the class "wrong"
        else{
            awnserSheet.item(count).className  += ' wrong';
            document.getElementById(count).className += ' wrong';
        };
    
    };
    // Disables the button
    this.disabled = true;   
};
