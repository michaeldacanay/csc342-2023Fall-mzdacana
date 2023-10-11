let arr1 = [1, 2, 3, 4];

function add(arr) {
    let result = 0;

    // for(const item of arr) {
    //     console.log(item);
    //     result += item;
    // }

    // arr1.forEach(item)

    return result;
}

add(arr1);
// console.log(add(arr1));







const array1 = [1, 2, 3, 4];

// // 0 + 1 + 2 + 3 + 4
const initialValue = 0;
let reducer = (accumulator, arrayCurrent) => {
    console.log()
}


const sumWithInitial = array1.reduce( 
  (accumulator, arrayCurrent) => {},
  initialValue
);

// reducer is called on each element of array, similar to map
// 2 parameters of reducer: accumulator, value of current element in array


console.log(sumWithInitial);