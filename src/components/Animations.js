import { keyframes } from 'styled-components';

export const FadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Blink = keyframes`
    0% {
      opacity: .2;
    }

    20% {
      opacity: 1;
    }

    100% {
      opacity: .2;
    }
`;

export const BlinkReverese = keyframes`
    0% {
      opacity: 1;
    }

    20% {
      opacity: 0.2;
    }

    100% {
      opacity: 1;
    }
`;

export const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RotateReverse = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

export const Slide = keyframes`
  0 % {
    left: 0;
  }
  50 % {
    left: 30px;
  }
  100 % {
    left: 58px;
  }
`;