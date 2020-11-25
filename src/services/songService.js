
// import HttpService from './HttpService.js';
import axios from 'axios';


const baseUrl = '//localhost:3000';
var gSongs = [];



export const songService = {
    query,
    // getById
}

async function query() {
    // var res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=3&q=NoCopyrightSounds&key=AIzaSyDnI2s9KOByXBAdh2EPIDFE8pKaowsHXjE`);
    // return res.data.items;
    var res = await axios.get(`${baseUrl}/mixes`);
    return res.data;
}






// function getById(songId,songList){
//     return songList.findIndex(song => song.id === songId);
// }





// console.log(getById('s1001',gSongs[0]));


// function changeVideoUrl(url) {
//     console.log(url);
//     return url.replace('watch?v=', 'embed/');
// }