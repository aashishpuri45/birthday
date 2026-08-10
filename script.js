/* ==========================================
   HAPPY BIRTHDAY PRABHA
   Plain JavaScript
========================================== */


const startScreen =
    document.getElementById("startScreen");

const startBtn =
    document.getElementById("startBtn");

const page =
    document.getElementById("page");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

const typedText =
    document.getElementById("typedText");



/* ==========================================
   TYPING MESSAGES
========================================== */

const messages = [

    "Happy Birthday Prabha ❤️",

    "Have a wonderful day ✨",

    "Filled with joy and happiness 💜",

    "May all your wishes come true 🎂",

    "Keep smiling and keep shining ✨"

];


let messageIndex = 0;

let charIndex = 0;

let deleting = false;



/* ==========================================
   START BUTTON
========================================== */

startBtn.addEventListener(
    "click",
    async function () {

        startScreen.style.opacity = "0";

        startScreen.style.visibility =
            "hidden";


        setTimeout(function () {

            startScreen.style.display =
                "none";

            page.classList.remove("hidden");

            startTyping();

        }, 700);


        /*
         Try to start music.
         Browser may block autoplay,
         which is why we started it
         from a button click.
        */

        try {

            await music.play();

        }

        catch (error) {

            console.log(
                "Music could not start."
            );

        }

    }
);



/* ==========================================
   MUSIC BUTTON
========================================== */

musicBtn.addEventListener(
    "click",
    async function () {

        if (music.paused) {

            try {

                await music.play();

            }

            catch (error) {

                alert(
                    "Make sure music.mp3 is inside the birthday folder."
                );

            }

        }

        else {

            music.pause();

        }

    }
);



/* ==========================================
   SLOW TYPING EFFECT
========================================== */

function startTyping() {

    deleting = false;

    charIndex = 0;

    typedText.textContent = "";

    typeMessage();

}


function typeMessage() {

    const message =
        messages[messageIndex];


    /*
       TYPING
    */

    if (!deleting) {

        if (charIndex < message.length) {

            typedText.textContent +=
                message.charAt(charIndex);

            charIndex++;


            /*
               90 milliseconds per character.

               Increase to 120 or 150
               if you want it even slower.
            */

            setTimeout(
                typeMessage,
                90
            );

        }

        else {

            /*
               Wait 2.5 seconds
               before deleting.
            */

            setTimeout(
                function () {

                    deleting = true;

                    typeMessage();

                },
                2500
            );

        }

    }


    /*
       DELETING
    */

    else {

        if (charIndex > 0) {

            charIndex--;

            typedText.textContent =
                message.substring(
                    0,
                    charIndex
                );


            setTimeout(
                typeMessage,
                45
            );

        }

        else {

            messageIndex++;

            if (
                messageIndex >=
                messages.length
            ) {

                messageIndex = 0;

            }


            setTimeout(
                startTyping,
                500
            );

        }

    }

}



/* ==========================================
   FLOATING NEON PARTICLES
========================================== */

const canvas =
    document.getElementById(
        "particles"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];



/* Resize canvas */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}



/* Create particles */

function createParticles() {

    particles = [];


    const amount =
        Math.min(
            90,
            Math.floor(
                window.innerWidth / 12
            )
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() *
                2.5 + .5,

            speed:
                Math.random() *
                .5 + .15,

            alpha:
                Math.random() *
                .7 + .2,

            drift:
                (
                    Math.random() -
                    .5
                ) * .25

        });

    }

}



/* Animate particles */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (particle) {

            particle.y -=
                particle.speed;

            particle.x +=
                particle.drift;


            if (
                particle.y < -10
            ) {

                particle.y =
                    canvas.height + 10;

                particle.x =
                    Math.random() *
                    canvas.width;

            }


            if (
                particle.x < -10
            ) {

                particle.x =
                    canvas.width + 10;

            }


            if (
                particle.x >
                canvas.width + 10
            ) {

                particle.x = -10;

            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    211,
                    102,
                    255,
                    ${particle.alpha}
                )`;


            ctx.shadowBlur = 10;

            ctx.shadowColor =
                "#c85cff";


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}



/* ==========================================
   INITIALIZE PARTICLES
========================================== */

resizeCanvas();

createParticles();

animateParticles();


window.addEventListener(
    "resize",
    function () {

        resizeCanvas();

        createParticles();

    }
);