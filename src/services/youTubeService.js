
import axios from 'axios';


const API_KEY = 'AIzaSyDwDQqSKJool3yVnvBcsfZtntzi11zi6G0'




export const youTubeService = {
    query,
}




// async function query(keyword){
//     var res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=${keyword}&key=${API_KEY}`);
//     var songId = res.data.items[0].id.videoId
//     console.log(res.data.items);
//     var songDetails = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?maxResults=1&part=snippet&&id=${songId}&key=${API_KEY}`);
//     songDetails.data.items[0].snippet.songId = songId;
//     console.log('@@ song details + id - api call result: ',songDetails.data.items[0].snippet);
//     return songDetails.data.items[0].snippet;
// }

async function query(keyword){
    var res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${keyword}&type=video&key=${API_KEY}`)
    console.log('RES ggggggggg',res.data.items);
    return res.data.items;
}



// query('snoop')

// async function query(keyword){
//     // const songsResults;
//     var res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=2&&type=video&q=${keyword}&key=${API_KEY}`);
//     // var songs = res.data.items.id.videoId;
//     var songs = res.data.items.map(song => song.id.videoId);
//     // var songsPrm = Promise.all(songs);
//     console.log('songs: ',songs);

    
//     var songsPrm = songs.map(songId => {
//         return axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=2&q=${songId}&key=${API_KEY}`)
//     })
//     // console.log(songsPrm,'SONGS PRM');
//     var results = Promise.all(songsPrm).then(res => {
//         return res.data;
//     }).then(res => {
//         console.log(res);
//     })
//     console.log('ffffff',results);
// }