
import axios from 'axios';


const API_KEY = 'AIzaSyDnI2s9KOByXBAdh2EPIDFE8pKaowsHXjE'




export const youTubeService = {
    query,
}




async function query(keyword){
    var res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=1&q=${keyword}&key=${API_KEY}`);
    var songId = res.data.items[0].id.videoId
    var songDetails = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?maxResults=1&part=snippet&&id=${songId}&key=${API_KEY}`);
    songDetails.data.items[0].snippet.songId = songId;
    console.log('@@ song details + id - api call result: ',songDetails.data.items[0].snippet);
    return songDetails.data.items[0].snippet;
}




