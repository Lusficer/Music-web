const PLAYER_STORAGE_KEY = 'F8_PLAYER'


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);    
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const player = $('.player');
const progress = $('#progress');
const timeCurrent = $('.progress_time-current');
const timeDuration = $('.progress_time-duration');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

    const app = {
        currentIndex : 0,
        isPlaying : false,
        isRandom : false,
        isRepeat : false,
        config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
        songs: [
            {   name: 'Chuyện rằng',
                artist : 'Thịnh Suy',
                path: './music/CHUYỆN RẰNG.mp3',
                img : 'https://data.chiasenhac.com/data/cover/126/125351.jpg'
            },
            {   name: 'Keep you mine',
                artist : 'NOTD, Shy Martin',
                path: './music/NOTD Shy Martin  Keep You Mine Lyric Video.mp3',
                img : 'https://images.genius.com/a3ecceb712715ffb0755990bfb6874eb.1000x1000x1.png'
            },
            {   name: 'Shadow of the sun',
                artist : 'Etto',
                path: './music/Shadow Of The Sun  王OK Cover Lyrics  Vietsub  TikTok.mp3',
                img : 'https://i.ytimg.com/vi/_6DjvqYhSG8/maxresdefault.jpg'
            },
            {   name: 'stitches',
                artist : 'Shawn Mendes',
                path: './music/Stitches  Mix  Shawn Mendes Justin Bieber The Chainsmokers Ruth B.mp3',
                img : 'data:image/jpeg;base64,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'
            },
            {   name: 'Tương 3 + 1',
                artist : 'Wn x Titie',
                path: './music/Tuong 31  Wn x Titie OFFICIAL MV ft Nau.mp3',
                img : 'data:image/jpeg;base64,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'
            },
            {   name: 'Deep End',
                artist : 'William Black',
                path: './music/William Black  Deep End Lyrics.mp3',
                img : 'data:image/jpeg;base64,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'
            }
        ],
        setConfig: function (key, value) {
            this.config[key] = value;
            localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
        },
        render: function(){
            const htmls = this.songs.map((song, index) => {
                return `
                        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                            <div class="thumb" 
                                style="background-image: url('${song.img}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.artist}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        </div>`
            })
            playlist.innerHTML = htmls.join('');
            timeCurrent.innerText = `00:00`;
            timeDuration.innerText = `00:00`;
        },
        
        defineProperties: function(){
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return this.songs[this.currentIndex];
                } 
            })
        },

        

        
        handleEvent : function() {
            const _this = this;
            const cdWidth = cd.offsetWidth;
            // xử lí phóng to thu nhỏ cd
            document.onscroll = function(){
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCdWidth = cdWidth - scrollTop;

                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth;
            }   

            // xử lí cd quay/ dừng
            const cdThumbAnimate = cdThumb.animate([
                {transform: 'rotate(360deg)'}
            ], {
                duration: 10000,
                iterations: Infinity,
            })

            // xử lí khi click play
            playBtn.onclick = function () {
                if(_this.isPlaying){
                    audio.pause();
                    cdThumbAnimate.pause();
                }else{
                    audio.play();
                    cdThumbAnimate.play();
                } 
            }
            // khi song bị play
            audio.onplay = function () {
                _this.isPlaying = true;
                 player.classList.add('playing');
            }

            // khi song bị pause
            audio.onpause = function () {
                _this.isPlaying = false;
                player.classList.remove('playing');
            }

            // xử lí khi tua  
            progress.oninput = function (e) {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
            }

            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent 
                }
            }

            // xử lí khi repeat song
            repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat
                _this.setConfig('isRepeat', _this.isRepeat);
                repeatBtn.classList.toggle('active', _this.isRepeat);
            }

            // khi random song
            randomBtn.onclick = function () {
                _this.isRandom = !_this.isRandom;
                _this.setConfig('isRandom', _this.isRandom);
                randomBtn.classList.toggle('active', _this.randomBtn);
            }

            // khi next song
            nextBtn.onclick = function () {
                if(_this.isRandom){
                    _this.playRandomSong();
                }else{
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActiveSong();
            }

            // khi prev song
            prevBtn.onclick = function () {
                if(_this.isRandom){
                    _this.playRandomSong();
                }else{
                    _this.prevSong();
                }
                audio.play();           
                _this.render();
                _this.scrollToActiveSong();

            } 
            audio.addEventListener('timeupdate', function(){
                const audioDuration = audio.duration; //method duration trả về độ dài của audio/video đó
                if(!isNaN(audioDuration)){ 
                    //audio.currentTime là method trả về thời gian đang chạy của audio/video đó
                    const progressPercent = audio.currentTime / audio.duration * 100;
                    progress.value = progressPercent;
                }
                // Hiển thị thời gian bài hát
                let current_minutes = Math.floor(audio.currentTime/60);
                let current_seconds = Math.floor(audio.currentTime - current_minutes * 60);
                let duration_minutes = Math.floor(audio.duration/60);
                let duration_seconds = Math.floor(audio.duration - duration_minutes * 60);
                if (current_minutes < 10){
                    current_minutes = `0${current_minutes}`
                }
                if(current_seconds < 10){
                    current_seconds = `0${current_seconds}`
                }
                if(duration_minutes < 10){
                    duration_minutes = `0${duration_minutes}`
                }
                if(duration_seconds < 10){
                    duration_seconds = `0${duration_seconds}`
                }
                timeCurrent.innerText = `${current_minutes}:${current_seconds}`
                timeDuration.innerText = `${duration_minutes}:${duration_seconds}`
            });

            // khi end song
            audio.onended = function () {
                if(_this.isRepeat){
                    audio.play();
                }else{
                    nextBtn.click();
                }
            }

            // lắng nghe hành vi click vào playlist
            playlist.onclick = function (e) {
                const songElement = e.target.closest('.song:not(.active)')
                if(songElement || e.target.closest('.option')) {
                    // xử lí khi click vào song
                    if(songElement) {
                        _this.currentIndex = Number(songElement.dataset.index) ;
                        _this.loadCurrentSong();
                        audio.play();
                        _this.render();
                }
                    // xử lí khi click vào option
                    if(e.target.closest('.option')){

                }
            }
            }
        },

        loadCurrentSong: function() {
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
            audio.src = this.currentSong.path;
        },

        nextSong: function() {
            this.currentIndex++
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0;
        }
            this.loadCurrentSong();
        },

        prevSong: function() {
            this.currentIndex--
            if(this.currentIndex < 0){
                this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();

        },

        playRandomSong: function(){
            let newIndex;
            do{
                newIndex = Math.floor(Math.random() * this.songs.length);
            }while(newIndex === this.currentIndex)
            this.currentIndex = newIndex;   
            this.loadCurrentSong();

        },
        scrollToActiveSong: function(){
            setTimeout(() => {
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block: 'end',
                    inline: 'nearest',
                })
            }, 300)
        },

        loadConfig: function(){
            this.isRandom = this.config.isRandom;
            this.isRepeat = this.config.isRepeat;
        },
        

        start: function(){
            this.loadConfig();

            this.defineProperties();

            this.handleEvent();

            this.loadCurrentSong();

            this.render();

            repeatBtn.classList.toggle('active', this.isRepeat);
            randomBtn.classList.toggle('active', this.randomBtn);
        },
    }
    app.start();