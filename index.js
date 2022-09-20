// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
      
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var reset = document.getElementById("reset");
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

reset.onclick = function(){
  document.location.reload()
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const playerOne = document.querySelector("#playerOne");
const playerTwo = document.querySelector("#playerTwo");
const gameGrid = document.querySelector("#gameGrid");
const form = document.querySelector('#form')
let inst = document. querySelector('.inst')

const child = []
let arrX = []
let arrO = []



const players = (name, choice) =>{

    const setName = () => name;
    const getName = (other) => `It is ${other.setName()} turn to play8`
    return {getName, setName};
}


const displayController = (() =>{
    let count = 0;
   let setgrid = () =>{
        for (i =0; i < 9; i++){
         grid = document.createElement("button");
         grid.classList.add("btn")
         gameGrid.appendChild(grid)
         grid.setAttribute("data-count" ,`${i}`)
         grid.setAttribute("border", "2px solid blue")
         grid.setAttribute("style", "display: flex; flex-direction: row; justify-content: center; align-item: center;")
         child.push(grid)    
        }
      }
      

      const play = () => {
        
        // for loop{}
        //player 1 turn

        /* using grid
         squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.innerText != "") return;
      const team = gameController.getTeam();
      square.innerText = team;
      game.updateBoard([square.dataset.square], team);
    })
    */

        gameGrid.addEventListener('click', (event)=>{
          let x = event.target;
          let clicked ="waiting"
        let first = players(playerOne.value, "X");
        let second = players(playerTwo.value, "O");
          count++

          if(x.getAttribute("data-click") === "clicked"){
            inst.textContent = "Play on any empthy space"
          }else if (count % 2 == 1){
            inst.textContent = first.getName(second);
            x.textContent = "X";
            x.setAttribute("data-click", "clicked");
            arrX.push(parseInt(x.getAttribute("data-count")) )
            winner(arrX)

          }else if (count % 2 == 0){
            inst.textContent = second.getName(first) ;
            x.textContent = "O"
            x.setAttribute("data-click", "clicked")
            arrO.push(parseInt( x.getAttribute("data-count")))
            winner(arrO)
          }
        })
      }

      const winner = (arr) =>{
        let ans;
      
        const h1 =[0,1,2]
        const h2 = [3,4,5]
        const h3 =[6,7,8]
        const v1 = [0,3,6]
        const v2 = [1,4,7]
        const v3 = [2,6,8]
        const d1 =[0,4,8]
        const d2 = [2,4,6]
        const winOption = [h1,h2,h3,v1,v2,v3,d1,d2]
        /* easier means
         let arr1 = winOptions.find(win_option =>{
        return win_option.every((element) => arr.includes(element));
         });
         return arr1.length != 0;
        };
        */
        
        winOption.forEach(items =>{
          let tester=[]
          let test1;
          if(arr.length >= 3){
            arr.find(element => {
             let test = items.includes(element)
             
             if (test ===true){
              tester.push(1)
             }else{tester.push(9)}
            })
            ans = tester.every(e => e == 1)
           test1 = tester.filter(e => e < 2 )
          }
          //stop the game       
        if (test1.length == 3){
          console.log(gameGrid.children)
          child.forEach(e =>{
            e.disabled = true;
          })
          

          count % 2 == 1 ?
          inst.textContent = `one wins the game`:
          inst.textContent = ` two wins the game`;
        }
        })
         
        
      }



      return {play,setgrid,winner};

}) (); // iife
displayController.play()


form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    displayController.setgrid();
    btn.style.display = "none"
    inst.textContent = "may the best man win"
  })
