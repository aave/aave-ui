import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AmountFieldWithSelect {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    margin-bottom: 30px;

    &__field-inner {
      position: relative;
    }
    &__usdValue {
      font-size: $small;
      position: absolute;
      bottom: -20px;
      right: 0;
      @include respond-to(lg) {
        font-size: $extraSmall;
        bottom: -18px;
      }
      @include respond-to(md) {
        font-size: $small;
        bottom: -20px;
      }
    }

    .AmountFieldWithSelect__field {
      padding-bottom: 0;
      width: 300px;
      @include respond-to(sm) {
        width: 215px;
      }
      @include respond-to(xs) {
        width: 200px;
      }

      .Row {
        justify-content: flex-end;
      }
      .Row__content {
        flex: none;
      }

      .AmountField__error-text {
        display: none;
      }
    }
  }
`;

export default staticStyles;
