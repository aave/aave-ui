import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SwapDetailsWrapper {
    width: 500px;
    margin-left: 20px;
    @include respond-to(xl) {
      width: 340px;
    }
    @include respond-to(lg) {
      margin-left: 10px;
    }
    @include respond-to(md) {
      margin: 10px 0 0 0;
      width: 100%;
    }
    @include respond-to(sm) {
      margin-top: 20px;
    }

    .SwapDetailsWrapper__row {
      height: 48px;
      align-items: center;
      padding: 0 16px;
      @include respond-to(xl) {
        height: 46px;
      }
      @include respond-to(xs) {
        min-height: 46px;
        height: unset;
        padding: 5px 16px;
      }
      &:last-of-type {
        border-bottom: 1px solid transparent;
      }
    }

    .ValuePercent {
      span {
        font-weight: 600 !important;
      }
    }
  }
`;

export default staticStyles;
