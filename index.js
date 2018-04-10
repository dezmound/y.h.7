import Request from './request.js';

Request
.get('http://localhost:8080/index.js')
.then(([response, data]) => {
    return response.blob();
})
.get('http://localhost:8080/request.js')
.then(([response, data]) => {
    console.log(response, data);
})
.catch(() => {
    console.log(`Нет доступа к ресурсу`);
});
