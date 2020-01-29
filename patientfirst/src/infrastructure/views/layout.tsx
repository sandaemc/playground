import * as React from 'react';
import HeaderView from './common/header';

export default class LayoutView extends React.Component<{}, {}> {
    public render() {
        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="theme-color" content="#000000" />
                    <script src="/assets/fonts/js/webfont.js" />
                    <script src="/font-cache.js" type="text/javascript"></script>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link href="/assets/vendors/base/vendors.bundle.css" rel="stylesheet" type="text/css" />
                    <link href="/assets/demo/demo5/base/style.bundle.css" rel="stylesheet" type="text/css" />
                    <title>Patient First</title>
                </head>
                <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <div className="m-grid m-grid--hor m-grid--root m-page">
                        <HeaderView />
                        <div className="m-grid__item m-grid__item--fluid  m-grid m-grid--ver-desktop m-grid--desktop m-container m-container--responsive m-container--xxl m-page__container m-body">
                            <div className="m-grid__item m-grid__item--fluid m-wrapper">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                    <script src="/assets/vendors/base/vendors.bundle.js" type="text/javascript"></script>
                    <script src="/assets/demo/demo5/base/scripts.bundle.js" type="text/javascript"></script>
                </body>
            </html>

        );
    }
}


