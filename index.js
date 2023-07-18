function videoPreloaderProgress() {
    const video = document.querySelector(".js-video");
    video.addEventListener("loadedmetadata", function () {
        const videoLength = video.duration;
        const roundedLength = Math.round(videoLength);

        setInterval(() => {
            const currentTime = video.currentTime;

            videoPercent = (currentTime * 100) / roundedLength;
            roundedPercent = Math.round(videoPercent);

            const start = 410;
            const end = 200;

            let videoWrap = video.closest(".video-player");
            var preloaderFill = videoWrap.querySelector(".js-video-preloader-fill");
            preloaderFill.style.strokeDashoffset = start - ((start - end) * roundedPercent) / 100;
        }, 500);
    });
}

function videoPlayer() {
    var isMobile = window.innerWidth < 768;
    document.querySelector(".js-video-play").addEventListener("click", function () {
        var videoWrap = document.createElement("div");
        videoWrap.classList.add("js-video-wrap", "opacity-transition");
        if (isMobile) {
            videoWrap.innerHTML = `<video autoplay="autoplay" controls class="js-video-open">
                    <source src="./videos/zvezda-may23.mp4" type="video/mp4" />
                </video>`;
        } else {
            videoWrap.innerHTML = `<video autoplay="autoplay" class="js-video-open">
                <source src="./videos/zvezda-may23.mp4" type="video/mp4" />
            </video>
            <div class="close opacity-transition js-full-close"></div>
            <div class="button opacity-transition js-full-button"></div>`;
        }
        document.body.appendChild(videoWrap);

        if (!isMobile) {
            var video = document.querySelector(".js-video-open");
            var button = document.querySelector(".js-full-button");
            var close = document.querySelector(".js-full-close");
            var timer;

            function hideControls() {
                button.style.opacity = "0";
                close.style.opacity = "0";
            }

            document.querySelector(".js-full-close").addEventListener("click", function () {
                var video = document.querySelector(".js-video-open");
                video.pause();
                video.currentTime = 0;
                document.querySelector(".js-video-wrap").remove();
            });

            document.addEventListener("keydown", function (event) {
                if (event.keyCode === 27) {
                    // проверяем, что это клавиша esc
                    var video = document.querySelector(".js-video-open");
                    video.pause();
                    video.currentTime = 0;
                    document.querySelector(".js-video-wrap").remove();
                }
            });

            button.addEventListener("click", function () {
                if (video.paused) {
                    video.play();
                    button.style.background = "url(./images/full_pause.svg) no-repeat center center / cover";
                } else {
                    video.pause();
                    button.style.background = "url(./images/full_play.svg) no-repeat center center / cover";
                }
            });

            video.addEventListener("mousemove", function () {
                button.style.opacity = "1";
                close.style.opacity = "1";
                clearTimeout(timer);
                timer = setTimeout(hideControls, 2000);
            });
        }
    });
}

function allFunctions() {
    videoPreloaderProgress();
    videoPlayer();
}
allFunctions();
