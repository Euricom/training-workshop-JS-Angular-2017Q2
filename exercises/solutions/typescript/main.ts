import * as moment from 'moment';
import * as clone from 'clone';
import { Car, MAX_LENGTH } from './service';
import config from './service';
import * as service from './service';

const car = new Car('bmw');
console.log(car);
console.log(MAX_LENGTH);
console.log(config);
console.log(service);

console.log(moment());
console.log(clone(config));


// Loops
// const list = ['john', 'zoo', 'bar'];
// for (const item of list) {
//   console.log(item);
// }
// const obj = { name: 'peter', age: 12 };
// for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//         console.log(key, obj[key]);
//     }
// };

