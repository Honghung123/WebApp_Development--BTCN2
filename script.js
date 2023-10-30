import { DBProvider } from "./DB_Provider.js";

let data = await DBProvider.fetch(`search/movie/the?per_page=6&page=1`);
// console.log(data);
// data = await DBProvider.fetch(`search/movie/avenger?per_page=6&page=1`);
// console.log(data);
data = await DBProvider.fetch(`search/name/robert?per_page=1&page=1`);
// console.log(data);
// data = await DBProvider.fetch(`get/review/tt0012349?per_page=15&page=1`);
// console.log(data);
// data = await DBProvider.fetch(`get/top50/?per_page=24&page=1`);
// console.log(data);
// data = await DBProvider.fetch(`get/mostpopular/?per_page=30&page=1`);
// console.log(data);
// data = await DBProvider.fetch(`get/topboxoffice/?per_page=5`);
// console.log(data);
// data = await DBProvider.fetch(`detail/movie/tt1201607`);
// data = await DBProvider.fetch(`detail/name/nm0000375`);
console.log(data);
