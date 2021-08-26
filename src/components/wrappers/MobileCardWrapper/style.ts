import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MobileCardWrapper {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    width: 100%;
    margin-bottom: 10px;

    &__symbol--inner {
      padding: 10px 15px;
    }

    &__content {
      padding: 10px 15px 20px;
    }

    .TokenIcon__name {
      max-width: 250px;
      b {
        font-size: $medium;
      }
    }

    .Row .Row__title,
    .Value .SubValue,
    .TextWithModal__text {
      font-size: $medium;
    }

    .Row__center {
      align-items: center;
    }

    .DefaultButton {
      width: 120px;
      min-height: 36px;
      font-size: $small;
    }
  }
`;

export default staticStyles;
