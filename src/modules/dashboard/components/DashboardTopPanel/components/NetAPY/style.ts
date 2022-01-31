import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NetAPY {
    margin-bottom: 16px;
    @include respond-to(xl) {
      margin-bottom: 17px;
    }
    @include respond-to(lg) {
      margin-bottom: 36px;
    }
    @include respond-to(md) {
      margin-bottom: 18px;
    }
    @include respond-to(sm) {
      margin-bottom: 10px;
    }

    .TextWithModal {
      align-items: center;
    }

    .Row__title-inner {
      align-items: center !important;
    }
    .TextWithModal__button {
      position: static;
      transform: unset !important;
      margin-left: 4px;
    }

    .TextWithModal__text {
      font-size: $regular !important;
      @include respond-to(xl) {
        font-size: $medium !important;
      }
    }

    .ValuePercent {
      justify-content: center;
    }

    .ValuePercent__value {
      font-size: 24px !important;
      font-weight: 500 !important;
      align-items: center;
      @include respond-to(xl) {
        font-size: 20px !important;
      }
      @include respond-to(lg) {
        font-size: $regular !important;
      }
      @include respond-to(md) {
        font-size: 20px !important;
      }
      @include respond-to(sm) {
        font-size: $medium !important;
      }
    }

    &__collapsed {
      margin-bottom: 0;
      padding-right: 36px;
      @include respond-to(sm) {
        padding-right: 0;
        margin-bottom: 10px;
      }

      .Row__title-inner {
        align-items: flex-start !important;
      }

      .TextWithModal__text {
        font-size: $regular !important;
        @include respond-to(xl) {
          font-size: $medium !important;
        }
      }

      .ValuePercent {
        margin-top: 0;
        justify-content: flex-start;
      }

      .ValuePercent__value {
        font-size: $large !important;
        @include respond-to(xl) {
          font-size: $regular !important;
        }
        @include respond-to(sm) {
          font-size: $medium !important;
        }
      }
    }
  }
`;

export default staticStyles;
