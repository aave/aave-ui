import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .InfoWrapper {
    padding: 20px;
    border-radius: $borderRadius;
    margin-bottom: 20px;

    &__text {
      text-align: left;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
    }

    &__textTop {
      max-width: 87%;
    }

    &__content {
      margin: 20px 0;
    }
  }
`;

export default staticStyles;
