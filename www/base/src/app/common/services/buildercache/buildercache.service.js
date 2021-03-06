/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// builder data used everywhere in the UI, so we implement a simple cache

// TODO this caching mechanism needs to be implemented eventually in data module
// Its much more complicated to do this generically, and keep the event mechanism,
// this is why we do this temporary workaround

// Objects returned by this service cannot use onNew/onUpdate mechanism of data module (as they are shared)

class buildersService {
    constructor($log, dataService) {
        // we use an always on dataService instance
        const data = dataService.open();
        const cache = {};
        return {
            getBuilder(id) {
                if (cache.hasOwnProperty(id)) {
                    return cache[id];
                } else {
                    cache[id] = {};
                    data.getBuilders(id).onNew = builder => _.assign(cache[id], builder);
                    return cache[id];
                }
            }
        };
    }
}


angular.module('common')
.factory('buildersService', ['$log', 'dataService', buildersService]);
