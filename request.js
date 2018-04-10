/**
 *  Класс для обработки последовательных запросов.
 */
class Request {
    /**
     * Конструктор класса
     */
    constructor(...args) {
        this._state = new Promise(...args);
    }
    /**
     * Совершает асинхронный запрос к ресурсу.
     * @param {string} url
     * @param {Object} [options]
     * @param {Request} [self]
     * @return {Request}
     */
    static get(url, options = {}, self = undefined) {
        if (self instanceof Request) {
            self._state = self._state.then(
                (data) => fetch(url, options)
                    .then((response) => {
                        return Promise.all([
                            response,
                            data,
                        ]);
                    })
        );
            return self;
        }
        return new this(
            (resolve, reject) => fetch(url, options)
                .then((response) => {
                    resolve([response, []]);
                })
        );
    }
    /**
     * Совершает асинхронный запрос
     * @param {string} url
     * @param {Object} [options]
     * @return {Request}
     */
    get(url, options) {
        return this.constructor.get(url, options, this);
    }
    /**
     * Обрабатывает ответ от текущего и данные от прошлого запроса.
     * then([response, data])
     * @return {Request}
     */
    then(...args) {
        this._state = this._state.then(...args);
        return this;
    }
    /**
     * Обрабатывает ошибки, при запросе к ресурсу.
     * Вызывается если в ответе статус > 400.
     * catch([response, data])
     * @return {Request}
     */
    catch(...args) {
        this._state = this._state.catch(...args);
        return this;
    }
}

export default Request;
