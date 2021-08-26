import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableButtonCol__button.TableButtonCol__button {
    width: 90px;
    min-height: 32px;
    margin: 5px 1px;
    font-size: $medium;
    @include respond-to(xl) {
      width: 70px;
      min-height: 24px;
      font-size: $extraSmall;
    }
    @include respond-to(lg) {
      width: 80px;
      min-height: 28px;
      font-size: $small;
    }
    @include respond-to(md) {
      width: 70px;
      min-height: 24px;
      font-size: $extraSmall;
    }
  }
`;

export default staticStyles;
