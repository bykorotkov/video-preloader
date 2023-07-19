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
        if (isMobile) {
            // videoWrap.innerHTML = `<video autoplay="autoplay" controls class="js-video-open">
            //         <source src="./videos/zvezda-may23.mp4" type="video/mp4" />
            //     </video>`;
            // var video = document.querySelector(".js-video");
            // if (video.requestFullscreen) {
            //     video.requestFullscreen();
            // } else if (video.webkitRequestFullscreen) {
            //     /* Safari */
            //     video.webkitRequestFullscreen();
            // } else if (video.msRequestFullscreen) {
            //     /* IE11 */
            //     video.msRequestFullscreen();
            // }
            var videoWrap = document.createElement("div");
            videoWrap.classList.add("js-video-wrap", "opacity-transition");
            videoWrap.innerHTML = `<video autoplay="autoplay" controls class="js-video-open">
                <source src="./videos/zvezda-may23.mp4" type="video/mp4" />
            </video>`;
            document.body.appendChild(videoWrap);
            // Добавляем обработку событий свайпа
            var startX,
                startY,
                distX,
                distY,
                threshold = 150;
            videoWrap.addEventListener(
                "touchstart",
                function (e) {
                    var touchobj = e.changedTouches[0];
                    startX = touchobj.clientX;
                    startY = touchobj.clientY;
                },
                false
            );

            videoWrap.addEventListener(
                "touchmove",
                function (e) {
                    e.preventDefault();
                    var touchobj = e.changedTouches[0];
                    distX = touchobj.clientX - startX;
                    distY = touchobj.clientY - startY;
                },
                false
            );

            videoWrap.addEventListener(
                "touchend",
                function (e) {
                    // Определяем направление свайпа и его длину
                    var isVerticalSwipe = Math.abs(distY) > Math.abs(distX);
                    var isLongSwipe = Math.abs(distY) > threshold || Math.abs(distX) > threshold;

                    if (isLongSwipe) {
                        if (isVerticalSwipe && distY > 0) {
                            // Закрытие видео для свайпа вниз
                            var video = videoWrap.querySelector(".js-video-open");
                            video.pause();
                            video.currentTime = 0;
                            videoWrap.remove();
                        } else if (!isVerticalSwipe) {
                            // Закрытие видео для свайпа влево и вправо
                            var video = videoWrap.querySelector(".js-video-open");
                            video.pause();
                            video.currentTime = 0;
                            videoWrap.remove();
                        }
                    }
                },
                false
            );
        } else {
            var videoWrap = document.createElement("div");
            videoWrap.classList.add("js-video-wrap", "opacity-transition");
            videoWrap.innerHTML = `<video autoplay="autoplay" class="js-video-open">
                <source src="./videos/zvezda-may23.mp4" type="video/mp4" />
            </video>
            <div class="close opacity-transition js-full-close"></div>
            <div class="button opacity-transition js-full-button"></div>`;

            document.body.appendChild(videoWrap);
        }

        if (!isMobile) {
            var video = document.querySelector(".js-video-open");
            var button = document.querySelector(".js-full-button");
            var close = document.querySelector(".js-full-close");
            var timer;

            if (videoWrap.requestFullscreen) {
                videoWrap.requestFullscreen();
            } else if (videoWrap.webkitRequestFullscreen) {
                /* Safari */
                videoWrap.webkitRequestFullscreen();
            } else if (videoWrap.msRequestFullscreen) {
                /* IE11 */
                videoWrap.msRequestFullscreen();
            }

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
