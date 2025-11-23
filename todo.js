let todo=[];
displayitems();

function addtodo()
{
  let inputElement=document.querySelector
  ('#todo-input');
  let todotext =inputElement.value;
  todo.push(todotext);
  inputElement.value='';

  displayitems();
}
function displayitems()
{
let containerElement=document.querySelector
('.todo-container');

let newHtml = '';

for (let i=0;i<todo.length;i++){
  newHtml +=`
  <div>
   <span>${todo[i]}</span>
   <button onclick="todo.splicce(${i},1);
   displayItems();" >Delete</button>
   </div>`;
  
  
}
  containerElement.innerHTML=newHtml;

}
