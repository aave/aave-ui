import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SlippageForm {
    padding: 8px 16px;

    &__button {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      @include respond-to(xl) {
        height: 30px;
      }
      &:hover {
        img {
          transform: rotate(180deg);
        }
      }
      img {
        transition: all 0.5s ease;
      }

      .Row {
        width: 100%;
      }
    }

    &__dropdown {
      padding-top: 8px;
      display: none;
    }
    &__dropdownVisible {
      display: block;
    }
    &__percentages {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__percent {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $regular;
      width: 70px;
      height: 32px;
      border-radius: 2px;
      @include respond-to(xl) {
        font-size: $medium;
        width: 50px;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }
    &__fieldInner {
      width: calc(100% - 240px);
      @include respond-to(xl) {
        width: calc(100% - 174px);
      }
    }
    .SlippageForm__field {
      position: relative;
      &:after {
        content: '%';
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: $regular;
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(md) {
          font-size: $regular;
        }
      }
      input {
        height: 32px;
        border-radius: 2px;
        padding: 0 8px;
      }
    }
  }
`;

export default staticStyles;
