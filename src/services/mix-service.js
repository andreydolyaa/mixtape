import HttpService from './HttpService'
// const KEY = 'mixsDB';
var gMixes = [];

export const mixService = {
    query,
    getById,
    remove,
    save,
    update
}









function query() {
    gMixes = HttpService.get('mixes');
    return gMixes
}

function getById(mixId) {
    return HttpService.get(`mixes/${mixId}`);
}

function remove(mixId) {
    return HttpService.delete(`mixes/${mixId}`);
}

function save(mix) {
    return HttpService.post('mixes', mix)
}

function update(mix) {
    return HttpService.put(`mixes/${mix._id}`, mix);
}


