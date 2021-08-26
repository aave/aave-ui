import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DotStatus {
    font-size: $medium;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap;
    @include respond-to(xl) {
      font-size: $small;
    }
    @include respond-to(lg) {
      font-size: $extraSmall;
    }
    @include respond-to(md) {
      font-size: $small;
    }

    .DotStatus__loader {
      left: 5px;
      margin-left: 5px;
      top: 3px;
    }

    &__dot {
      width: 10px;
      height: 10px;
      margin-left: 5px;
      border-radius: 50%;
    }
  }
`;

export default staticStyles;
