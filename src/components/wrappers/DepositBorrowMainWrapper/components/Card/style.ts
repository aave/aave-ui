import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Card {
    width: 100%;
    &__content {
      width: 100%;
      padding: 5px 15px 10px;
      @include respond-to(xl) {
        padding: 5px 10px 10px;
      }
      @include respond-to(sm) {
        padding: 10px 20px 15px;
      }

      .Row__content {
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }

    .TokenIcon {
      &__image {
        margin-right: 5px !important;
      }
    }
    .MultipleIcons {
      margin-right: 5px !important;
      .TokenIcon__image {
        margin-right: 0 !important;
      }
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
    }

    .TokenIcon,
    .Value {
      margin-top: 5px;
    }

    .Value {
      flex: 1;
    }

    .TokenIcon .TokenIcon__name {
      @include respond-to(md) {
        max-width: 120px;
      }

      b {
        font-weight: 400;
        transition: $transition;
      }
    }
  }
`;

export default staticStyles;
