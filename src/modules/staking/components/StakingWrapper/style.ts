import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakingWrapper {
    margin-top: 50px !important;
    margin-bottom: 10px !important;
    @include respond-to(sm) {
      margin-top: 0 !important;
      display: block !important;
    }

    &__mobile-switcher {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
      }
    }

    &__content-inner {
      display: flex;
      flex: 1;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__content-left,
    &__content-right {
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
    }

    &__content-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px 10px;
      position: relative;
      @include respond-to(sm) {
        padding: 20px 0;
        display: none;
        box-shadow: none;
        border-radius: 0;
        background: transparent !important;
      }
    }
    &__contentLeftActive {
      @include respond-to(sm) {
        display: flex;
      }
    }

    &__content-right {
      display: flex;
      flex-direction: column;
      width: 400px;
      margin-left: 20px;
      padding: 30px 15px 20px;
      @include respond-to(xl) {
        width: 340px;
      }
      @include respond-to(lg) {
        width: 310px;
        margin-left: 10px;
        padding: 20px 10px;
      }
      @include respond-to(sm) {
        width: 100%;
        margin: 0;
        padding: 30px 15px 20px;
        display: none;
      }
    }
    &__contentRightActive {
      @include respond-to(sm) {
        display: block;
      }
    }

    &__asset-switcherWrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      @include respond-to(lg) {
        margin-bottom: 20px;
      }
      @include respond-to(sm) {
        margin-bottom: 30px;
      }
      .LabeledSwitch {
        p {
          span {
            text-transform: uppercase;
          }
        }
      }
    }

    &__cards-inner {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      @include respond-to(xl) {
        margin-bottom: 30px;
      }
      @include respond-to(lg) {
        margin-bottom: 20px;
      }
      @include respond-to(sm) {
        margin-bottom: 30px;
        justify-content: center;
      }
    }

    .StakingWrapper__link {
      width: 100%;
    }
    .StakingWrapper__button {
      width: 100%;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }

    &__info-timerWrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__info-timerInner {
      width: 100%;
      border-radius: $borderRadius;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
      @include respond-to(xl) {
        height: 32px;
      }
      .StakingWrapper__timer {
        margin-right: 0 !important;
        opacity: 0.5 !important;
      }
    }
    &__info-timerText {
      margin-top: 5px;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }

    &__unstakeTime-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: $medium;
      margin-top: 10px;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      p {
        margin-bottom: 1px;
      }
      .StakingWrapper__unstakeTimer {
        margin-right: 0 !important;
        font-size: $regular !important;
        @include respond-to(xl) {
          font-size: $small !important;
        }
      }
    }
    &__gradientButton {
      width: 100%;
      height: 40px;
      border-radius: $borderRadius;
      position: relative;
      font-size: $medium;
      transition: $transition;
      @include respond-to(xl) {
        font-size: $extraSmall;
        height: 32px;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
      &:active {
        opacity: 0.8;
      }
      &:hover {
        &:after {
          opacity: 1;
        }
      }
      &:disabled {
        cursor: not-allowed;
        &:active {
          opacity: 1;
        }
        &:after {
          display: none;
        }
      }

      &:after {
        content: '';
        position: absolute;
        left: -1px;
        right: -1px;
        top: -1px;
        bottom: -1px;
        border-radius: $borderRadius;
        filter: blur(4px);
        opacity: 0;
        transition: $transition;
      }
    }
    &__gradientButton-inner {
      width: 100%;
      border-radius: $borderRadius;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      @include respond-to(xl) {
        height: 32px;
      }
    }

    &__cooldownPeriodTime {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }

    .StakingWrapper__row {
      margin-bottom: 40px;
      @include respond-to(xl) {
        margin-bottom: 25px;
      }
      @include respond-to(lg) {
        margin-bottom: 20px;
      }
      @include respond-to(md) {
        margin-bottom: 25px;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

export default staticStyles;
