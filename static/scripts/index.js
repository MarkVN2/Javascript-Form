import data from '../exercises.json' assert { type: 'json' }
console.log(data)


//Get ID of area where the forms will go
const FormArea = document.getElementById('forms');

let form_num = 4;
let count = 0;


for (;count<form_num;count++){

    // let exercise = Math.floor(Math.random() * data.length)     
    // console.log(exercise) 

    let FormPlace = document.createElement("div")
    FormPlace.id = count;
    FormArea.appendChild(FormPlace);

    let Header = document.createElement("h1")
    Header.innerText = String(data[count].exercise_text);
    FormPlace.appendChild(Header);

   
    for (let key in data[count].anwsers){

        let Label = document.createElement("label");
        Label.innerHTML = String(data[count].anwsers[key]);

        let Form = document.createElement("input");
        Form.name = `${count}`;
        Form.value = key;
        Form.type = "radio"

        FormPlace.appendChild(Label);
        Label.appendChild(Form);     

    }
    
}

let submitButton = document.getElementById('submit-btn');

submitButton.onclick = function(){
    let count = 0
    data.forEach(question => {
        let correct_answer = question.anwser
        
        let response;

        document.getElementsByName(count).forEach(input =>{
            if(input.checked == true){
                response = input.value;
            }
        })
        
        if (response == correct_answer){
            console.log(`${count} está correta`)
            document.getElementById(count).style.backgroundColor = "#00ff0080";
        }
        else{
            document.getElementById(count).style.backgroundColor = "#ff000080";
        }
        count++

    })
}
