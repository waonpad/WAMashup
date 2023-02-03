import React, { CSSProperties } from "react";

type ExternalLinkProps = {
    url: string;
    children: React.ReactNode;
    style?: CSSProperties | {[key: string]: CSSProperties};
}

function ExternalLink (props: ExternalLinkProps):React.ReactElement {
    const {url, children, style} = props;
    
    const linkProps = (url: string) => {
        if (url.match("^http")) {
            return {
                target: "_blank",
                rel: "noopener"
            };
        }
        return {};
    };
    
    return (
        <a
            href={url}
            {...linkProps(url)}
            style={{...style, }}
        >
            {children}
        </a>
    )
}

export default ExternalLink;