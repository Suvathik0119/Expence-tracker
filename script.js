const expenseForm = document.getElementById("expense-form");
const expenseList=document.getElementById("expense-list")
const totalAmountElement=document.getElementById("total-amount")


let expenses=  JSON.parse(localStorage.getItem("expenses")) || []





const renderExpenses=()=>{

    expenseList.innerHTML=""

  let totalAmount=0;
  expenses.forEach((expense,i)=>{
    const {name,amount}=expense;
   
    const expenseRow=document.createElement("tr")
    expenseRow.innerHTML=`
    <td>${name}</td>
    <td>${amount}</td>
    <td class="delete-btn" data-id="${i}">Delete</td>`;
    expenseList.appendChild(expenseRow)

     totalAmount+=amount;

  
  })

  totalAmountElement.textContent = 
    totalAmount.toFixed(2); 


localStorage.setItem("expenses",JSON.stringify(expenses))
  
  
}


const addExpense=(e)=>{
  e.preventDefault();



  const expenseNameInput=document.getElementById("expense-name");
  const expenseAmountInput=document.getElementById("expense-amount");
  const expenseName=expenseNameInput.value;
  const expenseAmount=parseFloat(expenseAmountInput.value);

  expenseNameInput.value = ""; 
  expenseAmountInput.value = ""; 


  if(expenseName==="" || isNaN(expenseAmount)){
    alert("please enter a valid expense name and amount");
    return;
  }
  

  ////create a new expesnse object

  const expense={
    name: expenseName,
    amount:expenseAmount,
  }

  expenses.push(expense)

/////render a expenses
    renderExpenses();
  

  
}


/////////delete 
const deleteExpense=(e)=>{
  if(e.target.classList.contains("delete-btn")){
    const expenseId=parseInt(e.target.getAttribute("data-id"));
    expenses.splice(expenseId,1);
    renderExpenses();

  }
  
}

expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click",deleteExpense)

renderExpenses();
