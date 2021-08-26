import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .SelectField {
    .DropdownWrapper__content {
      width: 100%;
      top: 0;
    }

    &__select {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      font-size: $regular;
      @include respond-to(xl) {
        padding: 10px 12px;
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
    }

    &__select-value {
      opacity: 0.5;
    }
    &__selectValueActive {
      opacity: 1;
    }

    &__items {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default staticStyles;
