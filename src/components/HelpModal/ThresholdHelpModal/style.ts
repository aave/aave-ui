import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ThresholdHelpModal {
    &__content {
      p {
        margin-bottom: 20px;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        img {
          width: 16px;
          height: 16px;
          margin-left: 5px;
          @include respond-to(xl) {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
