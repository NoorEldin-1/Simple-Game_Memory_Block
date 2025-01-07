const startButton = document.querySelector(".start");
const name = document.querySelector(".name span");
const blocksContainer = document.querySelector(".game-blocks-container");
const blocks = Array.from(blocksContainer.children);
const wrong = document.querySelector(".wrong span");

startButton.addEventListener("click", () => {
  document.querySelector(".start-game").style.display = "none";
  const x = prompt("Enter Your Name");
  if (x === null || x === "") {
    name.textContent = "Guest";
  } else {
    name.textContent = x;
  }
});
blocks.forEach((block) => {
  block.style.order = Math.trunc(Math.random() * blocks.length);
});
blocks.forEach((block) => {
  block.addEventListener("click", () => {
    block.classList.add("flip");
    const flippedBlocks = document.querySelectorAll(".flip");
    if (flippedBlocks.length === 2) {
      blocksContainer.style.pointerEvents = "none";
      setTimeout(() => {
        if (
          flippedBlocks[0].dataset.technology ===
          flippedBlocks[1].dataset.technology
        ) {
          document.getElementById("success").play();
          flippedBlocks.forEach((block) => {
            block.classList.remove("flip");
            block.classList.add("match");
            const matchedBlocks = document.querySelectorAll(".match");
            if (matchedBlocks.length === blocks.length) {
              document.querySelector(".win-popUp").style.display = "flex";
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          });
        } else {
          document.getElementById("fail").play();
          flippedBlocks.forEach((block) => {
            block.classList.remove("flip");
          });
          wrong.textContent++;
          if (wrong.textContent === "30") {
            document.querySelector(".lose-popUP").style.display = "flex";
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
        blocksContainer.style.pointerEvents = "auto";
      }, 500);
    }
  });
});
