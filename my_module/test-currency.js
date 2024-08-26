const currency = require("./currency");

console.log("50$ US = " + currency.USToCanadian(50) + "$ canadian");
console.log("30$ canadian = " + currency.canadianToUS(30) + "$ US");
