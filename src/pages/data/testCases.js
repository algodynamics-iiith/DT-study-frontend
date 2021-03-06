// const testCases = {
//   inputs: [
//     "5\n20 -90 -76 96 27",
//     "82\n14 -67 30 21 81 7 -15 62 83 -91 56 32 -37 76 59 -99 84 61 -37 23 15 51 -27 75 -88 -59 96 -42 16 -22 35 52 -61 98 -95 -58 -50 76 100 68 31 50 97 -80 12 -94 -87 41 92 85 98 -65 38 -76 44 -42 43 -99 40 -22 -95 -84 -18 -35 -2 61 -86 -43 44 -90 67 -54 11 -89 -98 -65 69 83 72 49 -90 83",
//     "94\n46 3 87 10 -62 13 -37 33 10 78 92 -39 79 -85 60 66 -23 -21 -30 57 75 -17 31 92 45 70 -47 93 -97 80 68 41 87 38 60 -26 32 10 -53 -75 -29 84 47 -8 -78 60 -90 11 -49 85 79 -63 7 13 -57 5 -7 17 -49 35 46 -34 -54 -79 -48 -98 2 67 -23 19 17 70 -42 93 -65 -44 23 7 32 -40 -60 -99 -47 -53 13 33 16 -75 -56 -7 49 -99 61 82",
//   ],
//   outputs: [
//     "-90 -76 20 27 96",
//     "-99 -99 -98 -95 -95 -94 -91 -90 -90 -89 -88 -87 -86 -84 -80 -76 -67 -65 -65 -61 -59 -58 -54 -50 -43 -42 -42 -37 -37 -35 -27 -22 -22 -18 -15 -2 7 11 12 14 15 16 21 23 30 31 32 35 38 40 41 43 44 44 49 50 51 52 56 59 61 61 62 67 68 69 72 75 76 76 81 83 83 83 84 85 92 96 97 98 98 100",
//     "-99 -99 -98 -97 -90 -85 -79 -78 -75 -75 -65 -63 -62 -60 -57 -56 -54 -53 -53 -49 -49 -48 -47 -47 -44 -42 -40 -39 -37 -34 -30 -29 -26 -23 -23 -21 -17 -8 -7 -7 2 3 5 7 7 10 10 10 11 13 13 13 16 17 17 19 23 31 32 32 33 33 35 38 41 45 46 46 47 49 57 60 60 60 61 66 67 68 70 70 75 78 79 79 80 82 84 85 87 87 92 92 93 93",
//   ],
// };

const encodedTestCases = {
  inputs: [
    "NQoyMCAtOTAgLTc2IDk2IDI3",
    "ODIKMTQgLTY3IDMwIDIxIDgxIDcgLTE1IDYyIDgzIC05MSA1NiAzMiAtMzcgNzYgNTkgLTk5IDg0IDYxIC0zNyAyMyAxNSA1MSAtMjcgNzUgLTg4IC01OSA5NiAtNDIgMTYgLTIyIDM1IDUyIC02MSA5OCAtOTUgLTU4IC01MCA3NiAxMDAgNjggMzEgNTAgOTcgLTgwIDEyIC05NCAtODcgNDEgOTIgODUgOTggLTY1IDM4IC03NiA0NCAtNDIgNDMgLTk5IDQwIC0yMiAtOTUgLTg0IC0xOCAtMzUgLTIgNjEgLTg2IC00MyA0NCAtOTAgNjcgLTU0IDExIC04OSAtOTggLTY1IDY5IDgzIDcyIDQ5IC05MCA4Mw==",
    "OTQKNDYgMyA4NyAxMCAtNjIgMTMgLTM3IDMzIDEwIDc4IDkyIC0zOSA3OSAtODUgNjAgNjYgLTIzIC0yMSAtMzAgNTcgNzUgLTE3IDMxIDkyIDQ1IDcwIC00NyA5MyAtOTcgODAgNjggNDEgODcgMzggNjAgLTI2IDMyIDEwIC01MyAtNzUgLTI5IDg0IDQ3IC04IC03OCA2MCAtOTAgMTEgLTQ5IDg1IDc5IC02MyA3IDEzIC01NyA1IC03IDE3IC00OSAzNSA0NiAtMzQgLTU0IC03OSAtNDggLTk4IDIgNjcgLTIzIDE5IDE3IDcwIC00MiA5MyAtNjUgLTQ0IDIzIDcgMzIgLTQwIC02MCAtOTkgLTQ3IC01MyAxMyAzMyAxNiAtNzUgLTU2IC03IDQ5IC05OSA2MSA4Mg==",
  ],
  outputs: [
    "LTkwIC03NiAyMCAyNyA5Ng==",
    "LTk5IC05OSAtOTggLTk1IC05NSAtOTQgLTkxIC05MCAtOTAgLTg5IC04OCAtODcgLTg2IC04NCAtODAgLTc2IC02NyAtNjUgLTY1IC02MSAtNTkgLTU4IC01NCAtNTAgLTQzIC00MiAtNDIgLTM3IC0zNyAtMzUgLTI3IC0yMiAtMjIgLTE4IC0xNSAtMiA3IDExIDEyIDE0IDE1IDE2IDIxIDIzIDMwIDMxIDMyIDM1IDM4IDQwIDQxIDQzIDQ0IDQ0IDQ5IDUwIDUxIDUyIDU2IDU5IDYxIDYxIDYyIDY3IDY4IDY5IDcyIDc1IDc2IDc2IDgxIDgzIDgzIDgzIDg0IDg1IDkyIDk2IDk3IDk4IDk4IDEwMA==",
    "LTk5IC05OSAtOTggLTk3IC05MCAtODUgLTc5IC03OCAtNzUgLTc1IC02NSAtNjMgLTYyIC02MCAtNTcgLTU2IC01NCAtNTMgLTUzIC00OSAtNDkgLTQ4IC00NyAtNDcgLTQ0IC00MiAtNDAgLTM5IC0zNyAtMzQgLTMwIC0yOSAtMjYgLTIzIC0yMyAtMjEgLTE3IC04IC03IC03IDIgMyA1IDcgNyAxMCAxMCAxMCAxMSAxMyAxMyAxMyAxNiAxNyAxNyAxOSAyMyAzMSAzMiAzMiAzMyAzMyAzNSAzOCA0MSA0NSA0NiA0NiA0NyA0OSA1NyA2MCA2MCA2MCA2MSA2NiA2NyA2OCA3MCA3MCA3NSA3OCA3OSA3OSA4MCA4MiA4NCA4NSA4NyA4NyA5MiA5MiA5MyA5Mw==",
  ],
};

export default encodedTestCases;
