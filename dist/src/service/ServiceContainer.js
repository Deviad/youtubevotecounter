"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceContainer {
    constructor() {
        this.services = {};
    }
    /** Get an instance of the service container
     * @returns ServiceContainer
     */
    static getInstance() {
        if (ServiceContainer.instance == null) {
            ServiceContainer.instance = new ServiceContainer();
        }
        // console.log("ServiceContainer.instance.services", ServiceContainer.instance.services);
        return ServiceContainer.instance;
    }
    /** Add an instance of a class or the result of a function to the service container
     * After all functions in Javascript ar first class objects
     * @param  {Object|Function} service
     * @returns ServiceContainer
     */
    addService(service) {
        let name = null;
        // console.log("<<<>>> SERVICE ADDED <<<>>>>", service);
        if (Object.prototype.toString.call(service) === '[object Object]' && service.constructor) {
            name = service.constructor.name;
        }
        else if (Object.prototype.toString.call(service) === '[object Function]' && service.name) {
            name = service.name;
        }
        if (Object.prototype.toString.call(service) === '[object Object]') {
            this.services[`${name}`] = service;
        }
        else if (Object.prototype.toString.call(service) === '[object Function]') {
            this.services[`${name}`] = service();
        }
        return this;
    }
    /** Get a singleton instance of a class or the result of a function from the service container.
     * @param  {string} name
     * @returns any
     */
    getService(name) {
        // console.log(`this.services[${name}]`, this.services[`${name}`]);
        return this.services[`${name}`];
    }
}
exports.default = ServiceContainer;
//# sourceMappingURL=ServiceContainer.js.map