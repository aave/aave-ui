import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableHeader {
    display: flex;
    width: 100%;
    padding: 0 10px;
    margin-bottom: 5px;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      max-width: 100%;
      &:first-of-type {
        align-items: flex-start;
        text-align: left;
        max-width: 160px;
        @include respond-to(lg) {
          max-width: 250px;
        }
      }
      &:last-of-type,
      &:nth-last-of-type(2) {
        max-width: 100px;
        @include respond-to(xl) {
          max-width: 80px;
        }
        @include respond-to(lg) {
          max-width: 90px;
        }
        @include respond-to(md) {
          max-width: 80px;
        }
      }
    }

    &__title,
    .TextWithModal__text {
      font-size: $medium;
      font-weight: 500;
      @include respond-to(xl) {
        font-size: $small;
      }
    }
  }
`;

export default staticStyles;
