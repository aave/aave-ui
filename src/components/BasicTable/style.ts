import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;

    position: relative;
    z-index: 1;
    @include respond-to(sm) {
      flex: none;
      display: block;
      margin: 0;
      width: 100%;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex: auto;
      min-height: 250px;
      @include respond-to(sm) {
        height: auto;
      }
    }

    &__content-inner {
      display: block;

      @include respond-to(sm) {
      }
    }

    &__header {
      height: 50px;
      width: 100%;
      border-radius: 5px;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border: solid 1px rgba(255, 255, 255, 0.68);
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3) -6%,
        rgba(255, 255, 255, 0.3) 59%
      );
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 45px;
      @include respond-to(xl) {
        padding: 0 35px;
      }
      @include respond-to(lg) {
        padding: 0 25px;
      }
      @include respond-to(sm) {
        padding: 0 15px;
        margin-bottom: 0;
      }
    }
  }
`;

export default staticStyles;
