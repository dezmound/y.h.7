# README
# Как запустить
```
npm i
npm run dev
```
#
В файле `request.js` находится модуль для формирования последовательных запросов.    
Пример использования:
```javascript
import Request from './request.js';

Request
.get('http://localhost:8080/index.js')
/*
    response - ответ на текущий запрос,
    data - данные из предидущего запроса
*/
.then(([response, data]) => {
    return response.blob();
})
.get('http://localhost:8080/request.js')
.then(([response, data]) => {
    console.log(response, data); // Response, Blob
})
/* Если произошла сетевая ошибка */
.catch(() => {
    console.log(`Нет доступа к ресурсу`);
});

```
Аргументы, переданные в
```javascript
    Request.get(url, options)
```
совместимы с сигнатурой 
```javascript
    fetch(url, options)
```
можно вызвать `get` с различными параметрами:
```javascript
import Request from './request.js';

Request
.get('https://google.com', {
    mode: 'no-cors',
    // ...
})
```
После вызова метода `get` можно строить цепочки, следующий `then` получит два параметра:
```javascript
const request = Request.get(/**/);
request.then(([response, data]) => {
    return 'some data';
}).get(/**/).then(([response, data]) => {
    console.log(data); // some data
});
```
