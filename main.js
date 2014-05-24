function Tape(str) {
    if(this === window) return new Tape(str);
    var symbols = str.split('');
    var position = 0;
    var NUL = String.fromCharCode(0);
    this.getCurr = function() {
        return symbols[position];
    }
    this.setCurr = function(val) {
        symbols[position] = val;
    }
    this.next = function() {
        position += 1;
        if(position >= symbols.length) {
            symbols.push(NUL);
        }
    }
    this.prev = function() {
        if(position > 0) {
            position -= 1;
        } else {
            symbols.unshift(NUL);
        }
    }
    this.show = function() {
        function sp_rpt(n) {
            var s = '';
            for(var i = 0; i < n; i++) s += ' ';
            return s;
        }
        return '\n' + symbols.join('') + '\n' + sp_rpt(position) + '^\n';
    }
    return this;
}

function Component() {
    if(this === window) return new Component();
    this.inputs  = [null];
    this.outputs = [null];
    this.outputTo = function(out_id) {
        var out = this.outputs[out_id];
        return function(tape) {
            if(out && out.act) {
                out.act(tape);
            }
        }
    }
    this.act = function(tape) {
        this.outputTo(0)(tape);
    }
    return this;
}

function Logger(description) {
    if(this === window) return new Logger(description);
    Component.call(this);
    this.act = function(tape) {
        console.log('>' + description, tape.show());
        this.outputTo(0)(tape);
    }
}

function Starter(tape) {
    if(this === window) return new Starter(tape);
    Component.call(this);
    this.act = function() {
        this.outputTo(0)(tape);
    }
}

function TesterForSpace() {
    if(this === window) return new TesterForSpace();
    Component.call(this);
    this.outputs = [null, null];
    this.act = function(tape) {
        if(tape.getCurr() == " ") this.outputTo(0)(tape);
        else                      this.outputTo(1)(tape);
    }
}

function Nexter() {
    if(this === window) return new Nexter();
    Component.call(this);
    this.act = function(tape) {
        tape.next();
        this.outputTo(0)(tape);
    }
}
function Prever() {
    if(this === window) return new Prever();
    Component.call(this);
    this.act = function(tape) {
        tape.prev();
        this.outputTo(0)(tape);
    }
}

function Joiner() {
    if(this === window) return new Joiner();
    Component.call(this);
}

function link(from, out_id, to, in_id) {
    from.outputs[out_id] = to;
    to.inputs[in_id] = from;
}

var tape = Tape("Hello world");
var starter = Starter(tape);
var jnr = Joiner();
var spt = TesterForSpace();
var logT = Logger("True");
var logF = Logger("False");
var log2 = Logger("next");
var nexter = Nexter();
link(starter, 0, jnr, 0);
link(jnr, 0, spt, 0);
link(spt, 0, logT, 0);
link(spt, 1, logF, 0);
link(logF, 0, nexter, 0);
link(nexter, 0, log2, 0);
link(log2, 0, jnr, 1);
starter.act();
