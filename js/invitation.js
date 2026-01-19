const button = $('.invited-btn');
const envelope = $('.envelope');
const scrollDown = document.getElementById('scrollDown');
const details = document.getElementById('details');

let flipped = false;
let arrowVisible = false;

function pullOut() {
  button.fadeOut(300);

  return new TimelineMax()
    .to('.flap', 1, {
      rotationX: 180,
      ease: Power1.easeInOut
    }, 'start')

    .set('.flap', { zIndex: 0 })

    .to('.card', 0.8, {
      y: '0%',
      scaleY: 1.2,
      ease: Circ.easeInOut
    })

.to('.mask', 0.01, {
      overflow: 'visible',
      onComplete: function () {
        envelope.addClass('is-open');
        document.body.classList.remove('locked');

        setTimeout(function () {
          $('.invitation img').addClass('scale-up');
          $('.details-section').addClass('visible');
          $('.copyright').addClass('visible');

          scrollDown.classList.remove('hidden');
          scrollDown.classList.add('visible');
          arrowVisible = true;
        }, 600);
      }
    })

    .add('move')

    .to('.mask', 1.3, {
      clipPath: 'inset(0 0 0% 0)',
      ease: Circ.easeInOut
    }, 'move')

.to('.card', 0.85, {
      y: '125%',
      rotationZ: -90,
      transformOrigin: '50% 50%',
      scaleY: 1,
      ease: Circ.easeInOut
    }, 'move');
}

function toggleFlip() {
  if (!envelope.hasClass('is-open')) return;

  flipped = !flipped;
  TweenMax.to('.card', 1, {
    rotationY: flipped ? 180 : 0,
    ease: Power4.easeInOut
  });
}

// Arrow appears after envelope is open
scrollDown.addEventListener('click', () => {
  hideArrowAndUnlock();
  details.scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (!arrowVisible) return;

  if (window.scrollY > 5) {
    scrollDown.classList.remove('visible');
    scrollDown.classList.add('hidden');
    arrowVisible = false;
  }
});

button.one('click', pullOut);
button.on('click', toggleFlip);

  // Hide arrow when scrollings down
function hideArrowAndUnlock() {

  scrollDown.classList.remove('visible');
  scrollDown.classList.add('hidden');

  document.body.classList.remove('locked');
  arrowVisible = false;
}

window.addEventListener('scroll', () => {
  if (!arrowVisible) return;

  if (window.scrollY > 5) {
    hideArrowAndUnlock();
  }
}, { passive: true });

window.addEventListener('wheel', () => {
  if (!arrowVisible) return;
  hideArrowAndUnlock();
}, { passive: true });

window.addEventListener('touchmove', () => {
  if (!arrowVisible) return;
  hideArrowAndUnlock();
}, { passive: true });
