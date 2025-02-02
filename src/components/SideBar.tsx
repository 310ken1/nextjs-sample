"use client";

import styles from "./SideBar.module.css";

/**
 * サイドバーコンポーネント.
 * @returns サイドバーポーネント.
 */
export default function SideBar(): JSX.Element {
  return (
    <div className={styles.main}>
      <p>サイドバー</p>
    </div>
  );
}
