import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DebtCeilingInfo {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .TextWithModal__text {
      white-space: nowrap;
    }

    &__modal--text {
      font-size: $large;
      margin-bottom: 32px;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      a {
        font-weight: 500;
      }
    }

    &__values {
      display: flex;
      align-items: center;
      padding-left: 20px;
      flex-wrap: wrap;
      justify-content: flex-end;
      &--divider {
        margin: 0 2px;
      }
    }
  }
`;

export default staticStyles;
