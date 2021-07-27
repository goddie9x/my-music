let fakeAPI = {
    listMusic: [{
            id: 0,
            musicImage: './assets/medias/test.jpg',
            musicName: 'Bad liar',
            author: 'Imagine Dragons',
            url: './assets/medias/Bad_liar.mp3'
        },
        {
            id: 1,
            musicImage: './assets/medias/test.jpg',
            musicName: 'Believer',
            author: 'Imagine Dragons',
            url: './assets/medias/Believer.mp3',
        },
        {
            id: 2,
            musicImage: './assets/medias/test.jpg',
            musicName: 'Demons',
            author: 'Imagine Dragons',
            url: './assets/medias/Demons.mp3',
        },
        {
            id: 3,
            musicImage: './assets/medias/test.jpg',
            musicName: "It's Time",
            author: 'Imagine Dragons',
            url: './assets/medias/It_s_Time.mp3',
        },
        {
            id: 4,
            musicImage: './assets/medias/test.jpg',
            musicName: 'Natural',
            author: 'Imagine Dragons',
            url: './assets/medias/Natural.mp3',
        },
        {
            id: 5,
            musicImage: './assets/medias/test.jpg',
            musicName: 'Radioactive',
            author: 'Imagine Dragons',
            url: './assets/medias/Radioactive.mp3',
        }
    ]
}

