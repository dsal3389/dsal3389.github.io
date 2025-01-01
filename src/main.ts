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
  delay: anime.stagger(1500),
  duration: 2000,
  autoplay: false,
});

new Scrollmagic.Controller()
  .addScene(
    new Scrollmagic.Scene({
      triggerElement: "#skills-section",
      duration: 1000,
      offset: -700,
    }).on<Scrollmagic.ProgressEvent>("progress", (event) => {
      skillAnimation.seek(skillAnimation.duration * event.progress!);
    })
  );
