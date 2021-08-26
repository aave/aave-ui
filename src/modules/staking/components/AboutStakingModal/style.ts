import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AboutStakingModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    .AboutStakingModal__title {
      .TextWithModal__text {
        font-weight: 600;
      }
    }

    &__modal-content {
      display: flex;
      text-align: center;
      @include respond-to(sm) {
        flex-direction: column;
      }

      ul {
        li {
          font-size: $large;
          font-weight: 300;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          @include respond-to(xl) {
            font-size: $medium;
          }
          img {
            height: 16px;
            margin-right: 20px;
            @include respond-to(xl) {
              height: auto;
              width: 16px;
              margin-right: 5px;
            }
          }
        }
      }
    }

    &__modal-left,
    &__modal-right {
      width: 400px;
      position: relative;
      @include respond-to(xl) {
        width: 350px;
      }
      @include respond-to(sm) {
        width: 320px;
      }

      &:first-of-type {
        padding-right: 20px;
        @include respond-to(xl) {
          padding-right: 15px;
        }
        @include respond-to(sm) {
          padding-right: 0;
        }
        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: -20px;
          height: calc(100% + 40px);
          width: 2px;
        }
        @include respond-to(sm) {
          margin-bottom: 30px;
          padding-bottom: 30px;
          &:after {
            top: auto;
            bottom: 0;
            right: auto;
            left: -15px;
            height: 2px;
            width: calc(100% + 30px);
          }
        }
      }

      &:last-of-type {
        padding-left: 20px;
        @include respond-to(xl) {
          padding-left: 15px;
        }
        @include respond-to(sm) {
          padding-left: 0;
        }
      }
    }

    &__modal-captionInner {
      margin-bottom: 20px;
      img {
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
        @include respond-to(xl) {
          width: 30px;
          height: 30px;
        }
      }
      h3 {
        font-size: $extraLarge;
        margin-bottom: 10px;
        font-weight: 600;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(lg) {
          font-size: $medium;
        }
        @include respond-to(md) {
          font-size: $regular;
        }
      }
      p {
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
        @include respond-to(sm) {
          font-size: $medium;
        }
        a {
          font-weight: 600;
        }
      }
    }
  }

  .ReactModal__Content.AboutStakingModal__modal {
    max-width: 100% !important;
    padding: 20px !important;
    @include respond-to(sm) {
      padding: 15px !important;
    }
  }
  @media only screen and (max-height: 750px) and (max-width: 768px) {
    .ReactModal__Content.AboutStakingModal__modal {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