function MusicApp(musicContain, options) {
    this.musicContain = $(musicContain);
    this.listMusic = options.listMusic;
    this.placeRender = this.musicContain.find('.list');
    this.currentSong = 0;
    this.mainDisk = this.musicContain.find('.rolling-disk');
    this.isRand = false;
    this.repType = 0;
    this.musicVolume = 0.5;

    this.renderMusic = function renderAllMusic(placeRender, listMusic) {
        listMusic.forEach(music => {
            $(placeRender).append(`<div class="music-item p-2 row col-12" musicID='${music.id}'>
            <div class="song col-10 col-md-8 col-xl-6 d-flex flex-row">
                <img class="music-img col-3 col-md-2" src="${music.musicImage}" alt="name-music"></img>
                <div class="music-details col-9 col-md-10 ps-3">
                    <h4 class="music-title h5">${music.musicName}</h4>
                    <div class="author">${music.author}</div>
                </div>
            </div>
            <div class="music-times d-none d-xl-block col-lg-2 align-self-center text-center">4:22</div>
            <div class="music-menu col-2 col-md-4 text-end align-self-center">
                <div class="btn music-remove bg-danger">Xoá</div>
                <div class="btn music-move d-none d-md-inline bg-info">Di chuyển</div>
            </div>
        </div>`);
        });
    }
    this.loadCurrentSong = function(song) {
        this.mainDisk.find('.main-music-title').html(song.musicName);
        this.mainDisk.find('.background-disk').css('background-image', 'url(' + song.musicImage);
        this.mainDisk.find('.main-music-author').html(song.author);
        this.mainDisk.find('.my-cosmos-music').attr('src', song.url);
    };

    this.playSong = function() {
        this.music = this.mainDisk.find('audio')[0];
        $('.music-item').removeClass('active');
        $(`.music-item[musicID='${this.currentSong}']`).addClass('active');
        this.music.play();
        this.music.volume = this.musicVolume;
        this.mainDisk.addClass('playing');
    }
    this.pauseSong = function() {
        this.music = this.mainDisk.find('audio')[0];

        this.music.pause();
        this.mainDisk.removeClass('playing');
    }

    this.nextSong = function() {
        let length = this.listMusic.length;

        if (this.isRand) {
            let crSong = this.currentSong;
            do {
                this.currentSong = Math.floor(Math.random() * length);
            }
            while (crSong == this.currentSong);

            this.loadCurrentSong(this.listMusic[this.currentSong]);
            this.playSong();
        } else {
            this.currentSong++;
            if (this.currentSong == length) {
                this.currentSong = 0;
            }
            this.loadCurrentSong(this.listMusic[this.currentSong]);
            this.playSong();
        }
    }
    this.prevSong = function() {
        let length = this.listMusic.length;

        if (this.isRand) {
            let crSong = this.currentSong;
            do {
                this.currentSong = Math.floor(Math.random() * length);
            }
            while (crSong == this.currentSong);
            this.loadCurrentSong(this.listMusic[this.currentSong]);
            this.playSong();
        } else {
            this.currentSong--;
            if (this.currentSong == -1) {
                this.currentSong = length - 1;
            }
            this.loadCurrentSong(this.listMusic[this.currentSong]);
            this.playSong();
        }
    }
    this.trackingSong = function() {
        let currSong = this.mainDisk[0].querySelector('.my-cosmos-music');
        let progress = this.mainDisk[0].querySelector('.progress-control');

        currSong.ontimeupdate = function(e) {

            if (currSong) {
                let percent = currSong.currentTime / currSong.duration * 100;
                progress.value = percent;
            }
        }
    }
    this.handleControllSong = function() {
        let btnRan = this.mainDisk.find('.fa-random');
        let btnPrev = this.mainDisk.find('.fa-step-backward');
        let btnPlay = this.mainDisk.find('.fa-play-circle');
        let btnNext = this.mainDisk.find('.fa-step-forward');
        let btnRepeat = this.mainDisk.find('.fa-redo');
        let currSong = this.mainDisk.find('.my-cosmos-music');
        let volumeControl = $('.volume-control');
        let progress = $('.progress-control');
        let _this = this;

        btnNext.on('click', function() {
            _this.nextSong();
        });

        btnRepeat.on('click', function() {
            _this.repType++;

            if (_this.repType == 3) {
                _this.repType = 0;
            }

            $(this).attr('repeatType', _this.repType);

            if (_this.repType == 0) {
                $(this).removeClass('active');
                $('.type-repeat').html('');
                currSong.attr('loop', false);
            } else {
                $(this).addClass('active');
                if (_this.repType == 1) {
                    $('.type-repeat').html('1');
                    _this.isRand = false;
                    currSong.attr('loop', true);
                } else {
                    $('.type-repeat').html('all');
                    currSong.attr('loop', false);
                }
            }
        });
        btnRan.on('click', function() {
            $(this).toggleClass('active');

            if (this.classList.contains('active')) {
                _this.isRand = true;
            } else {
                _this.isRand = false;
            }
        });
        this.mainDisk.find('img').animate({ transform: 'rotate(360deg)' }, '10000');


        btnPrev.on('click', function() {
            _this.prevSong();
        });
        btnPlay.on('click', function() {
            if (_this.mainDisk.hasClass('playing')) {
                _this.pauseSong();
            } else {
                _this.playSong();
            }
        });
        currSong.on('ended', function() {
            if (_this.repType != 0) {

                _this.nextSong();
            }
        });
        volumeControl.on('input', function(e) {
            _this.musicVolume = e.target.value / 100;
            _this.music.volume = _this.musicVolume;
        });
        progress.on('input', function(e) {
            let duration = _this.music.duration;

            _this.music.currentTime = duration * e.target.value / 100;
            $(this).attr('value', duration);
        })

    }
    this.handleEvent = function() {
        const _this = this;
        const currentListSong = $('.music-item');
        const btnDelete = currentListSong.find('.music-remove');
        const btnMove = currentListSong.find('.music-move');
        const disk = this.mainDisk.find('.rolling');
        /*  const diskWidth =disk.width();

         window.onscroll = function(e) {
             const scrollTop = window.scrollY || document.documentElement.scrollTop;;
             const newCdWidth = cdWidth - scrollTop;
           
             let amplitude = (width - scrollTop > 0) ? (width - scrollTop) : (0);
             let percent = amplitude / width;

             disk.css({
                 height: `${amplitude}px`,
                 opacity: percent
             })
         } */

        currentListSong.on('click', function(e) {
            _this.currentSong = $(this).attr('musicid');

            _this.loadCurrentSong(_this.listMusic[_this.currentSong]);
            _this.playSong();
        });
        btnDelete.on('click', function() {
            let music_item = $(this).parents('.music-item');
            let id = music_item.attr('musicid');

            if (_this.currentSong == id) {
                _this.nextSong();
            }
            music_item.remove();
            _this.listMusic.splice(id, 1);
        });

        btnMove.on('mousedown', function(e) {
            $(this).parents('.music-item').draggable({
                scroll: false,
                axis: 'y',
                containment: 'parent'
            });
        })
    }
    this.start = function start() {
        this.loadCurrentSong(this.listMusic[this.currentSong]);
        this.renderMusic(this.placeRender, this.listMusic);
        this.handleControllSong();
        this.handleEvent();
        this.playSong();
        this.trackingSong();
    };
}

let a = new MusicApp('.my_music', fakeAPI);

a.start();

$('.sort').on('click', function(e) {
    $('.sorting').toggleClass('active');
});