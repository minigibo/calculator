import confetti, { Options } from "canvas-confetti";

export const triggerConfetti = () => {
  const originBottomLeft = {
    x: 0,
    y: 1,
  };

  const optionsBottomLeft: Options = {
    particleCount: 100,
    colors: ["#ee2fbe", "#abe2de", "#65ae3c"],
    origin: originBottomLeft,
    angle: 70,
  };

  confetti(optionsBottomLeft);

  const originBottomRight = {
    x: 1,
    y: 1,
  };

  const optionsBottomRight: Options = {
    particleCount: 100,
    colors: ["#ee2fbe", "#abe2de", "#65ae3c"],
    origin: originBottomRight,
    angle: 110,
  };

  confetti(optionsBottomRight);
};
