const options = {
    
};

const songSearchInputBox = document.getElementById("songSearch");
const songSearchButton = document.getElementById("songButton");
// console.log(songSearchButton);

songSearchButton.addEventListener('click', function () {
    // '',"",{},null,0->false
    // 'f',"dsfdgfhjkj",{fd:"fgh"},2,10000, ......->true

    if (songSearchInputBox.value) {
        localStorage.clear();
        fetchData(`urlq=${songSearchInputBox.value}`)
    } else {
        alert('Please Enter a song and then search!');
    }

})


async function fetchData(url) {
    let response = await fetch(url, options);
    let data = await response.json();
    console.log(data);
    processSong(data.albums);
}


function processSong(info) {
    var songObject = info.items;
    // localStorage.setItem("info",info.items)
    for (let i = 0; i < songObject.length; i++) {
        if (songObject[i].data) {
            if (songObject[i].data.name){
                console.log(songObject[i].data.name);
                localStorage.setItem(`SongName-${i+1}`, songObject[i].data.name);
            }
            if (songObject[i].data.uri){
                console.log(songObject[i].data.uri)
                localStorage.setItem(`SongUri-${i+1}`, songObject[i].data.uri);
            }
            if (songObject[i].data.coverArt && songObject[i].data.coverArt.sources[0]) {
                var songPoster = songObject[i].data.coverArt.sources[0].url;
                localStorage.setItem(`SongPoster-${i+1}`, songObject[i].data.coverArt.sources[0].url);
            }
        }


    }
}


//STRING - EMPTY
//AS SOON AS USER HITS THE SCALE(4,5) THEN YOU WILL HIT THE API
//ELSEIF STRING LENGTH IS LESS THAT 4 THEN JUST APPEND DATA IN STRING AND ADD IN THE SUGGESTION BAR
//ELSE IF GREATER 5 SCALE SET =2(6,8,10) OPTIONAL
//APPEND DATA IN THE DIV