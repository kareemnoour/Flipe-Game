const gameArea = document.querySelector(".gameArea");

let flags = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
let duplicatedFlags = [...flags, ...flags, "joker"];

gameArea.innerHTML = duplicatedFlags
    .map(
        (flag) => `
     <div class="card">
        <div class="card-content">
            <div class="front">
                <img src="./images/100.png" alt="Front">
            </div>
            <div class="back">
                <img src="./images/${flag}.png" alt="Back">
            </div>
        </div>
    </div>`
    )
    .join("");

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        checkMatch();
    });
    card.style.order = Math.floor(Math.random() * 100);
});

function checkMatch() {
    let flippedCards = document.querySelectorAll(".flipped:not(.matched)");

    if (flippedCards[0].querySelector(".back img").src.includes("joker")) {
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML = "💀 Joker card picked! Game Over!";
        document.getElementById("banner").style.color = "red";

        setTimeout(() => {
            location.reload();
        }, 3000);
        return;
    } 

    if (flippedCards.length === 2) {
        let img1 = flippedCards[0].querySelector(".back img").src;
        let img2 = flippedCards[1].querySelector(".back img").src;

        if (img1.includes("joker") || img2.includes("joker")) {
            
            document.getElementById("banner").style.display = "block";
            document.getElementById("banner").innerHTML = "💀 Joker card picked! Game Over!";
            document.getElementById("banner").style.color = "red";

            setTimeout(() => {
                location.reload();
            }, 3000);
            return;
        }

        if (img1 === img2) {

            flippedCards.forEach((card) => {
                card.classList.add("matched");
                card.classList.add("fade-out");

                card.addEventListener("animationend",() => {
                    setTimeout(() => {
                        card.remove();
                        checkWin();      
                    }, 500);
                });
            });
        } else {
            flippedCards.forEach((card) => {
                setTimeout(() => {
                    card.classList.remove("flipped");
                }, 300);
            });
        }
    }
}

function checkWin() {
    let remainingCards = document.querySelectorAll(".card:not(.matched)");

    let jokerCard = null;
    remainingCards.forEach(card => {
        let backImg = card.querySelector(".back img").src;
        if (backImg.includes("joker.png")) jokerCard = card;
    });

    if (remainingCards.length === 1 && remainingCards[0] === jokerCard) {
        document.getElementById("banner").style.display = "block";
        document.getElementById("banner").innerHTML = "🏆 Congratulation You Did it Champ!";
        document.getElementById("banner").style.color = "green";
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
}

function detectDevice() {
    const ua = navigator.userAgent.toLowerCase();

    if (
        ua.indexOf("iphone") !== -1 ||
        ua.indexOf("android") !== -1
    ) {
        return "Mobile";
    } else if (
        ua.indexOf("ipad") !== -1 ||
        ua.indexOf("tablet") !== -1
    ) {
        return "Tablet";
    } else {
        return "Desktop";
    }
}

if (detectDevice() === "Desktop") {
   window.document.body.innerHTML = "This game is not supported on Desktop. Please try on Mobile or Tablet.";
}