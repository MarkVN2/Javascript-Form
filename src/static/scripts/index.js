import data from '../json/exercises.json' assert { type: 'json' };

//Get ID of area where the forms will go
const FormArea = document.getElementById('forms');
let form_num = data.length; //change this if you don't want the size to be the same as in the JSON but don't go over the size of the JSON
let count = 0;
let alreadyused = [];
let exercise = Math.floor(Math.random() * data.length);


if (form_num > data.length){
    console.log("|| PREVENTED INFINITE LOOP || DECREASE THE FORM_NUM VARIABLE TO A SIZE WITHIN THE LIMITS OF THE JSON");
    form_num = data.length;
}

for (;count<form_num;count++){
    
        
    if (alreadyused.includes(exercise)){

        // console.log(count,exercise)
        // console.log(alreadyused)
        // console.log(`${exercise} is already in`)

        exercise = Math.floor(Math.random() * data.length) 
        count = count - 1
    }
    else{

    let FormPlace = document.createElement("div");
    FormPlace.id = count;
    FormPlace.className = "form-question";
    FormArea.appendChild(FormPlace);

    let Header = document.createElement("h1");
    Header.innerText = String(data[exercise].exercise_text);
    FormPlace.appendChild(Header);

    for (let key in data[exercise].anwsers){

        let Label = document.createElement("label");
        Label.innerHTML = String(data[exercise].anwsers[key]);
        Label.className = "form-label";

        let Form = document.createElement("input");
        Form.name = `${count}`;
        Form.value = key;
        Form.type = "radio";

        FormPlace.appendChild(Label);
        Label.appendChild(Form);     
        
        
    };


        // console.log(count,exercise)   
        // console.log("CREATED")
        alreadyused.push(exercise)
        // console.log(alreadyused)
        
    };
};

const submitButton = document.getElementById('submit-btn');

submitButton.onclick = function(){
    let count = 0;
    for (;count<alreadyused.length;count++){

        // console.log(alreadyused[count])

        let correct_answer = data[alreadyused[count]].anwser;
        
        let response;

        document.getElementsByName(count).forEach(input =>{
            input.disabled=true;
            if(input.checked == true){
                response = input.value;
                // console.log(response,correct_answer)
            };
        });
        
        if (response == correct_answer){
            // console.log(`${count+1} está correta`)
            document.getElementById(count).className +=  ' right';
        }
        else{
            document.getElementById(count).className += ' wrong';
        };
    
    };
    this.disabled = true;   
};
