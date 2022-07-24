let l = [0,1,2,3,4,0,1,2,3,4];
let res
let matching = -1
let waiting = false
let emoji = ['😂','😀','😈','😎','😛']
let remaining
function shuffle(){
    for(let i = 0; i<10; i++)
    {
        let x = Math.floor(Math.random()*l.length)
        res.push(l[x])
        l.splice(x,1)
    }
}


function startGame(){
    document.getElementById("container").innerHTML=''
    res = []
    remaining = 5
    shuffle()
    createCards()
}

function createCards(){
    for(let i = 0; i<10; i++)
    {
        let card = document.createElement("div")
        let text = document.createElement("p")
        text.textContent = emoji[res.pop()]
        card.classList.add("card")
        card.appendChild(text)
        card.setAttribute('onclick', 'match(this)')
        document.getElementById("container").appendChild(card)
    }
}


function match(card){
    if(card == matching || waiting || card.classList.contains("found")){
        return;
    }
    card.classList.add("active")
    if(matching == -1){
        matching = card
    }
    else if(matching.firstChild.textContent == card.firstChild.textContent){
        waiting = true
        setTimeout(()=>{
            card.classList.add("found")
            matching.classList.add("found")
            matching = -1;
            waiting = false
        },'500')
        remaining--;
    }
    else{
        waiting = true
        setTimeout(()=>{
            card.classList.remove("active")
            matching.classList.remove("active")
            matching = -1;
            waiting = false
        },'500')
    }
    if(remaining == 0){
        setTimeout(startGame, '1000')
    }
}
startGame()