import data from '../exercises.json' assert { type: 'json' };

//Get ID of area where the forms will go
const FormArea = document.getElementById('forms');
let form_num = data.length; //change this if you don't want the size to be the same as in the JSON
let count = 0;


for (;count<form_num;count++){

    // let exercise = Math.floor(Math.random() * data.length)     
    // console.log(exercise) 

    let FormPlace = document.createElement("div");
    FormPlace.id = count;
    FormPlace.className = "form-question";
    FormArea.appendChild(FormPlace);

    let Header = document.createElement("h1");
    Header.innerText = String(data[count].exercise_text);
    FormPlace.appendChild(Header);

    for (let key in data[count].anwsers){

        let Label = document.createElement("label");
        Label.innerHTML = String(data[count].anwsers[key]);
        Label.className = "form-label";

        let Form = document.createElement("input");
        Form.name = `${count}`;
        Form.value = key;
        Form.type = "radio";

        FormPlace.appendChild(Label);
        Label.appendChild(Form);     

    };
    
};

const submitButton = document.getElementById('submit-btn');

submitButton.onclick = function(){
    let count = 0;
    data.forEach(question => {

        let correct_answer = question.anwser;
        
        let response;

        document.getElementsByName(count).forEach(input =>{
            input.disabled=true;
            if(input.checked == true){
                response = input.value;
                
            };
        });
        
        if (response == correct_answer){
            console.log(`${count+1} está correta`)
            document.getElementById(count).className +=  ' right';
        }
        else{
            document.getElementById(count).className += ' wrong';
        };
        count++;
    });
    this.disabled = true;   
};
