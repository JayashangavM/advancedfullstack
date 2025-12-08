let name ="jai"
var country = "india"
const pi = 3.14
/////////////////
p = 5+6
console.log(p)
/////////////////
a=10
b=20
console.log(a+b)
console.log(a - b)
console.log(a * b)
console.log(a / b)
//////////////////////
console.log(5=="5")
console.log(5==="5")  //checking for datatype
/////////////////////
function greet(name){
    console.log("hello"+name)
}
greet("jai")

/////////////////
function maa(age=18){
    if(age >= 18)
        return ("major")
    else
        return ("minor")

}
console.log(maa())
///////////////////

let fruits = ["apple","banana","mango"]
let car = {brand:"bmw",model:"m3",year:"2002"}
console.log(fruits[0]);      // apple
console.log(fruits.length);  // 3

/////////////////////
let x = 5
console.log(x)

let ac = "abc"
ac = "def"   // cannot be redeclare

var jai = "abc"
var jai = "def"   //can be redeclare
////////////////////////

let fruit = "mango";
switch (fruit) {
    case "mango":
        console.log(fruit,"is selected");
        break;

    default:
        console.log("Fruit not selected");
}

//////////////////

let person = {
    firstname: "jai",
    age:18,
    city:"perundurai"
}
for(let key in person){
    console.log(key + ":" +person[key])
}
let fru = ["apple","banana","mango"];
for(let fruit of fru){
    console.log(fruit)
}

////////////////
let age = 20;
let access = (age>=18)?"Allowed": "no allowed";
console.log(access)
////////////////////
const hell = (name)=>{
    return `hello, ${name}`
}
console.log(hell("jayashangav"))
/////////////////////
const number=[1,2,3];
const morenum = [4,5,6];
const allnumber = [...number, ...morenum];
console.log(allnumber)
/////////////
let Name = ["jai"];
let Age = [19];
let com = [...Name,...Age,city="perundurai"]
console.log(com)
/////////////////
const pers = {name:"jai", age:19}
const updatepers = {...pers,city:"perundurai"}
console.log(updatepers)
////////////////
const num = [1,2,3];
const [a,b,c] = num;
console.log(a,b,c)
/////////////////
const [first, ,third] = num;
console.log(first,third)
/////////////////
const [z,y,...rest] = num;
console.log(z,y)
console.log(rest)
////////////////
const Person = {NAME: "jai", AGE:25,city:"perundurai"}
const {NAME,AGE} = Person;
console.log(NAME,AGE)
///////////////
const NUM = [1,2,3,4,5]
const num1 = NUM.map(NUM=>NUM*NUM);
console.log(num1)
//////////////
const evennum = NUM.filter(NUM=>NUM%2===0);
console.log(evennum)
/////////////
const sum = num.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);
/////////////
function sum(...numbers){
    return numbers.reduce((total,num)=>total+num,0)
}
console.log(sum(1,2,3))
////////////
const arr = [1,2,3];
arr.push(4);
console.log(arr);
arr.push(5,6)
console.log(arr)
/////////////
arr.pop()
console.log(arr)
//////////////
arr.unshift(0)
arr.shift()
console.log(arr)
//////////////
let str = "hello world"
console.log(str.length);
console.log(str.charAt(0))
let str1 = "hello"
let str2 = "world"
console.log(str1.concat(",",str2,"!"))
console.log(str.includes("world"))
console.log(str.indexOf("world"))
console.log(str.substring(0,5))
