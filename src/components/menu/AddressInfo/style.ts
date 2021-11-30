import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AddressInfo {
    margin-left: 10px;

    &__button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      text-align: right;
      min-width: 110px;
      padding: 5px;
      height: 32px;
      border-radius: 1px;
      font-size: $extraSmall;
      border: 1px solid transparent;
      transition: $transition;

      @include respond-to(sm) {
        width: 110px;
        height: 54px;
        font-size: $small;
        align-items: center;
      }

      p {
        margin-bottom: 2px;
        white-space: nowrap;
        margin-left: auto;
        margin-right: auto;
        @include respond-to(sm) {
          margin-bottom: 5px;
        }
      }

      span {
        opacity: 0.5;
        margin: 0 auto;
        text-transform: capitalize;
      }
    }

    &__content {
      width: 160px;
      border-radius: $borderRadius;
      @include respond-to(sm) {
        width: 260px;
      }
    }

    &__content-header {
      border-bottom: 1px solid black;
    }

    &__content-section {
      padding: 10px 5px 14px;
      @include respond-to(sm) {
        padding: 10px 25px;
      }
      border-bottom: 1px solid rgba(56, 61, 81, 0.1);
    }
    &__content-title {
      font-size: $small;
      opacity: 0.5;
      margin-bottom: 5px;
      @include respond-to(sm) {
        font-size: $medium;
      }
    }
    &__content-network {
      font-size: $medium;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      span {
        display: inline-flex;
        text-transform: capitalize;
      }
      i {
        display: block;
        width: 10px;
        height: 10px;
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
    &__content-address {
      font-size: $medium;
      word-break: break-all;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }
    &__content-address-small {
      text-align: center;
      font-size: $small;
      word-break: break-all;
    }
    &__content-ens {
      font-size: $medium;
      word-break: break-all;
      text-align: center;
      margin-bottom: 10px;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__link-icon {
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
