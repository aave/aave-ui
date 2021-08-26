import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NoDataPanel {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 460px;
    margin: 0 auto;
    min-height: 60%;
    @include respond-to(sm) {
      min-height: 80%;
      padding: 20px 10px;
    }

    &__button-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .NoDataPanel {
        display: block;
        min-height: auto;
      }
    }
  }
`;

export default staticStyles;
