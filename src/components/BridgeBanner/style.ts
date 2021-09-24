import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BridgeBanner {
    width: 100%;
    display: flex;
    border-radius: 50px;
    padding: 8px 24px;
    color: white;
    justify-content: space-between;
    position: relative;

    &__logo {
      display: flex;
      align-items: center;
    }

    &__title {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      align-items: center;

      @include respond-to(md) {
        position: relative;
        max-width: 343px;
      }
    }

    &__link {
      display: flex;
      align-items: center;
      @include respond-to(md) {
        right: 8px;
        top: 8px;
        position: absolute;
      }
    }

    @include respond-to(md) {
      flex-direction: column;
      align-items: center;
      border-radius: 0;
      div {
        padding: 4px;
      }
    }
  }
`;

export default staticStyles;
