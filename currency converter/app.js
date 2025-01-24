const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//     for (currCode in countryList) {
//       let newOption = document.createElement("option");
//       newOption.innerText = currCode;
//       newOption.value = currCode;
//       if (select.name === "from" && currCode === "USD") {
//         newOption.selected = "selected";
//       } else if (select.name === "to" && currCode === "INR") {
//         newOption.selected = "selected";
//       }
//       select.append(newOption);
//     }
  
//     select.addEventListener("change", (evt) => {
//       updateFlag(evt.target);
//     });
//   }
for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement('option');   //creating dropdowns for each country code adn updating flag according to the code using api function
        newOption.innerText= currCode;
        newOption.value= currCode;
        if (select.name === 'from' && currCode === 'USD'){
            newOption.selected= 'selected';
        }else if (select.name === 'to' && currCode === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)
    })
    
}

// const updateExchangeRate= async()=>{
//     let amount = document.querySelector(".amount input");
//     let amtVal= amount.value;
//     if (amtVal === " " || amtVal < 1){
//         amtVal= 1;
//         amount.value= '1';
//     }
//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     let data= await response.json();
//     let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
//     console.log(data);


//     let finalAmount = amtVal * rate;
//     msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

const updateExchangeRate= async()=>{
    let amount= document.querySelector(".amount input")  //getting the input amount
    let amtVal = amount.value;
    if (amtVal==="" || amtVal < 1){   //if amount value is empty or less than 1 
        amtVal= 1
        amount.value= '1'
    }
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json` //fetching api link
    let response = await fetch(URL) //awaiting response from api
    let data = await response.json()   //converting json into js objects
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]  //getting the particular data we need

    let finalAmt = amtVal * rate   //calculating our final result
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`   //displaying our final result on the web
};

updateFlag= (element)=>{
    let currCode= element.value;            //getting country from our dropdown function
    let countryCode= countryList[currCode];    //getting country code to call api for specific country flag
    let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");      //reaching the target location
    img.src= newsrc;   //setting the flag to the target location
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();           //adding click functionality to our bttn
})

window.addEventListener("load", ()=>{
    updateExchangeRate();          //function for which the api function takes place when we reload the site else the mssg wont display any thing
})