import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .InfoBanner {
    display: flex;
    align-items: center;
    text-align: left;
    border-radius: $borderRadius;
    &__normal {
      padding: 6px 8px;
      margin: 0 15px 20px;
      font-size: $regular;
      min-height: 36px;
      display: flex;
      @include respond-to(xl) {
        font-size: $medium;
        min-height: 32px;
      }
      @include respond-to(lg) {
        font-size: $small;
        min-height: 26px;
      }
      @include respond-to(md) {
        font-size: $medium;
        margin: 0 0 15px;
        text-align: center;
        justify-content: center;
        min-height: 34px;
      }
      @include respond-to(sm) {
        margin: 10px 0 20px;
      }
    }

    &__small {
      font-size: $medium;
      padding: 4px 8px 4px 10px;
      align-items: flex-start;
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

    img {
      position: relative;
      bottom: 1px;
      margin-right: 6px;
      width: 18px;
      height: 18px;
      @include respond-to(xl) {
        width: 16px;
        height: 16px;
      }
      @include respond-to(lg) {
        width: 14px;
        height: 14px;
      }
      @include respond-to(md) {
        width: 16px;
        height: 16px;
      }
    }

    &__withoutMargin {
      margin: 0;
    }

    a {
      font-weight: 500;
    }
  }
`;

export default staticStyles;
