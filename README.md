### 1) What is the difference between var, let, and const?

- Javascript keywords `var`, `let`, `const` use for declare variables. but three different behavior or working.

- `var` functional scope or global scope. It is accessible anywhere inside the function where it is declared, and it is
  not block scope.

- `let` is block-scoped but uninitialized. `let` cannot be re-declared in the same scope, `let` declare value Mutable
  means updated or
  changing.

- `const` is block-scoped but uninitialized. `const` cannot be reassigned and holding objects or arrays. `const` declare
  value immutable means not changing value.

**Example:**

```javascript
`var`

var greet = 'hi there';
var greet = 'this is var scope' // override this scope

if (true) {
    var greet = 'amazing scope' // return this value
}

function sayGreet() {
    var hello = 'hello'
}

console.log(hello) // reference hello is define
console.log(greet)

    `let`

let learn = 'i love js';
learn = 'this is awesome js' // mutable value
if (true) {
    let learn = 'i hate js';
    console.log(learn) // first time run
    let hello = 'hey, hello';
    console.log(hello)
}
console.log(learn)
console.log(hello) // error hello is defined

//output: i hate js
//output: i love js

    `const`

const student = {
    name: 'javascript',
    age: 22,
}

student.name = 'python';
console.log(student.name) //output: python

    `but`

function hello() {
    const message = 'this is scope'
}

console.log(message) // error message is not defined
```

### 2) What is the difference between map(), forEach(), and filter()?

- `forEach()` mainly same to  `for` side effects, returns undefined. use for array all data looping one by one each
  element.

- `map()` use for a new creating array by applying a function to each element.

- `filter()`  Creates a new array with elements that pass a given conditional statement and return condition value.

Example:

```javascript
 const numbers = [1, 2, 3, 5, 9, 2, 4, 8, 5, 6, 2];

//foreach
numbers.forEach((num) => console.log(num))

// map → transformation
const doubledNumber = numbers.map(num => num * 2);
console.log(doubledNumber); // [2,4,6,  10,18,4,8,16,10,12,4 ]

// filter
const evenNum = numbers.filter(num => num % 2 === 0);
console.log(evenNum); // [2, 2, 4, 8, 6, 2]
```

### 3) What are arrow functions in ES6?

Arrow functions are a concise way to write functions. Best used for arrow function in callbacks and array methods and
easy for use.

Example:

```javascript
// javascript simple function
function sum(a, b) {
    return a + b;
}

// javascript Arrow function
const sum = (a, b) => a + b;

console.log(sum(2, 3)); // 5
```

- Javascript arrow function best for Short syntax, great for array operations.
- Javascript arrow function not be used as constructors, no arguments object.

### 4) How does destructuring assignment work in ES6?

- Destructuring means extract values from arrays or objects into separate variables and copy the element.

```javascript

// Destructuring Array Example:

const numbers = [1, 2, 3];
const [a, b, c] = numbers;
console.log(a, b, c); // 1, 2, 3

// Destructuring: objects Emaxple:

const person = {name: "jodu", age: 25};
const {name, age} = person;
console.log(name, age); // jodu, 25
```

### 5) Explain template literals in ES6. How are they different from string concatenation?

Javascript template literals use backticks (`) and allow string multi-line embedded expressions.

Example:

```javascript
const student = {
    name: 'jodu',
    age: 22,
    gpa: 5,
    pass: true
}
const studentDetails = `${student.name}, ${student.age}, ${student.gpa}, ${student.pass}`;
console.log((studentDetails));
```