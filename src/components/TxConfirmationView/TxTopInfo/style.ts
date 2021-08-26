import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxTopInfo {
    padding: 15px;
    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    &__errorInner {
      display: block;
      .TxTopInfo__left-inner {
        margin-right: 0;
      }
    }

    &__left-inner {
      flex: 1;
      margin-right: 15px;
      text-align: left;
      .TxTopInfo__title {
        font-size: $regular;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 2px;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(md) {
          font-size: $medium;
        }

        .DotStatus {
          margin-right: 5px;
        }
      }
      span {
        font-size: $medium;
        word-break: break-word;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
    }

    &__right-inner {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__button-inner {
      display: flex;
      align-items: center;
    }

    &__spinner {
      margin-right: 10px;
    }

    &__error-buttons {
      display: flex;
      align-items: center;
    }

    .TxTopInfo__button,
    .TxTopInfo__error-button {
      width: 120px;
      min-height: 40px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 90px;
        min-height: 30px;
        font-size: $small;
      }
    }

    .TxTopInfo__error-button {
      @include respond-to(xl) {
        font-size: $extraSmall;
      }

      .Button__wrapper {
        flex-direction: row-reverse;
        img {
          margin-left: 10px;
          width: 15px;
          height: 16px;
          @include respond-to(xl) {
            width: 13px;
            height: 14px;
          }
        }
      }
    }

    &__showError-button {
      font-size: $medium;
      margin-left: 20px;
      transition: $transition;
      &:hover {
        opacity: 0.7;
      }
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }

    &__modal-content {
      .Caption {
        margin-bottom: 20px;
        h2 {
          margin-bottom: 0;
        }
      }
    }
    &__errorReport-text {
      margin-bottom: 50px;
      padding: 20px 15px;
      font-size: $medium;
      word-break: break-word;
      @include respond-to(xl) {
        padding: 10px;
        font-size: $small;
      }
      @include respond-to(lg) {
        margin-bottom: 30px;
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        padding: 20px 10px;
        font-size: $small;
      }
    }
    &__modal-button-inner {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .DefaultButton {
        width: 160px;
        min-height: 40px;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
          width: 120px;
          min-height: 30px;
        }
        @include respond-to(md) {
          width: 160px;
          min-height: 40px;
          font-size: $small;
        }
        .Button__wrapper {
          flex-direction: row-reverse;
          img {
            margin-left: 7px;
            width: 15px;
            height: 16px;
            @include respond-to(xl) {
              margin-left: 15px;
            }
            @include respond-to(lg) {
              width: 11px;
              height: 12px;
              margin-left: 8px;
            }
            @include respond-to(md) {
              width: 15px;
              height: 16px;
              margin-left: 15px;
            }
          }
        }
      }
    }
  }

  .TxTopInfo__modal.ReactModal__Content {
    padding: 50px 15px !important;
    @include respond-to(xl) {
      padding: 40px 10px !important;
    }
    @include respond-to(lg) {
      padding: 30px 10px !important;
    }
    @include respond-to(md) {
      padding: 40px 10px !important;
    }
  }
`;

export default staticStyles;
