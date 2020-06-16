// variables
    const player = document.getElementById('player'),
        video = player.querySelector('#player-video'),
        btnPlayback = player.querySelector('.btnPlayback'),
        btnPlay = player.querySelector('.btnPlay'),
        btnPause = player.querySelector('.btnPause'),
        btnMute = player.querySelector('.btnMute'),
        btnFull = player.querySelector('.btnFull'),
        progress = player.querySelector('.progress'),
        progressBar = player.querySelector('progressBar'),
        timeBar = player.querySelector('.timeBar'),
        current = player.querySelector('.current'),
        videoTime = player.querySelector('.duration'),
        mobileControl = player.querySelector('.mobile-control');
    
    
    // logic
    function playControls() {
        activeToggle(btnPlayback);
        activeToggle(video);
        activeToggle(mobileControl);
    }

    function activeToggle(e) {
        const toggle = e.setAttribute('data-state', e.getAttribute('data-state') === 'is-active' ? 'is-inactive' : 'is-active');
        toggle;
    }

    function videoEnded() {
            playControls();
    }

    function playToggle() {
        if (video.paused) {
            video.play();
            playControls();
        } else {
            video.pause();
            playControls();
        }
        
    }

    function muteToggle() {
        video.muted = !video.muted;
        activeToggle(this);
    }

    function convertTime(n, elem) {
        const date = new Date(0);
        date.setSeconds(n);
        const timeString = date.toISOString().substr(14, 5);
        elem.innerHTML = timeString;
    }

    function timeCurrent() {
        convertTime(video.currentTime, current);
    }

    function timeDuration() {
        convertTime(video.duration, videoTime);
    }

    function metaSet() {
        const heightRatio = (video.videoHeight / video.videoWidth) * 100;
        video.style.height = `${heightRatio}vw`;
        timeDuration();
    }

    function progressUpdate() {
        const percent = (video.currentTime / video.duration) * 100;
        timeBar.style.width = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    function keyControllers(e) {
        switch (e.code) {
            case 'ArrowRight':
                event.preventDefault();
                video.currentTime = video.currentTime + (video.duration * 0.05);
                break;

            case 'ArrowLeft':
                event.preventDefault();
                video.currentTime = video.currentTime - (video.duration * 0.05);
                break;

            case 'Space':
                event.preventDefault();
                playToggle();
                break;
        }
    }

    function openFullscreen() {
        const e = video;
        if (e.requestFullscreen) {
            e.requestFullscreen();
        } else if (e.mozRequestFullScreen) {
            /* Firefox */
            e.mozRequestFullScreen();
        } else if (e.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            e.webkitRequestFullscreen();
        } else if (e.msRequestFullscreen) {
            /* IE/Edge */
            e.msRequestFullscreen();
        }
    }

    // event listeners
    video.addEventListener('click', playToggle);
    btnPlayback.addEventListener('click', playToggle);
    btnFull.addEventListener('click', openFullscreen);
    btnMute.addEventListener('click', muteToggle);
    video.addEventListener('timeupdate', progressUpdate);
    video.addEventListener('timeupdate', timeCurrent);
    video.addEventListener('timeupdate', timeDuration);
    video.addEventListener('loadedmetadata', metaSet);
    mobileControl.addEventListener('click', playToggle);
    document.addEventListener('keydown', (e) => keyControllers(e));

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);