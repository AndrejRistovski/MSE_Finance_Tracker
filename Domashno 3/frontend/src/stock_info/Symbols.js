let val;
await fetch("api/symbols").then((res) => res.text())
    .then((text) => {
        val = JSON.parse(text);
    });

export const SymbolsData = val;
