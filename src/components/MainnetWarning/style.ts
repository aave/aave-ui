import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MainnetWarning {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    @include respond-to(lg) {
      margin-top: 10px;
    }
    @include respond-to(md) {
      margin-top: 0;
    }

    p {
      padding: 8px 45px;
      font-size: $medium;
      border-radius: $borderRadius;
      @include respond-to(xl) {
        padding: 6px 45px;
        font-size: $small;
      }
      @include respond-to(sm) {
        padding: 10px;
        text-align: center;
      }
    }
  }
`;

export default staticStyles;
