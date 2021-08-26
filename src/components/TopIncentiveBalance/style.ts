import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopIncentiveBalance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: $borderRadius;
    padding: 2px 2px 2px 10px;
    @include respond-to(sm) {
      width: calc(100% - 20px);
      margin: 0 10px 20px;
    }

    &__title {
      margin-right: 20px;
    }

    .TopIncentiveBalance__title,
    .Value .Value__value {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    &__right--inner {
      display: flex;
      align-items: center;
      justify-content: center;

      .DefaultButton {
        width: 90px;
        min-height: 34px;
        font-size: $small;
        border: none;
        @include respond-to(xl) {
          width: 70px;
          min-height: 24px;
          font-size: $extraSmall;
        }
        @include respond-to(sm) {
          width: 90px;
          min-height: 30px;
        }
      }
    }

    &__value--inner {
      display: flex;
      align-items: center;
      justify-content: center;

      .TokenIcon {
        margin-left: 5px;
      }
    }
  }
`;

export default staticStyles;
