import { CONFIG } from "./config/config.js";


const TICKET = '';
let seatsInfo = [];
main();


function main(){
    _buildScreens();
    _buildSeats(CONFIG.seats);
}

function selectSeat(selectedSeat){
    console.log(selectedSeat);
}

function _buildScreens(){
    document.getElementById('title').innerHTML = `<h3 class="title">${CONFIG.title}</h3>`;

    document.getElementById('footer').innerHTML = `
    <div>
        <p>${CONFIG.footer.title}</p>
        <p>${CONFIG.footer.address}</p></div>
    <div>
        <p>${CONFIG.footer.tel}</p>
        <p>${CONFIG.footer.email}</p>
    </div>
    `;

    document.getElementById('selectionContainer').innerHTML = `
    <div>
        <p class="selected_seats"> ${CONFIG.body.seatSelectedInfo}</p>
        <p class="selected-seats_list" id="selectedSeatsList"></p>
    </div>
    
    <div>
        <p class="selection_info"> ${CONFIG.body.info}</p>
        <button class="button__confirmation">${CONFIG.body.confirmButton}</button>
    </div>
    `;

}

function _buildSeats(config){
    
    const container = document.getElementById('seatsContainer');

    for(let i= 0; i< config.columns; i++){
        const row = _createRow(i);
        for(let j= 0; j < config.rows; j++){
            row.appendChild(_createColumn(j,i));
            seatsInfo.push({ position : { row: i+1, col: j+1  }, isFree: true});
        }
        container.appendChild(row);
    }
}

function _createRow(row){
    const rowElement = document.createElement("div");
    rowElement.classList.add('row');
    rowElement.setAttribute('id', `row_${row+1}` );
    return rowElement;
}

function _createColumn(col,row){
    const column = document.createElement("div");
    column.classList.add(`seat`);
    column.setAttribute('id', `seat_${row+1}_${col+1}` );
    column.addEventListener( "click", function(){
        selectSeat({row,col});
    })
    return column;
}

