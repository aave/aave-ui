import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .RiskInfoPanel {
    padding-right: 15px;
    position: relative;

    .RiskInfoPanel__link {
      position: absolute;
      right: 0;
      bottom: 0;
      img {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export default staticStyles;
