import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IsolatedAssetModal {
    p,
    strong {
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
    }

    aside {
      strong {
        margin-bottom: 4px;
      }
      p {
        margin-bottom: 4px;
        &:last-of-type {
          margin-bottom: 16px;
        }
      }
    }

    strong,
    a {
      font-weight: 500;
    }

    &__button--inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 32px;
    }
  }

  @media only screen and (max-height: 530px) {
    .ReactModal__Content.IsolatedAssetModal.ReactModal__Content--after-open {
      position: absolute !important;
      top: 2% !important;
      bottom: 2% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
