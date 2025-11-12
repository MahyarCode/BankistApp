'use strict';

import {
  labelTimer,
  labelWelcome,
  containerApp,
} from '../EventHandlers/Elements.js';

export const startLogOutTimer = function () {
  // DESC set time to 5 minutes
  let time = 300;

  // NOTE the reason of tick() function is to start the countdown immediately after logging in
  const tick = function () {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    // DESC in each call, print the remaining time to UI
    labelTimer.textContent =
      `${min}`.padStart(2, 0) + ':' + `${sec}`.padStart(2, 0);

    // DESC when 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      // DESC Display UI ane Message
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // DESC call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
