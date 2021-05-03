// @ts-check
// ---------------------------------------------------------
// Trousse à dés
// ---------------------------------------------------------

function tirerUnDe(typeDe) {
    return Math.floor((Math.random() * typeDe) +1);
}

function testTirerUnDe() {
    const resultatParValeur = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let i=0; i<10000; i++) {
        resultatParValeur[tirerUnDe20()-1] = resultatParValeur[tirerUnDe20()-1] + 1;
    }
    return resultatParValeur;
}

export function tirerUnDe20(logFn) {
    const res = tirerUnDe(20);
    logFn && logFn(`tire un d20 = ${res}`);
    return res;
}

export function tirerUnDe6(logFn) {
    const res = tirerUnDe(6);
    logFn && logFn(`tire un d6 = ${res}`);
    return res;
}