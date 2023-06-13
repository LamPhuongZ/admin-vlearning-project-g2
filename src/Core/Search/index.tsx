import React from "react";
import styles from "./search.module.scss";

type Props = {
    placeholder: string;
    onChange?: React.ChangeEventHandler;
    onClick?: React.MouseEventHandler;
};

function Search({ placeholder, onChange, onClick }: Props) {
    return (
        <div className={styles.searchStyle}>
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />

            <span onClick={onClick}>
                <i className="fa fa-search"></i>
            </span>
        </div>
    );
}

export default Search;
