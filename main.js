var N = 0, E = 1, S = 2, W = 3;
function Component(name) {
    if(this === window) return new Component(name);
    this.name = name;
    // Whether there is an input from this direction [N,E,S,W], though the actual
    // directions change with the orientation
    this.inputs =  [1, 1, 1, 1];
    // Whether there is an output to this direstion
    this.outputs = [1, 1, 1, 1];
    // Orientations 0 through 3 are NESW respectively
    this.orientation = N;
    this.show = function() {
        var s = "";
        s += ' ';
        s += (this.inputs [(this.orientation + N) % 4]) ? 'v' : ' ';
        s += (this.outputs[(this.orientation + N) % 4]) ? '^' : ' ';
        s += ' <br />';
        s += (this.outputs[(this.orientation + W) % 4]) ? '<' : ' ';
        s += '++';
        s += (this.inputs [(this.orientation + E) % 4]) ? '<' : ' ';
        s += '<br />';
        s += (this.inputs [(this.orientation + W) % 4]) ? '>' : ' ';
        s += '++';
        s += (this.outputs[(this.orientation + E) % 4]) ? '>' : ' ';
        s += '<br />';
        s += ' ';
        s += (this.outputs[(this.orientation + S) % 4]) ? 'v' : ' ';
        s += (this.inputs [(this.orientation + S) % 4]) ? '^' : ' ';
        s += ' ';
        return '<pre>' + s + '</pre>';
    }
    this.onInput = function(tape) {
        return tape;
    }
    return this;
}

function Tape(data) {
    this.symbols = tape.split("");
    this.index = 0;
    this.direction = S;
    return this;
}

function Machine(components) {

}

function Arrow() {
    if(this === window) return new Arrow();
    // Inherits from Component
    Component.call(this, 'arrow');
    // Takes input from all directions and redirects output in a single
    // direction.
    this.inputs  = [1, 1, 1, 1];
    this.outputs = [1, 0, 0, 0];
    // Default to upwards-facing arrow
    this.show = function() {
        return ["&#x2191;", "&#x2192;", "&#x2193;", "&#x2190;"][this.orientation];
    }
    return this;
}

function Branch() {
    if(this === window) return new Branch();
    Component.call(this, 'branch');
}

function showGrid(grid) {
    function crel(tag, cls) {
        var el = document.createElement(tag);
        el.className = cls;
        return el;
    }
    var table = crel("table", "grid");
    var tr = crel("tr", "");
    table.appendChild(tr);
    for(var x = 0; x < grid[0].length; x++) {

    }
    for(var y = 0, row; row = grid[y]; y++) {
        var tr = crel("tr", "");
        table.appendChild(tr);
        for(var x = 0; x < row.length; x++) {
            var cpt = row[x];
            var td = crel("td", "");
            tr.appendChild(td);
            if(cpt) {
                td.innerHTML = cpt.show();
            }
        }
    }
    return table;
}
