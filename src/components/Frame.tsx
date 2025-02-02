"use client";

import styles from "./Frame.module.css";
import SideBar from "./SideBar";
import TitleBar from "./TitleBar";

/**
 * フレームコンポーネント.
 * @returns フレームコンポーネント.
 */
export default function Frame({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className={styles.main}>
      <TitleBar />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
