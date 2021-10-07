import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HistoryItem {
    @include respond-to(sm) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 0 !important;
    }
    &__right-inner {
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        margin-top: 5px;
      }
    }

    &__image {
      margin-right: 25px;
      @include respond-to(xl) {
        margin-right: 10px;
      }
      img {
        width: 35px;
        height: 35px;
        @include respond-to(xl) {
          width: 30px;
          height: 30px;
        }
      }
    }

    &__info-inner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      p {
        font-size: $large;
        margin-bottom: 3px;
        @include respond-to(xl) {
          font-size: $medium;
        }
      }
      span {
        font-size: $medium;
        font-weight: 300;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
      }
    }

    &__left-inner {
      padding-left: 5px;
      @include respond-to(sm) {
        margin-top: 5px;
      }
    }
  }
`;

export default staticStyles;
