import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .FormattedTxErrorText {
    margin-bottom: 20px;
    @include respond-to(xl) {
      margin-bottom: 15px;
    }
    @include respond-to(lg) {
      margin-bottom: 10px;
    }
    @include respond-to(md) {
      margin-bottom: 15px;
    }
    @include respond-to(sm) {
      margin-bottom: 20px;
    }
    span {
      display: inline-block;
      margin-bottom: 15px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

export default staticStyles;
