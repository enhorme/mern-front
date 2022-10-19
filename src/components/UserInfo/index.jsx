import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      {avatarUrl ? (
        <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      ) : null}
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
