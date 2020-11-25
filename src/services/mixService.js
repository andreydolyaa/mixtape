import HttpService from './HttpService'
// const KEY = 'mixsDB';

export const mixService = {
    query,
    getById,
    remove,
    save,
    update
}
 
function query() {
    return HttpService.get('mixes');
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


