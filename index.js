let board = document.getElementById('board');
let initial_count = 0;

let square_count = 11;

function contains(array, element) {
    for (let i = 0;i<array.length;i++) {
        if (array[i][0] === element[0] && array[i][1] === element[1]) {
            return 1;
        }
    }
    return 0;
}

function find_neighbours(array, x, y, visited) {
    let neighbour = [];
    if (y+1<square_count && array[x][y+1] !== 2 && contains(visited, [x, y+1]) === 0) {
        neighbour.push([x, y+1]);
    }
    if (x-1>=0 && array[x-1][y] !== 2 && contains(visited, [x-1, y]) === 0) {
        neighbour.push([x-1, y]);
    }
    if (y-1>=0 && array[x][y-1] !== 2 && contains(visited, [x, y-1]) === 0) {
        neighbour.push([x, y-1]);
    }
    if (x+1<square_count && array[x+1][y] !== 2 && contains(visited, [x+1, y]) === 0) {
        neighbour.push([x+1, y]);
    }
    return neighbour;
}

function path(dict, goal, initial) {
    var count = 1;
    while (true) {
        goal = dict[goal];
        document.getElementsByClassName('square')[(goal[0]*square_count) + goal[1]].classList.add('path');
        document.getElementsByClassName('square')[(goal[0]*square_count) + goal[1]].innerHTML += count;
        count+=1;
        if (dict[goal][0]===initial[0] && dict[goal][1]===initial[1]) {
            break;
        }
    }
}

function BFS(array, visited, queue, goal, initial, parent = {}) {
    if (queue.length != 0) {
        visited.push(queue[0]);
        document.getElementsByClassName('square')[(queue[0][0]*square_count) + queue[0][1]].classList.remove('neighbour');
        document.getElementsByClassName('square')[(queue[0][0]*square_count) + queue[0][1]].classList.add('visited');
        let v = queue[0];
        queue.splice(0, 1);
        if (v[0] === goal[0] && v[1] === goal[1]) {
            path(parent, goal, initial);
            return v;
        }
        let neighbours = find_neighbours(array, v[0], v[1], visited);
        if (queue.length > 81) {
            return alert('Something Went Wrong')
        }
        for (let i = 0;i<neighbours.length;i++) {
            if (contains(queue, neighbours[i]) === 0) {
                parent[neighbours[i]] = v;
                queue.push(neighbours[i]);
                document.getElementsByClassName('square')[(neighbours[i][0]*square_count) + neighbours[i][1]].classList.add('neighbour');
            }
        }
    }
    setTimeout(BFS, 200, array, visited, queue, goal, initial, parent);
}

function find_neighbours_dfs(array, x, y, visited, direction) {
    let neighbour = [];
    if (direction === 1) {
        if (x+1<square_count && array[x+1][y] !== 2 && contains(visited, [x+1, y]) === 0) {
            neighbour.push([x+1, y]);
        }
        if (y+1<square_count && array[x][y+1] !== 2 && contains(visited, [x, y+1]) === 0) {
            neighbour.push([x, y+1]);
        }
        if (x-1>=0 && array[x-1][y] !== 2 && contains(visited, [x-1, y]) === 0) {
            neighbour.push([x-1, y]);
        }
        if (y-1>=0 && array[x][y-1] !== 2 && contains(visited, [x, y-1]) === 0) {
            neighbour.push([x, y-1]);
        }
        if (!(x+1<square_count && array[x+1][y] !== 2 && contains(visited, [x+1, y]) === 0)) {
            direction = 2;
        }
    } else if (direction === 2) {
        if (y+1<square_count && array[x][y+1] !== 2 && contains(visited, [x, y+1]) === 0) {
            neighbour.push([x, y+1]);
        }
        if (x-1>=0 && array[x-1][y] !== 2 && contains(visited, [x-1, y]) === 0) {
            neighbour.push([x-1, y]);
        }
        if (y-1>=0 && array[x][y-1] !== 2 && contains(visited, [x, y-1]) === 0) {
            neighbour.push([x, y-1]);
        }
        if (x+1<square_count && array[x+1][y] !== 2 && contains(visited, [x+1, y]) === 0) {
            neighbour.push([x+1, y]);
        }
        if (!(y+1<square_count && array[x][y+1] !== 2 && contains(visited, [x, y+1]) === 0)) {
            direction = 3;
        }
    } else if (direction === 3) {
        if (x-1>=0 && array[x-1][y] !== 2 && contains(visited, [x-1, y]) === 0) {
            neighbour.push([x-1, y]);
        }
        if (y-1>=0 && array[x][y-1] !== 2 && contains(visited, [x, y-1]) === 0) {
            neighbour.push([x, y-1]);
        }
        if (x+1<square_count && array[x+1][y] !== 2 && contains(visited, [x+1, y]) === 0) {
            neighbour.push([x+1, y]);
        }
        if (y+1<square_count && array[x][y+1] !== 2 && contains(visited, [x, y+1]) === 0) {
            neighbour.push([x, y+1]);
        }
        if (!(x-1>=0 && array[x-1][y] !== 2 && contains(visited, [x-1, y]) === 0)) {
            direction = 4;
        }
    } else if (direction === 4) {
        if (y-1>=0 && array[x][y-1] !== 2 && contains(visited, [x, y-1]) === 0) {
            neighbour.push([x, y-1]);
        }
        if (x+1<square_count && array[x+1][y] !== 2 && contains(visited, [x+1, y]) === 0) {
            neighbour.push([x+1, y]);
        }
        if (y+1<square_count && array[x][y+1] !== 2 && contains(visited, [x, y+1]) === 0) {
            neighbour.push([x, y+1]);
        }
        if (x-1>=0 && array[x-1][y] !== 2 && contains(visited, [x-1, y]) === 0) {
            neighbour.push([x-1, y]);
        }
        if (!(y-1>=0 && array[x][y-1] !== 2 && contains(visited, [x, y-1]) === 0)) {
            direction = 1;
        }
    }
    return [neighbour.reverse(), direction];
}

