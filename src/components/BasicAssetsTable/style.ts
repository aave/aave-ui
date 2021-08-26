import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableHeaderWrapper .TableHeaderButton.BasicAssetsTable__title {
    span {
      font-size: $small;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
