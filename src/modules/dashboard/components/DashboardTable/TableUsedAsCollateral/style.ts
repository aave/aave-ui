import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableUsedAsCollateral {
    &__isolatedInner {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  }
`;

export default staticStyles;
