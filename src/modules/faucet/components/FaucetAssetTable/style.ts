import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .FaucetAssetTable {
    .TableColumn {
      &:last-of-type {
        align-items: flex-end;
      }
    }
  }
`;

export default staticStyles;
