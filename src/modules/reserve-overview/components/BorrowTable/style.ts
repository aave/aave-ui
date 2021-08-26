import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowTable {
    &__header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 5px;
      padding: 0 5px;
    }
    &__header-column {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 3px;
      &:first-of-type {
        justify-content: flex-start;
        max-width: 100px;
      }
      &:nth-of-type(2) {
        @include respond-to(lg) {
          display: none;
        }
        @include respond-to(md) {
          display: flex;
        }
        @include respond-to(xs) {
          display: none;
        }
      }
      &:last-of-type {
        flex: 2;
        max-width: 200px;
        @include respond-to(xl) {
          max-width: 165px;
        }
        @include respond-to(lg) {
          max-width: 140px;
        }
        @include respond-to(md) {
          max-width: 165px;
        }
      }

      p,
      .TextWithModal .TextWithModal__text {
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
      }
    }
  }
`;

export default staticStyles;
