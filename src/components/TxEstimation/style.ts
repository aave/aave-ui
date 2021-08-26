import css from 'styled-jsx/css';
/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxEstimation {
    font-size: $small;
    margin: 5px auto 0;
    width: 335px;
    position: relative;
    display: flex;
    @include respond-to(lg) {
      width: 260px;
      font-size: $extraSmall;
    }
    @include respond-to(md) {
      width: 335px;
      font-size: $small;
    }

    &__title {
      flex: 1;
    }
    &__values {
      display: flex;
      align-items: center;
      .Value {
        margin: 0 2px;
      }
      .Value__value {
        font-size: $small;
        font-weight: 400;
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
        @include respond-to(md) {
          font-size: $small;
        }
      }
    }
  }
`;

// @ts-ignore
export default staticStyles;
