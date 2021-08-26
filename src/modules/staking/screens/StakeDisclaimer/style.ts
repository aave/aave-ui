import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakeDisclaimer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    &__caption-inner {
      margin-bottom: 30px;
      max-width: 650px;
      @include respond-to(xl) {
        max-width: 500px;
      }
      @include respond-to(md) {
        margin-bottom: 50px;
      }

      img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        @include respond-to(xl) {
          width: 40px;
          height: 40px;
        }
        @include respond-to(lg) {
          width: 30px;
          height: 30px;
        }
        @include respond-to(md) {
          width: 40px;
          height: 40px;
        }
      }

      h2 {
        font-size: $large;
        margin-bottom: 10px;
        @include respond-to(xl) {
          font-size: $regular;
        }
      }

      div {
        font-size: $large;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(lg) {
          font-size: $medium;
        }
        @include respond-to(md) {
          font-size: $regular;
        }

        strong {
          white-space: nowrap;
        }

        p {
          margin-bottom: 15px;
        }
      }
    }

    &__link-inner,
    &__checkbox-inner {
      margin-bottom: 50px;
      @include respond-to(lg) {
        margin-bottom: 30px;
      }
      @include respond-to(md) {
        margin-bottom: 50px;
      }
    }

    &__link-inner {
      .StakeDisclaimer__link {
        display: flex;
        align-items: center;

        span {
          font-size: $regular;
          @include respond-to(xl) {
            font-size: $medium;
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

        img {
          width: 16px;
          height: 16px;
          margin-left: 5px;
          @include respond-to(lg) {
            width: 12px;
            height: 12px;
          }
          @include respond-to(md) {
            width: 16px;
            height: 16px;
          }
          @include respond-to(sm) {
            margin-left: 10px;
          }
        }
      }
    }

    &__checkbox-inner {
      .StakeDisclaimer__checkbox {
        .CheckBoxField__label {
          p {
            font-size: $regular;
            @include respond-to(xl) {
              font-size: $medium;
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
        }
      }
    }
  }
`;

export default staticStyles;
