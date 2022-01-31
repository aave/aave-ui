import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IsolationModeScreen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
    @include respond-to(xl) {
      max-width: 450px;
    }

    &__image,
    &__text {
      margin-bottom: 24px;
    }

    &__text {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      a {
        font-weight: 500;
      }
    }
  }
`;

export default staticStyles;
