import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ConnectButton {
    position: relative;
    &:hover {
      &:before,
      &:after {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    &:active {
      transform: scale(0.98);
    }

    &:after,
    &:before {
      content: '';
      position: absolute;
      border-radius: $borderRadius;
      transition: all 0.3s ease;
      background-size: 300% !important;
      animation: animate 4.5s infinite;
    }

    &:before,
    &:after {
      top: -2px;
      bottom: -2px;
      left: -2px;
      right: -2px;
    }

    &:before {
      filter: blur(2px);
    }

    &__inner {
      width: 100px;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: $borderRadius;
      position: relative;
      z-index: 2;
      @include respond-to(sm) {
        width: 110px;
        min-height: 54px;
        padding: 0 10px;
      }
      span {
        font-size: $extraSmall;
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
  }

  .ConnectButton__normal {
    .ConnectButton__inner {
      width: 160px;
      min-height: 40px;
      @include respond-to(xl) {
        width: 120px;
        min-height: 32px;
      }
      @include respond-to(sm) {
        width: 300px;
        min-height: 50px;
      }
      span {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
  }

  .ConnectButton__medium {
    .ConnectButton__inner {
      width: 160px;
      min-height: 40px;
      @include respond-to(xl) {
        width: 90px;
        min-height: 30px;
      }
      @include respond-to(sm) {
        width: 120px;
        min-height: 36px;
      }

      span {
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          font-size: $small;
        }
      }
    }
  }

  @keyframes animate {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export default staticStyles;
