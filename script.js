const diakok = [
  { nev: "Anna", tantargy: "Matematika", jegy: 5 },
  { nev: "Anna", tantargy: "Magyar", jegy: 4 },
  { nev: "Bence", tantargy: "Matematika", jegy: 3 },
  { nev: "Bence", tantargy: "Angol", jegy: 5 },
  { nev: "Csilla", tantargy: "Informatika", jegy: 5 },
  { nev: "Csilla", tantargy: "Matematika", jegy: 4 }
];

diakok = diakok.map(diak => ({ ...diak, jegy: diak.jegy + 1 }));
console.log(diakok);

otosok = diakok.filter(diak => diak.jegy === 5);
console.log(otosok);

const atlag = diakok.reduce((osszeg, diak) => osszeg + diak.jegy, 0) / diakok.length;
console.log(atlag);

const infoOtos = diakok.filter(diak => diak.jegy === 5).map(diak => `${diak.nev} - ${diak.tantargy}`);
console.log(infoOtos);

const vanEEgyes = diakok.some(diak => diak.jegy === 1);
console.log(vanEEgyes);

const legalabbHarmas = diakok.every(diak => diak.jegy >= 3);
console.log(legalabbHarmas);

const ujDiak = { nev: "Dávid", tantargy: "Fizika", jegy: 4 };
const frissitettDiakok = [...diakok, ujDiak];
console.log(frissitettDiakok);
