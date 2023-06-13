import React from "react";
import styles from "./search.module.scss";

type Props = {
    placeholder: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler;
    value?: string;
};

function Search({ placeholder, onChange, onClick, value }: Props) {
    return (
        <div className={styles.searchStyle}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />

            <span onClick={onClick}>
                <i className="fa fa-search"></i>
            </span>
        </div>
    );
}

export default Search;
