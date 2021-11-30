import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ChangeValue {
    display: flex;
    align-items: center;
    justify-content: center;
    .HealthFactor {
      margin: 0;
    }

    &__icon {
      width: 14px;
      height: 12px;
      margin: 0 8px;
    }
  }
`;

export default staticStyles;
