import HttpService from './HttpService'
// const KEY = 'mixsDB';

export const mixService = {
    query,
    getById,
    remove,
    save,
    update,
    getSongByIdAndMix,
    createNewSong
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

// async function removeSong(songId, mixId){
//     var mix = await getById(mixId);
//     var song = await getSongByIdAndMix(songId, mixId);
//     var idx = mix.songs.findIndex(currSong => currSong.id === song.id);
// }







async function getSongByIdAndMix(songId, mixId) {
    var mix = await getById(mixId);
    var currSong = mix.songs.find(song => song.id === songId);
    return currSong
}


















function createNewSong() {
    return {
        "title": '',
        "id": makeId(),
        "songUrlId": '',
        "imgUrl": '',
        "addedBy": "minimal-user",
        "duration": "3:21",
        "isPlaying":false
    }
}


function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}