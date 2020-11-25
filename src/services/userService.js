import HttpService from './HttpService'
// const KEY = 'usersDB';

export const userService = {
    query,
    getById,
    remove,
    save,
    update
}

function query() {
    return HttpService.get('user');
}

function getById(userId) {
    return HttpService.get(`user/${userId}`);
}

function remove(userId) {
    return HttpService.delete(`user/${userId}`);
}

function save(user) {
    return HttpService.post('user', user);
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user);
}

