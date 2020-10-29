const transpose = require("../transpose");

function sorting(altPos, altNeg) {
  const sorted = altNeg.map((alt, index) => {
    return alt / (alt + altPos[index]);
  });
  return sorted;
}

function rank(sorted) {
  const ranks = sorted
    .slice()
    .sort((a, b) => {
      return b - a;
    })
    .map((v) => {
      return sorted.indexOf(v) + 1;
    });
  return ranks;
}

function rankAlt(altPos, altNeg) {
  const sorted = sorting(altPos, altNeg);
  const ranked = rank(sorted);
  const rankedAlt = sorted.reduce((arr, val, index) => {
    const newObj = {
      rank: ranked[index],
      value: val,
    };
    return [...arr, newObj];
  }, []);
  return rankedAlt;
}

function sumSquare(transposedVal) {
  return transposedVal.reduce((sumArray, alt) => {
    let sum = alt.reduce((sum, val) => {
      return sum + Math.pow(val, 2);
    }, 0);
    return [...sumArray, sum];
  }, []);
}

function normalization(decision, sumSquareArr) {
  return decision.reduce((arr, alt) => {
    const arrCriteria = alt.reduce((arrCriteria, val, index) => {
      const newArrCriteria = val / Math.sqrt(sumSquareArr[index]);
      return [...arrCriteria, newArrCriteria];
    }, []);
    return [...arr, arrCriteria];
  }, []);
}

function optimization(normalization, weight) {
  return normalization.reduce((arr, alt) => {
    const arrCriteria = alt.reduce((arrCriteria, val, index) => {
      const newArrCriteria = val * weight[index];
      return [...arrCriteria, newArrCriteria];
    }, []);
    return [...arr, arrCriteria];
  }, []);
}

function idealPositive(transposedVal, isBenefitArr) {
  return transposedVal.map((row) => {
    let idPos = null;
    isBenefitArr.map((val) => {
      idPos =
        val == true ? Math.max.apply(Math, row) : Math.min.apply(Math, row);
    });
    return idPos;
  });
}

function idealNegative(transposedVal, isBenefitArr) {
  return transposedVal.map((row) => {
    let idPos = null;
    isBenefitArr.map((val) => {
      idPos =
        val == true ? Math.min.apply(Math, row) : Math.max.apply(Math, row);
    });
    return idPos;
  });
}

function sumPosNeg(arrIdeal, optimization) {
  return optimization.reduce((sumArray, alt) => {
    let sum = alt.reduce((sum, val, index) => {
      return sum + Math.pow(arrIdeal[index] - val, 2);
    }, 0);
    return [...sumArray, sum];
  }, []);
}

function alternativePosNeg(arrSum) {
  return arrSum.reduce((sumArray, alt) => {
    let sqrt = Math.sqrt(alt);
    return [...sumArray, sqrt];
  }, []);
}

function topsis(decision, weight, isBenefit) {
  const decisionTransposed = transpose(decision);
  const criteriaSumSquared = sumSquare(decisionTransposed);

  const decisionNormalized = normalization(decision, criteriaSumSquared);
  const decisionOptimized = optimization(decisionNormalized, weight);

  const OptimizedTransposed = transpose(decisionOptimized);
  const IdealPositive = idealPositive(OptimizedTransposed, isBenefit);
  const IdealNegative = idealNegative(OptimizedTransposed, isBenefit);

  const sumIdealPositive = sumPosNeg(IdealPositive, decisionOptimized);
  const sumIdealNegative = sumPosNeg(IdealNegative, decisionOptimized);

  const alternativePositive = alternativePosNeg(sumIdealPositive);
  const alternativeNegative = alternativePosNeg(sumIdealNegative);

  const altRanked = rankAlt(alternativePositive, alternativeNegative);

  return {
    topsisNormalized: decisionNormalized,
    optimized: decisionOptimized,
    idPos: IdealPositive,
    idNeg: IdealNegative,
    altPos: alternativePositive,
    altNeg: alternativeNegative,
    ranked: altRanked,
  };
}

module.exports = topsis;
