import HttpService from './HttpService'
// const KEY = 'mixsDB';

export const mixService = {
    query,
    getById,
    remove,
    save,
    update,
    getSongByIdAndMix
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
//     mix.songs.splice()
// }




// async function getSongById(songId,mixId){
//     var mix = await getById(mixId);
//     var currSong = mix.filter(song => song.id === songId);
//     return currSong
// }

// function getSongByIdAndMix(songId, mixId) {
//     console.log(songId,mixId);
//     getById(mixId)
//         .then(res => {
//             return res.songs
//         }).then(songs => {
//             var currSong = songs.find(song => song.id === songId)
//             return currSong;
//         })
// }

// async function getSongByIdAndMix(songId,mixId){
//     var mix = await getById(mixId);
//     var song = mix.songs.find(song => song.id === songId);
//     return song;
// }


async function getSongByIdAndMix(songId,mixId){
    var mix = await getById(mixId);
    var currSong = mix.songs.find(song => song.id === songId);
    return currSong
}
// console.log(getSongByIdAndMix('mUkffgfiLjooxs','5c09'));