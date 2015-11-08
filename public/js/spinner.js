
import Spinner from 'spin';

const opts = {
  lines: 13,
  length: 28,
  width: 14,
  radius: 42,
  scale: 0.8,
  corners: 1,
  color: '#000',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  className: 'spinner',
  shadow: true,
  hwaccel: true
};

export default new Spinner(opts);
