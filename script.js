let data_array = [
    {song_name: "Saudebaazi [Lofi]", url: "media/SAUDEBAAZI.mp3", img: "images/img5.jpg", duration: "3:45"},
    {song_name: "Ishq Wala Song", url: "media/Ishq_Wala_Love.mp3", img: "images/img1.jpeg", duration: "3:45"},
    {song_name: "I Love You", url: "media/I_love_you_song.mp3", img: "images/img2.jpeg", duration: "4:16"},
    {song_name: "Dildara", url: "media/Dildara_song.mp3", img: "images/img3.jpeg", duration: "4:30"},
    {song_name: "Mahiye Jinna Sohna", url: "media/Mahiye_Jinna_Sohna.mp3", img: "images/img4.jpeg", duration: "3:01"}
];
let all_songs_div = document.querySelector("#all_songs");
let poster = document.querySelector("#left");
let my_progress_bar = document.querySelector("#my_progress_bar");
let play = document.querySelector("#play");
let forward = document.querySelector("#forward");
let backward = document.querySelector("#backward");

let audio = new Audio();

let selected_song = 0;

function display_songs(){
    let clutter = "";
    data_array.forEach((song, index)=>{
        clutter += `
        <div class="song_card" id=${index}>
            <div class="part1">
                <img src="${song.img}" alt="">
                <h2>${song.song_name}</h2>
            </div>
            <h6>${song.duration}</h6>
        </div>`;
    });
    
    all_songs_div.innerHTML = clutter;
    audio.src = data_array[selected_song].url;
    document.querySelector("#song_details").innerHTML = data_array[selected_song].song_name;
    poster.style.backgroundImage = `url(${data_array[selected_song].img})`;
}

function play_song(){
    all_songs_div.addEventListener("click", (e)=>{
        console.log(e.target);
        e.target.style.backgroundColor = "black";
        // display_songs();
        selected_song = e.target.id;
        play.innerHTML = `<i class="ri-pause-line"></i>`;
        flag = 1;
        display_songs();
        audio.play();
    })
}

let flag = 0;
play.addEventListener("click", ()=>{
    if(flag==0){
        play.innerHTML = `<i class="ri-pause-line"></i>`;
        display_songs();
        audio.play();
        flag = 1;
    }
    else{
        play.innerHTML = `<i class="ri-play-fill"></i>`;
        display_songs();
        audio.pause();
        flag = 0;
    }
});

forward.addEventListener("click", ()=>{
    play.innerHTML = `<i class="ri-pause-line"></i>`;
    flag = 1;
    backward.style.opacity = 1;
    if(selected_song<data_array.length-1){
        selected_song++;
        display_songs();
        audio.play();
    }
    else{
        forward.style.opacity = 0.43;
    }
});

backward.addEventListener("click", ()=>{
    play.innerHTML = `<i class="ri-pause-line"></i>`;
    flag = 1;
    forward.style.opacity = 1;
    if(selected_song>0){
        selected_song--;
        display_songs();
        audio.play();
    }
    else{
        backward.style.opacity = 0.43;
    }
});

function progress_bar(){
    audio.addEventListener("timeupdate", ()=>{
        console.log('timeupdate');
        // Update seekbaar
        progress = parseInt((audio.currentTime/audio.duration)*100);
        my_progress_bar.value = progress;
    })

    my_progress_bar.addEventListener("change", ()=>{
        audio.currentTime = my_progress_bar.value * audio.duration/100;
    })
}

progress_bar();
play_song();
display_songs();