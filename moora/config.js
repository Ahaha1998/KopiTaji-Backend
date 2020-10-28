const preference = [
    0.12,
    0.5,
    ["Banyak", "Sedikit", "Tidak Ada"],
    ["Berbau", "Agak Berbau", "Tidak Berbau"]
];

const weight = [
    16.7,
    20,
    33.3,
    30
];

const isBenefit = [
    true,
    true,
    true,
    true
];

module.exports = {
    preference,
    weight,
    isBenefit,
};

/*
[
    [0.2, 0.02, "Banyak", "Berbau"],
    [0.1, 0.1, "Banyak", "Agak Berbau"],
    [0.5, 0.1, "Sedikit", "Agak Berbau"]
]
*/
