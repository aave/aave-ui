import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CapsTooltip {
    text-align: center;
    position: relative;
    img {
      width: 11px;
      height: 11px;
      @include respond-to(lg) {
        width: 10px;
        height: 10px;
      }
    }
  }
`;

export default staticStyles;
