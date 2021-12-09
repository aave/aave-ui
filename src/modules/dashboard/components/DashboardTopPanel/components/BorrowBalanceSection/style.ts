import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowBalanceSection {
    &__row {
      align-items: center !important;
      @include respond-to(md) {
        width: 100%;
      }
      .Row__title-inner {
        @include respond-to(lg) {
          align-items: center;
          margin-bottom: 5px !important;
        }
        @include respond-to(md) {
          margin-bottom: 0 !important;
        }
      }
      .Row__title {
        padding-right: 26px;
        @include respond-to(lg) {
          padding-right: 16px !important;
        }
      }
      &--title {
        .TextWithModal__text {
          font-size: $regular;
          @include respond-to(xl) {
            font-size: $medium;
          }
        }
      }
    }
  }
`;

export default staticStyles;
