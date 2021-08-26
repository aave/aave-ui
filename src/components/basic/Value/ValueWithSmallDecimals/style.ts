import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ValueWithSmallDecimals {
    font-size: $regular;
    font-weight: 400;
    margin-left: 3px;
    @include respond-to(xl) {
      font-size: $small;
    }
  }
`;

export default staticStyles;
