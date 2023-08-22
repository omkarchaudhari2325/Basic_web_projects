const countValue = document.querySelector("#counter");

const increment = () => {
    let value = parseInt(countValue.innerText);
    value = value + 1;
    // if(value == 90){
    //     alert(JSON.stringify({
    //         name:"omkar",
    //         message :"Go back"
    //     }));
    //     value = 0;
    // }
    countValue.innerText = value;
 }
 const decrement = () => {
    let value = parseInt(countValue.innerText);
    value = value - 1;
    countValue.innerText = value;
 }
