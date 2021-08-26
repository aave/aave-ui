import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .MarketSwitcher {
    &__text-button {
      font-size: $regular;
      font-weight: 600;
      &:hover {
        opacity: 0.7;
      }
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }

    &__onlyOne {
      .MarketSwitcher__button {
        cursor: default;
      }
      .MarketSwitcher__button-content {
        justify-content: center;
        &:hover {
          border-color: transparent !important;
        }
      }
    }

    &__button {
      border-radius: 1px;
      position: relative;
    }
    &__button-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 2;
      width: 120px;
      height: 32px;
      border: 1px solid transparent;
      border-radius: 1px;
      @include respond-to(sm) {
        width: 180px;
        height: 54px;
      }
      p {
        font-size: 9px;
        letter-spacing: 3px;
        position: relative;
        left: 2px;
        font-weight: 300;
        margin-top: 1px;
        @include respond-to(sm) {
          font-size: $small;
          letter-spacing: 8px;
          left: 4px;
        }
      }
    }
    &__firstClickButton {
      &:before {
        content: '';
        position: absolute;
        border-radius: 1px;
        transition: all 0.3s ease;
        background-size: 300% !important;
        animation: animate 4.5s infinite;
        top: -2px;
        bottom: -2px;
        left: -2px;
        right: -2px;
        filter: blur(1px);
      }
    }

    &__button-text {
      padding-top: 2px;
      overflow: hidden;
    }

    &__button-subLogo {
      height: 30px;
      @include respond-to(sm) {
        height: 52px;
      }
    }

    &__buttonLogo-inner {
      display: flex;
      align-items: center;

      img {
        width: 67px;
        max-height: 14px;
        margin: 0 auto;
        @include respond-to(sm) {
          width: 125px;
          max-height: 25px;
        }
      }

      span {
        font-size: $extraSmall;
        font-weight: 300;
        position: relative;
        right: 21px;
        @include respond-to(sm) {
          font-size: $medium;
          font-weight: 400;
          right: 30px;
        }
      }
    }
    &__buttonLogoInnerWithSubLogo {
      span {
        right: 2px;
      }
    }

    &__button-text {
      display: block;
      text-align: center;
      flex: 1;
    }

    &__content {
      width: 120px;
      @include respond-to(sm) {
        width: 180px;
      }
    }
    &__title {
      font-size: $small;
      padding: 13px 5px;
      text-align: center;
      font-weight: 300;
      width: 100%;
      @include respond-to(sm) {
        padding: 10px 5px;
        font-size: $regular;
      }
    }

    &__content-line {
      position: absolute;
      height: 10px;
      width: 100%;
      z-index: 11;
      top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(sm) {
        height: 20px;
        top: 39px;
      }
      img {
        width: 5px;
        height: 7px;
        @include respond-to(sm) {
          width: 9px;
          height: 10px;
        }
      }
    }
    &__content-lineTop {
      img {
        transform: rotate(180deg);
      }
    }
    &__content-lineBottom {
      top: auto;
      bottom: 0;
    }

    &__marketsWrapper {
      height: auto;
      @include respond-to(sm) {
        height: 300px;
      }
    }

    &__market {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 100%;
      @include respond-to(sm) {
        height: 60px;
      }
      &:last-child {
        border: none;
      }
    }

    &__market-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      width: 100%;
    }
    &__market-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding-top: 4px;
    }
    &__subLogo {
      height: 39px;
      @include respond-to(sm) {
        height: 59px;
      }
    }

    &__logo-inner {
      display: flex;
      align-items: center;
      img {
        width: 65px;
        max-height: 16px;
        @include respond-to(sm) {
          width: 104px;
          max-height: 25px;
        }
      }

      span {
        font-size: $small;
        position: relative;
        margin-left: 2px;
        @include respond-to(sm) {
          font-size: $medium;
          right: 3px;
        }
      }
    }

    &__marketText {
      line-height: 1.3;
      font-size: $extraSmall;
      letter-spacing: 3px;
      font-weight: 300;
      position: relative;
      left: 2px;
      margin-top: 1px;
      @include respond-to(sm) {
        font-size: $small;
        letter-spacing: 8px;
        left: 4px;
      }
    }

    &__kovan {
      background: #8f65ff;
      color: #ffffff;
      position: absolute;
      top: 2px;
      right: 2px;
      z-index: 10;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      font-size: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(sm) {
        width: 14px;
        height: 14px;
        top: 5px;
        right: 5px;
        font-size: 9px;
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
  }
`;

export default staticStyles;
