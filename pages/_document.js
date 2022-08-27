import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { ServerStyles, createStylesServer } from "@mantine/next";

const stylesServer = createStylesServer();
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {
              <ServerStyles
                html={initialProps.html}
                server={stylesServer}
                key="styles"
              />
            }
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
