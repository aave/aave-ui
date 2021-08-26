import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopDisclaimer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: $boxShadow;
    font-size: $medium;
    padding: 6px 20px;
    @include respond-to(xl) {
      font-size: $extraSmall;
    }
    @include respond-to(sm) {
      align-items: flex-start;
      padding: 7px 10px;
    }

    p {
      flex: 1;
      padding-right: 10px;
      @include respond-to(md) {
        max-width: 575px;
      }
      @include respond-to(sm) {
        max-width: 100%;
        padding-right: 30px;
      }
    }

    a {
      font-style: italic;
    }

    button {
      transition: $transition;
      &:hover {
        opacity: 0.7;
      }

      img {
        width: 12px;
        height: 12px;
        @include respond-to(xl) {
          width: 8px;
          height: 8px;
        }
        @include respond-to(md) {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
`;

export default staticStyles;
