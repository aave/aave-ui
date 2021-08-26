import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .PayloadModal {
    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__payload {
      margin-bottom: 40px;
      padding: 20px 15px;
      @include respond-to(xl) {
        padding: 20px 10px;
      }
      @include respond-to(lg) {
        padding: 10px;
      }
      @include respond-to(md) {
        padding: 20px 10px;
      }
      @include respond-to(sm) {
        padding: 10px;
      }
    }
  }
`;

export default staticStyles;
