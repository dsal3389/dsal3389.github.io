import ScrollMagic from "scrollmagic";
import anime from "animejs";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


async function typeWriter(element: HTMLParagraphElement | HTMLSpanElement, strings: String[]) {
  let index = 0;

  while (true) {
    while (element.innerText) {
      element.innerText = element.innerText.slice(0, -1);
      await sleep(170);
    }

    for (let c of strings[index++]) {
      element.textContent += c;
      await sleep(100);
    }

    await sleep(500);
    if (index >= strings.length) {
      index = 0;
    } 
  }
}

// animations ---

typeWriter(
    document.getElementById("scene-1-titles")!,
    [
        "Python developer",
        "C developer",
        "Rust developer",
        "full stack developer"
    ]
);

anime({
  targets: "#scene-1-img",
  keyframes: [
    { translateY: -25 },
    { translateY: 0 }
  ],
  easing: 'easeInOutQuad',
  duration: 4500,
  loop: true
});

let skillAnimation = anime({
  targets: ".scene-3-skill",
  translateX: (_: HTMLDivElement, i: number): number[] => {
    return i % 2 === 0 ? [-200, 0] : [200, 0];
  },
  opacity: [0, 1],
  duration: 5500,
  delay: anime.stagger(1500),
  autoplay: false,
});

// define scroll margic scenes ---

let controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
  triggerElement: "#scene-2",
  triggerHook: "onLeave",
  duration: 400,
})
.setPin("#scene-2-info")
.addTo(controller);

new ScrollMagic.Scene({
  triggerElement: "#scene-3",
  offset: 400,
  duration: 1500
}).on("progress", (event) => {
  skillAnimation.seek(skillAnimation.duration * event.progress);
})
.setPin("#scene-3-skills")
.addTo(controller);
