import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BorrowTableItem {
    box-shadow: $boxShadow;
    border-radius: $borderRadius;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 5px;
    margin-bottom: 5px;
    &:last-of-type {
      margin-bottom: 0;
    }

    &__column {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
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
      &:nth-of-type(3) {
        justify-content: flex-end;
        @include respond-to(md) {
          justify-content: center;
        }
      }
      &:last-of-type {
        flex: 2;
        max-width: 200px;
        justify-content: flex-end;
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

      a {
        margin-right: 5px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    .BorrowTableItem__button {
      width: 90px;
      min-height: 32px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 70px;
        min-height: 24px;
        font-size: $small;
      }
      @include respond-to(lg) {
        width: 55px;
        min-height: 26px;
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        width: 70px;
        min-height: 32px;
      }
    }
    &__buttonNoBorder {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .Switcher__label {
      font-size: $small;
      margin-right: 5px;
    }
    .TokenIcon__name {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
  }
`;

export default staticStyles;
