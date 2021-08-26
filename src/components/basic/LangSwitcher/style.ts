import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .LangSwitcher {
    &__button {
      width: 26px;
      height: 19px;
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      border-style: solid;
      border-width: 1px;
      @include respond-to(sm) {
        width: 61px;
        height: 46px;
        border-width: 5px;
        border-radius: 2px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }

    &__content {
      width: 240px;
      position: relative;
      @include respond-to(xl) {
        width: 180px;
      }
      @include respond-to(sm) {
        width: 260px;
      }
      h4 {
        padding: 14px 15px;
        font-size: $large;
        text-align: center;
        font-weight: 300;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(sm) {
          font-size: $regular;
          padding: 20px;
        }
      }
    }

    &__content-line {
      position: absolute;
      height: 20px;
      width: 100%;
      z-index: 5;
      top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(xl) {
        top: 45px;
      }
      @include respond-to(md) {
        top: 48px;
      }
      @include respond-to(sm) {
        top: 60px;
      }
      img {
        width: 9px;
        height: 10px;
      }
    }
    &__content-lineTop {
      img {
        transform: rotate(180deg);
      }
    }
    &__content-lineBottom {
      top: auto;
      bottom: 0;
    }

    &__languagesWrapper {
      height: 300px;
      @include respond-to(xl) {
        height: 250px;
      }
      @include respond-to(md) {
        height: 280px;
      }
    }
    &__languages {
      padding: 5px 10px 15px 0;
    }

    &__language {
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      &:hover {
        border-bottom: 1px solid transparent;
      }
      @include respond-to(sm) {
        padding: 20px;
      }
      &:last-child {
        border-bottom: none !important;
      }
      img {
        width: 26px;
        transition: $transition;
        @include respond-to(sm) {
          width: 31px;
        }
      }
      p {
        font-size: $large;
        font-weight: 300;
        transition: $transition;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $extraLarge;
        }
      }
    }
    &__languageActive {
      cursor: default;
      background: transparent !important;
      p {
        font-weight: 600;
      }
    }

    &__inside {
      .LangSwitcher__button {
        @include respond-to(md) {
          width: 61px;
          height: 46px;
          border-width: 5px;
          border-radius: 2px;
        }
      }
      .LangSwitcher__content {
        @include respond-to(md) {
          width: 240px;
          h4 {
            font-size: $regular;
          }
        }
        .LangSwitcher__language {
          @include respond-to(md) {
            padding: 20px;
            img {
              width: 31px;
            }
            p {
              font-size: $large;
            }
          }
        }
      }
    }
  }
`;

export default staticStyles;
