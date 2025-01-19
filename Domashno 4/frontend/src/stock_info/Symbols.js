let val;
await fetch("http://localhost:8000/api/symbols").then((res) => res.text())
    .then((text) => {
        val = JSON.parse(text);
    });

export const SymbolsData = val;