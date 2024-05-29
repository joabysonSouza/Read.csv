const fs = require("fs");
const readline = require("readline");

const filePath = "readme.csv";
const myInterface = readline.createInterface({
  input: fs.createReadStream(filePath),
});

let resultnome = [];
let resultvalor = {};

myInterface.on("line", (line) => {
  const [nome, valor] = line.split(";");

  if (!valor || !nome) return;

  let valorCorrigido = valor.replaceAll(".", "").replaceAll(",", ".");

  let valorFormatado = parseFloat(valorCorrigido);

  if (resultvalor[nome]) {
    resultvalor[nome] = parseFloat(
      (resultvalor[nome] + valorFormatado).toFixed(2)
    );
  } else {
    resultnome.push(nome);
    resultvalor[nome] = valorFormatado;
  }
});

myInterface.on("close", () => {
  console.log("Valores:", resultvalor);
});
