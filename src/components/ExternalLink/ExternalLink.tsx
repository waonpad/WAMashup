import React, { CSSProperties } from "react";

type ExternalLinkProps = {
    url: string;
    children: React.ReactNode;
    style?: CSSProperties | {[key: string]: CSSProperties};
}

export const ExternalLink = (props: ExternalLinkProps) => {
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
};