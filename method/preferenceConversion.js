function getCommon(crit, arr2) {
  var common = 0;
  var j = 0;

  while (j < arr2.length) {
    if (crit == arr2[j]) {
      if (j == 0) {
        common = 3;
      } else if (j == 1) {
        common = 2;
      } else {
        common = 1;
      }
      break;
    } else {
      j++;
    }
  }

  return common;
}

function convertPreverence(input, preference) {
  let newInput = [];
  for (let i = 0; i < input.length; i++) {
    newInput[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      if (j < 2) {
        newInput[i].push(input[i][j]);
      } else {
        let nilai = getCommon(input[i][j], preference[j]);
        newInput[i].push(nilai);
      }
    }
  }
  return newInput;
}

module.exports = convertPreverence;
