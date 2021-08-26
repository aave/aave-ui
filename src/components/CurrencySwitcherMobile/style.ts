import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CurrencySwitcherMobile {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    &__title {
      font-weight: 300;
      font-size: $regular;
      margin-bottom: 8px;
    }
  }
`;

export default staticStyles;
