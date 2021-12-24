import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableBottomText {
    padding: 10px;
    font-size: $regular;
    @include respond-to(xl) {
      font-size: $medium;
    }
    @include respond-to(sm) {
      font-size: $regular;
      text-align: center;
      padding: 0;
      border-top: none !important;
    }
    a {
      font-weight: 500;
    }
  }
`;

export default staticStyles;
