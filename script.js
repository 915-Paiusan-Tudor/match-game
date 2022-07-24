// l - lista de valori - fiecare corespunde unui emoji
// res - lista l dupa ce sunt amestecate elementele
// matching - elementul selectat
// waiting - daca asteptam sa se termine functia 
// emoji - lista de emoji uri
// remaining - numarul perechilor ramase

let l = [0,1,2,3,4,0,1,2,3,4];
let res
let matching = -1
let waiting = false
let emoji = ['😂','😀','😈','😎','😛']
let remaining

// functia asta amesteca valorile din l in res
function shuffle(){
    //repetam de 10 ori
    for(let i = 0; i<10; i++)
    {
        // x este un numar random de la 0 la lungimea lui l
        let x = Math.floor(Math.random()*l.length)
        // punem elementul de pe pozitia x in res
        res.push(l[x])
        //scoatem elementul din l
        l.splice(x,1)
    }
}

/*
cand incepem un joc nou stergem toate cardurile din container
resetam valorile lui l, res, remaining si emoji
amestecam cardurile apoi le cream
*/
function startGame(){
    document.getElementById("container").innerHTML=''
    l = [0,1,2,3,4,0,1,2,3,4];
    res = []
    remaining = 5
    emoji = ['😂','😀','😈','😎','😛']
    shuffle()
    createCards()
}

function createCards(){
    // repetam de 10 ori
    for(let i = 0; i<10; i++)
    {
        //cream cardul si emoji ul
        let card = document.createElement("div")
        let text = document.createElement("p")
        //in p punem emoji ul corespunzator din res si il stergem
        text.textContent = emoji[res.pop()]
        card.classList.add("card")
        card.appendChild(text)
        card.setAttribute('onclick', 'match(this)')
        document.getElementById("container").appendChild(card)
    }
}


function match(card){
    // daca am selectat acelasi element de 2 ori nu se intampla nimic
    // daca asteptam sa se termine o animatie nu se intampla nimic
    // daca elementul este gasit (si are opacity 0 deci am dat click pe 'nimic') nu se intampla nimic
    if(card == matching || waiting || card.classList.contains("found")){
        return;
    }
    // afisam cardul selectat
    card.classList.add("active")
    // daca nu a fost selectat un card inainte il salvam in matching
    if(matching == -1){
        matching = card
    }
    // daca sunt selectate doua carduri cu acelasi emoji asteptam sa se termine animatia dupa adaugam clasa found, 
    // resetam matching la -1 si scadem numarul de carduri ramase
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
    // daca cardurile selectate nu au acelasi emoji le ascundem
    else{
        waiting = true
        setTimeout(()=>{
            card.classList.remove("active")
            matching.classList.remove("active")
            matching = -1;
            waiting = false
        },'500')
    }
    //daca au fost gasite toate cardurile incepem un joc nou
    if(remaining == 0){
        setTimeout(startGame, '1000')
    }
}
startGame()