import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalTextContent {
    word-break: break-word;
    line-height: 1.3;
    @include respond-to(sm) {
      margin: 0 0 -65px -10px;
      padding: 30px 10px;
      width: calc(100% + 20px);
    }
    p,
    em,
    strong,
    blockquote,
    a,
    ul,
    li,
    h3,
    pre {
      font-size: $large;
      margin-bottom: 10px;
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
    a {
      word-break: break-all;
    }
    li {
      padding-left: 20px;
      position: relative;
      @include respond-to(lg) {
        padding-left: 10px;
      }
      @include respond-to(md) {
        padding-left: 15px;
      }
      &:after {
        content: '';
        position: absolute;
        top: 9px;
        left: 0;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        @include respond-to(xl) {
          top: 5px;
        }
        @include respond-to(lg) {
          width: 4px;
          height: 4px;
          top: 6px;
        }
        @include respond-to(md) {
          width: 6px;
          height: 6px;
        }
        @include respond-to(sm) {
          top: 6px;
        }
      }
    }

    img {
      max-width: 100%;
    }

    &__description-title {
      font-size: $large;
      padding-bottom: 10px;
      margin-bottom: 20px;
      position: relative;
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
        font-size: $large;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 1px;
        opacity: 0.2;
        @include respond-to(sm) {
          width: 100%;
          opacity: 0.8;
        }
      }
    }
  }
`;

export default staticStyles;
