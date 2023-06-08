import { StringifyOptions } from "querystring";
import React, { ReactNode } from "react";
import styles from "./button.module.scss";

type Props = {
    onClick?: () => void;
    loading?: boolean;
    title: string | ReactNode;
    color?: string;
    bgColor?: string;
    borderColor?: string;
    margin?: string;
};

function Button({
    title,
    onClick,
    loading,
    color = "#fff",
    bgColor = "#f6ba35",
    borderColor = "transparent",
    margin,
}: Props) {
    return (
        <button
            className={styles.buttonStyle}
            style={{
                color: color,
                backgroundColor: bgColor,
                borderColor: borderColor,
                margin: margin,
            }}
            onClick={onClick}
            disabled={loading}
        >
            {title}
        </button>
    );
}

export default Button;
