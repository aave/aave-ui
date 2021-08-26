import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AssetSwapWrapper__content {
    overflow: hidden;
    @include respond-to(sm) {
      overflow: unset;
    }
  }
`;

export default staticStyles;
