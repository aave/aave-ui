import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .InfoWrapper {
    width: 420px;
    position: absolute;
    z-index: 2;
    right: 20px;
    bottom: 20px;
    @include respond-to(xl) {
      width: 310px;
      right: 10px;
      bottom: 10px;
    }
    @include respond-to(lg) {
      width: 280px;
    }
    @include respond-to(md) {
      width: 300px;
    }
    @include respond-to(sm) {
      width: 100%;
      max-width: 380px;
      position: static;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 30px auto 0;
    }
  }
`;

export default staticStyles;
