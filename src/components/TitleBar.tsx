"use client";

import styles from "./TitleBar.module.css";

/**
 * タイトルバーコンポーネント.
 * @returns タイトルバーポーネント.
 */
export default function TitleBar(): JSX.Element {
  return (
    <div className={styles.main}>
      <p>タイトルバー</p>
    </div>
  );
}
