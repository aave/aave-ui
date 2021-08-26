import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PercentLine {
    max-width: 100%;
    height: 10px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    flex: 1;

    &__color {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 10px;
      z-index: 2;
    }

    &__withBorder {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 10px;
        z-index: 1;
      }
    }
  }
`;

export default staticStyles;
