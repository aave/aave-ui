import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  // https://codepen.io/codeconvey/pen/xRzQay
  .snowflake {
    color: #fff;
    font-size: 1em;
    font-family: Arial;
    text-shadow: 0 0 1px #000;
  }

  @-webkit-keyframes snowflakes-fall {
    0% {
      top: -10%;
    }
    100% {
      top: 100%;
    }
  }
  @-webkit-keyframes snowflakes-shake {
    0% {
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
    50% {
      -webkit-transform: translateX(80px);
      transform: translateX(80px);
    }
    100% {
      -webkit-transform: translateX(0px);
      transform: translateX(0px);
    }
  }
  @keyframes snowflakes-fall {
    0% {
      top: -10%;
    }
    100% {
      top: 100%;
    }
  }
  @keyframes snowflakes-shake {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(80px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  .snowflake {
    position: fixed;
    top: -10%;
    z-index: 9999;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
    -webkit-animation-name: snowflakes-fall, snowflakes-shake;
    -webkit-animation-duration: 10s, 3s;
    -webkit-animation-timing-function: linear, ease-in-out;
    -webkit-animation-iteration-count: infinite, infinite;
    -webkit-animation-play-state: running, running;
    animation-name: snowflakes-fall, snowflakes-shake;
    animation-duration: 10s, 3s;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
    animation-play-state: running, running;
  }
  .snowflake:nth-of-type(0) {
    left: 1%;
    -webkit-animation-delay: 0s, 0s;
    animation-delay: 0s, 0s;
  }
  .snowflake:nth-of-type(1) {
    left: 10%;
    -webkit-animation-delay: 1s, 1s;
    animation-delay: 1s, 1s;
  }
  .snowflake:nth-of-type(2) {
    left: 20%;
    -webkit-animation-delay: 6s, 0.5s;
    animation-delay: 6s, 0.5s;
  }
  .snowflake:nth-of-type(3) {
    left: 30%;
    -webkit-animation-delay: 4s, 2s;
    animation-delay: 4s, 2s;
  }
  .snowflake:nth-of-type(4) {
    left: 40%;
    -webkit-animation-delay: 2s, 2s;
    animation-delay: 2s, 2s;
  }
  .snowflake:nth-of-type(5) {
    left: 50%;
    -webkit-animation-delay: 8s, 3s;
    animation-delay: 8s, 3s;
  }
  .snowflake:nth-of-type(6) {
    left: 60%;
    -webkit-animation-delay: 6s, 2s;
    animation-delay: 6s, 2s;
  }
  .snowflake:nth-of-type(7) {
    left: 70%;
    -webkit-animation-delay: 2.5s, 1s;
    animation-delay: 2.5s, 1s;
  }
  .snowflake:nth-of-type(8) {
    left: 80%;
    -webkit-animation-delay: 1s, 0s;
    animation-delay: 1s, 0s;
  }
  .snowflake:nth-of-type(9) {
    left: 90%;
    -webkit-animation-delay: 3s, 1.5s;
    animation-delay: 3s, 1.5s;
  }
  .ScreenWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    @include respond-to(xl) {
      padding: 0 40px;
    }
    @include respond-to(lg) {
      padding: 0 20px;
    }
    @include respond-to(md) {
      padding: 0 20px;
    }
    @include respond-to(sm) {
      padding: 0 10px;
    }

    &__withDesktopTitle {
      margin-top: 40px;
      @include respond-to(sm) {
        margin-top: 0;
        padding-top: 30px;
      }
    }

    &__mobileSubTitle {
      display: none;
      @include respond-to(sm) {
        display: block;
        width: calc(100% + 20px);
        position: relative;
        left: -10px;
        padding: 8px;
        text-align: center;
        margin-top: -30px;
        margin-bottom: 25px;
        font-size: $small;
      }

      .Link {
        display: inline-flex;
        img {
          width: 12px;
          height: 12px;
          margin-left: 5px;
        }
      }
    }

    &__mobile-bottomBorder {
      display: none;
      @include respond-to(md) {
        display: block;
        width: 100%;
        opacity: 0;
      }
      p {
        line-height: 50px;
      }
    }

    &__bannerWrapper {
      margin-bottom: 12px;
      @include respond-to(sm) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
    }

    &__bannerSpacer {
      display: none;
      @include respond-to(sm) {
        display: block;
        margin-bottom: 95px;
      }
    }
  }
`;

export default staticStyles;
