import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AddressInfo {
    margin-left: 10px;
    @include respond-to(sm) {
      margin-left: 0;
    }

    &__button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: right;
      min-width: 110px;
      padding: 5px;
      height: 32px;
      border-radius: 1px;
      font-size: $extraSmall;
      border: 1px solid transparent;
      transition: $transition;

      @include respond-to(sm) {
        width: 100%;
        margin-top: 10px;
        height: 54px;
        font-size: $small;
      }

      p {
        margin-bottom: 2px;
        white-space: nowrap;
        @include respond-to(sm) {
          margin-bottom: 5px;
        }
      }

      span {
        opacity: 0.5;
        text-transform: capitalize;
      }
    }

    &__buttonWithAvatar {
      flex-direction: row;
      align-items: center;

      .AddressInfo__ensAvatar {
        position: relative;
        z-index: 3;
        margin: 0;
      }
      .AddressInfo__buttonTextContent {
        align-items: flex-start;
      }
    }

    &__buttonEnsAvatarInner {
      position: relative;
      margin-right: 4px;
      padding: 2px;
      width: 24px;
      height: 24px;
      @include respond-to(sm) {
        width: 28px;
        height: 28px;
      }
      &:after,
      &:before {
        content: '';
        position: absolute;
        border-radius: 50%;
      }
      &:after {
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
      &:before {
        z-index: 2;
        top: 1px;
        bottom: 1px;
        left: 1px;
        right: 1px;
      }
    }

    &__buttonTextContent {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__content {
      min-width: 160px;
      border-radius: $borderRadius;
      @include respond-to(sm) {
        min-width: unset;
        width: 300px;
      }
    }

    &__contentSection {
      padding: 8px 12px;
      &:first-of-type {
        padding-bottom: 4px;
      }
      &:last-child {
        padding-top: 4px;
      }
    }

    &__contentTitle {
      height: 16px;
      display: flex;
      align-items: center;
      font-size: $small;
      margin-bottom: 4px;
      @include respond-to(sm) {
        font-size: $medium;
        height: 18px;
      }
    }

    &__contentNetwork {
      font-size: $medium;
      display: flex;
      align-items: center;
      white-space: nowrap;
      span {
        display: inline-flex;
        text-transform: capitalize;
      }
      i {
        display: block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-right: 6px;
        position: relative;
        bottom: 1px;
        @include respond-to(sm) {
          margin-right: 5px;
          width: 12px;
          height: 12px;
        }
      }
    }
    &__contentAddress {
      font-size: $medium;
      word-break: break-all;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }
    &__contentAddressSmall {
      font-size: $small;
      word-break: break-all;
      height: 24px;
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        font-size: $medium;
      }
    }

    &__contentProfile {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }

    &__contentEns {
      font-size: $medium;
      word-break: break-all;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__ensAvatar {
      width: 20px;
      height: 20px;
      margin-right: 4px;
      border-radius: 50%;
      @include respond-to(sm) {
        width: 24px;
        height: 24px;
      }
    }

    &__linkIcon {
      width: 10px;
      margin-left: 5px;
    }
    &__contentButton {
      font-weight: 300;
      text-transform: uppercase;
      font-size: $medium;
      padding: 15px 5px;
      width: 100%;
      text-align: center;
      backface-visibility: hidden;
      transform: translateZ(0);
      &:hover {
        border-bottom: 1px solid transparent;
      }
      @include respond-to(sm) {
        padding: 18px 5px;
        font-size: $extraLarge;
      }
      &:last-child {
        border-bottom: none !important;
      }

      * {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    }
  }
`;

export default staticStyles;
