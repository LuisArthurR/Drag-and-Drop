let lists = document.querySelectorAll('.list');
let add = document.querySelector('.add-card');

let draggableCardd = null;

let closeButton = document.querySelector('.close');
let cardSubmit = document.querySelector('.btn-save');

// Events

const handleAddNewCards = () => {

    cards = document.querySelectorAll('.card'); 

    cards.forEach(card => {
        registerEventOnCard(card);
    });

    console.log('sds')
}

lists.forEach(list => {
    list.addEventListener('dragover', (e) =>{
        e.preventDefault();
        const afterElement = getCard(list, e.clientY)
        const draggingCard = document.querySelector('.dragging');


        if(afterElement){
            return list.insertBefore(draggingCard, afterElement);
        }
            list.appendChild(draggingCard);
    });
});

closeButton.addEventListener("click", closeBox);

cardSubmit.addEventListener('click', createCard);


// Functions
function getCard(list, y){

    const draggableElements = [...list.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest,child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > closest.offset)
            return{offset, element: child}        
        else
            return closest
        

    }, {offset: Number.NEGATIVE_INFINITY}).element
}

function registerEventOnCard(card){

    card.addEventListener('dragstart', () => {    
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });
}

function openBox(elem){
    document.querySelector('.card-page').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';


    if(elem.parentNode.classList.contains('0')){
        listNumber = 0;
    }
    if(elem.parentNode.classList.contains('1')){
        listNumber = 1;
    }
    if(elem.parentNode.classList.contains('2')){
        listNumber = 2;
    }
    if(elem.parentNode.classList.contains('3')){
        listNumber = 3;
    }
}

function closeBox(){
    document.querySelector('.card-page').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

function createCard(){

    const input_val = document.querySelector('.title');
    const text_val = document.querySelector('.content');

    if(!input_val.value == '' && !text_val.value == ''){

        const card_div = document.createElement('div');
        card_div.classList.add('card');
        card_div.setAttribute('draggable','true');
    
        // Criando o Título
        const card_title = document.createElement("h3");
        card_title.innerText = input_val.value;
        card_div.appendChild(card_title);
    
        // Criando o Texto
        const card_txt = document.createElement("p");
        card_txt.innerText = text_val.value;
        card_div.appendChild(card_txt);

        //console.log(card_div)
        //console.log(cards.length)

        lists[listNumber].appendChild(card_div);
        handleAddNewCards();

        input_val.value = '';
        text_val.value = '';
        closeBox();
    
    }
}