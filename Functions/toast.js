'use strict';

// DESC It is a notification function
export const toast = function (message, type) {
  const typeColors = {
    warn: '#fcad03',
    error: '#fc4103',
    info: '#03e7fc',
    success: '#008000',
  };
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    close: true,
    offset: {
      x: 37.5,
      y: 70,
    },

    style: {
      background: typeColors[type],
      fontFamily: 'Arial',
      fontSize: '16px',
    },
  }).showToast();
};
