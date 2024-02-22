const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg ")




for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }else if(select.name==="TO" && currCode==="INR"){
            newOption.selected = "selected";
        } 
        select.appendChild(newOption);
        
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}
const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue==="" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[ToCurr.value.toLowerCase()];
    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue}${fromCurr.value} = ${finalAmount}${ToCurr.value}`;
}


const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https:/flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
    img.src = newSrc;
   
}


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load", (evt) =>{
    updateExchangeRate();

});




