import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableAvailableHeader {
    display: block;
    width: 100%;
    padding: 0 10px;
    margin-top: 50px;

    &__inner {
      display: flex;
      flex-direction: row;
      flex: 2;
      width: 100%;
      margin-bottom: 10px;
      @include respond-to(sm) {
        margin-bottom: 3px;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      text-align: center;
      flex: 1;
      &:first-child {
        align-items: flex-start;
        text-align: left;
        .TableAvailableHeader__title {
          font-weight: 600;
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
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }
  }
`;

export default staticStyles;