function DFS(array, visited, queue, goal, initial, parent = {}, direction = 1) {
    if (contains(visited, queue[0]) === 1) {
        queue.splice(0, 1);
    }
    else if (queue.length != 0) {
        visited.push(queue[0]);
        document.getElementsByClassName('square')[(queue[0][0]*square_count) + queue[0][1]].classList.remove('neighbour');
        document.getElementsByClassName('square')[(queue[0][0]*square_count) + queue[0][1]].classList.add('visited');
        let v = queue[0];
        queue.splice(0, 1);
        if (v[0] === goal[0] && v[1] === goal[1]) {
            path(parent, goal, initial);
            return v;
        }
        let out = find_neighbours_dfs(array, v[0], v[1], visited, direction);
        let neighbours = out[0];
        direction = out[1];
        if (queue.length > 81) {
            return alert('Something Went Wrong')
        }
        for (let i = 0;i<neighbours.length;i++) {
            parent[neighbours[i]] = v;
            document.getElementsByClassName('square')[(neighbours[i][0]*square_count) + neighbours[i][1]].classList.add('neighbour');
            queue = [neighbours[i], ...queue];
        }
    }
    setTimeout(DFS, 200, array, visited, queue, goal, initial, parent, direction);
}

function find_solution(array) {
    let queue = [], goal = [-1], start_x = -1, start_y = -1;
    for (let i = 0;i<square_count;i++) {
        let flag = 0;
        for (let j = 0;j<square_count;j++) {
            if (array[i][j] === 1) {
                if (queue.length === 0) {
                    queue.push([i, j]);
                    start_x = i, start_y = j
                } else if (queue.length === 1) {
                    goal = [i, j];
                    flag = 1;
                    break;
                }
            }
        }
        if (flag === 1) {
            break;
        }
    }
    if (goal[0] === -1) {
        return alert('No Goal State Found!!');
    }
    let select = document.getElementById('algorithm').value;
    if (select === 'BFS') {
        BFS(array, [], queue, goal, queue[0]);
    } else if (select === 'DFS') {
        DFS(array, [], queue, goal, queue[0]);
    }
}

for (let i = 0;i<square_count;i++) {
    const row_square = document.createElement('div');
    row_square.className = 'row-square'
    for (let j = 0;j<square_count;j++) {
        const new_element = document.createElement('div');
        new_element.className = 'square';
        new_element.onclick = () => {
            if (new_element.classList.contains('active')) {
                new_element.classList.remove('active');
            } else {
                new_element.classList.add('active');
            }
        }
        new_element.ondblclick = () => {
            if (new_element.classList.contains('initial')) {
                new_element.classList.remove('initial');
                initial_count-=1;
            } else {
                if (initial_count<2) {
                    initial_count+=1;
                    new_element.classList.add('initial');
                } else {
                    alert('Both Set Uhh! hu!');
                }
            }
        }
        row_square.appendChild(new_element)
    }
    board.appendChild(row_square);
}



let button = document.getElementById('solution');
button.style.width = (square_count*52 + 3) + 'px';

button.onclick = () => {
    let array = [];
    for (let i = 0;i<square_count;i++) {
        const temp = [];
        for (let j = 0;j<square_count;j++) {
            const cnt_square = document.getElementsByClassName('square')[(i*square_count) + j];
            if (cnt_square.classList.contains('initial')) {
                temp.push(1);
            } else if (cnt_square.classList.contains('active')) {
                temp.push(2);
            } else {
                temp.push(0);
            }
        }
        array.push(temp);
    }
    find_solution(array);
}

button = document.getElementById('reset');
button.style.width = (square_count*52 + 3) + 'px';

button.onclick = () => {
    for (let i = 0;i<square_count;i++) {
        for (let j = 0;j<square_count;j++) {
            const cnt_square = document.getElementsByClassName('square')[(i*square_count) + j];
            if (cnt_square.classList.contains('path')) {
                cnt_square.classList.remove('path');
            }
            if (cnt_square.classList.contains('visited')) {
                cnt_square.classList.remove('visited');
            }
            if (cnt_square.classList.contains('neighbour')) {
                cnt_square.classList.remove('neighbour');
            }
            cnt_square.innerHTML = '';
        }
    }
}