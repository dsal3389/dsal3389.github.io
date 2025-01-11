import './style.css'
import anime from "animejs";
import Scrollmagic from "scrollmagic";


anime({
  targets: '#intro-pfp',
  keyframes: [
    { translateY: -25 },
    { translateY: 0 }
  ],
  easing: 'easeInOutQuad',
  duration: 5500,
  loop: true,
});

let skillAnimation = anime({
  targets: ".skill-card",
  opacity: [0, 1],
  translateX: (_: HTMLDivElement, i: number): number[] => {
    return i % 2 === 0 ? [-200, 0] : [200, 0];
  },
  delay: anime.stagger(2000),
  duration: 2000,
  autoplay: false,
});

let booksAnimation = anime({
  targets: ".book",
  opacity: [0, 1],
  scale: [1.1, 1],
  delay: anime.stagger(1000),
  autoplay: false,
});

new Scrollmagic.Controller()
  .addScene(
    new Scrollmagic.Scene({
      triggerElement: "#skills-section",
      duration: 1000,
      offset: -500,
    }).on<Scrollmagic.ProgressEvent>("progress", (event) => {
      skillAnimation.seek(skillAnimation.duration * event.progress!);
    })
  ).addScene(
    new Scrollmagic.Scene({
      triggerElement: "#books-section",
      duration: 1500,
      offset: -300,
    }).on<Scrollmagic.ProgressEvent>("progress", (event) => {
      booksAnimation.seek(booksAnimation.duration * event.progress!);
    })
  );
