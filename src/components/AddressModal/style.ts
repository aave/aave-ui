import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AddressModal {
    outline: none !important;
    &.ReactModal__Content {
      max-width: 400px !important;
      padding-left: 20px !important;
      padding-right: 20px !important;
      @include respond-to(xl) {
        max-width: 350px;
        padding-left: 10px !important;
        padding-right: 10px !important;
      }
    }

    &__caption {
      margin-bottom: 8px;
      text-align: center;
      h3 {
        font-size: $large;
        @include respond-to(xl) {
          font-size: $regular;
        }
      }
    }

    &__ledger-type {
      margin-bottom: 30px;
      h4 {
        margin-bottom: 20px;
      }
    }

    &__addresses {
      position: relative;
      padding-bottom: 35px;
      h4 {
        margin-bottom: 8px;
      }
    }

    &__ledger-type,
    &__addresses {
      h4 {
        font-size: $regular;
        font-weight: 400;
        @include respond-to(xl) {
          font-size: $medium;
        }
      }
    }

    &__select-option {
      padding: 7px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:disabled {
        cursor: default;
      }
      p {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        transition: $transition;
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }

    &__pagination-button {
      font-size: 0;
      line-height: 0;
      position: absolute;
      bottom: 10px;
      border-style: solid;
      border-width: 0 2px 2px 0;
      padding: 3px;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 2;
      display: inline-block;
      &:disabled {
        cursor: default;
        opacity: 0.2;
      }
      &:after {
        content: '';
        border: 1px solid;
        position: absolute;
        top: -6px;
        left: -6px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
    &__pagination-buttonPrev {
      transform: rotate(135deg);
      left: calc(50% - 30px);
      &:active {
        transform: rotate(135deg) scale(0.9);
      }
    }
    &__pagination-buttonNext {
      transform: rotate(-45deg);
      right: calc(50% - 30px);
      &:active {
        transform: rotate(-45deg) scale(0.9);
      }
    }
  }
`;

export default staticStyles;
