
function make_cells() {
    const grid_container = document.createElement("section");
    grid_container.setAttribute("id", "cell-container");
    grid_container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`);
    document.body.appendChild(grid_container);
    for (let i = 1; i < size*size+1; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.onmouseover = function() {
            cell.style.backgroundColor = color;
            cell.classList.add("active");
        };
        grid_container.appendChild(cell);
    }
}


function clear_cells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.setAttribute("style", "");
        cell.classList.remove("active")
    })
}

function change_color(e) {
    color = e.target.value;
    if (!color_rainbow_pick.checked) {
        const cells = document.querySelectorAll(".cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].onmouseover = function() {
                cells[i].style.backgroundColor = color;
                cells[i].classList.add("active");
            }
        }
    }
}

function change_size(e) {
    size = e.target.value;
    size_text.textContent = size;
    const old_grid = document.querySelector("#cell-container");
    document.body.removeChild(old_grid);
    if (!color_rainbow_pick.checked) {
        make_cells();
    } else {
        make_cells();
        change_color_rainbow();
    }
}

function change_color_rainbow(e) {
    const cells = document.querySelectorAll(".cell");
    if (color_rainbow_pick.checked) {    
        values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
        for (let i = 0; i < cells.length; i++) {
            color_rainbow = "#";
            for (let i = 0; i < 6; i++) {
                color_rainbow += values[Math.floor(Math.random() * 15)]; 
            }
            cells[i].onmouseover = function() {
                cells[i].style.backgroundColor = color_rainbow;
                cells[i].classList.add("active");
                change_color_rainbow(e);    
            } 
        }
    } else {
        for (let i = 0; i < cells.length; i++) {
            cells[i].onmouseover = function() {
                cells[i].style.backgroundColor = color;
                cells[i].classList.add("active"); 
            } 
        }
    }
}



const color_pick = document.querySelector("#color-pick");
const size_pick = document.querySelector("#size-pick");
const color_rainbow_pick = document.querySelector("#color-rainbow");
const size_text = document.querySelector("#size-show");

let color = color_pick.getAttribute("value");
let size = size_pick.getAttribute("value");
size_text.textContent = size;

color_pick.addEventListener("change", change_color);
size_pick.addEventListener("change", change_size);
color_rainbow_pick.addEventListener("change", change_color_rainbow);

make_cells(size, color);
const clear_button = document.querySelector("#clear");
clear_button.addEventListener("click", clear_cells);