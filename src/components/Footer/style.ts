import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Footer {
    position: relative;
    z-index: 2;
    padding: 10px 15px 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    @include respond-to(xl) {
      padding: 10px 10px 5px;
    }
    @include respond-to(sm) {
      display: none;
    }

    &__inside {
      @include respond-to(md) {
        display: none;
      }
    }

    .DarkModeSwitcher {
      margin-right: 10px;
    }
  }
`;

export default staticStyles;
