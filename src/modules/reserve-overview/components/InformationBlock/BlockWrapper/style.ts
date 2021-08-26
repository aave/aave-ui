import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BlockWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    @include respond-to(sm) {
      width: 48%;
      margin-bottom: 30px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__title-inner {
      .TextWithModal__text,
      p {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }

      .TextWithModal__button {
        @include respond-to(xl) {
          right: -14px !important;
        }
        @include respond-to(lg) {
          right: -12px !important;
        }
        @include respond-to(md) {
          right: -14px !important;
        }
        @include respond-to(sm) {
          right: -16px !important;
        }
      }

      .TextWithModal__button img {
        @include respond-to(xl) {
          width: 10px !important;
          height: 10px !important;
        }
        @include respond-to(lg) {
          width: 8px !important;
          height: 8px !important;
        }
        @include respond-to(md) {
          width: 10px !important;
          height: 10px !important;
        }
        @include respond-to(sm) {
          width: 12px !important;
          height: 12px !important;
        }
      }
    }
  }
`;

export default staticStyles;
