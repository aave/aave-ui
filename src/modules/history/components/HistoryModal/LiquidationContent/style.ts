import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .LiquidationContent {
    .LiquidationContent__value {
      .SubValue__symbolUSD {
        display: inline-block;
      }
    }
  }
`;

export default staticStyles;
