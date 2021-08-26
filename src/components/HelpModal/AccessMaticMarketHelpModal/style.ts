import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReactModal__Content.AccessMaticMarketHelpModal__modal {
    max-width: 540px !important;
  }

  .TextWithModal.AccessMaticMarketHelpModal {
    display: inline-block;
  }

  .AccessMaticMarketHelpModal__content {
    .Link {
      margin-top: 30px;
      font-size: $regular;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      @include respond-to(xl) {
        font-size: $medium;
      }
      img {
        width: 14px;
        height: 14px;
        margin-left: 5px;
        @include respond-to(xl) {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
`;

export default staticStyles;
