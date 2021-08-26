import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Card {
    width: 100%;
    &__content {
      width: 100%;
      padding: 10px 15px;
      @include respond-to(xl) {
        padding: 10px;
      }
      @include respond-to(sm) {
        padding: 15px 20px;
      }

      .Row__content {
        justify-content: space-between;
      }
    }

    .TokenIcon {
      img {
        margin-right: 5px !important;
      }
    }
    .DoubleIcon {
      margin-right: 5px !important;
    }

    .TokenIcon .TokenIcon__name,
    .Value .Value__value {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    .TokenIcon .TokenIcon__name {
      b {
        font-weight: 400;
        transition: $transition;
      }
    }
  }
`;

export default staticStyles;
