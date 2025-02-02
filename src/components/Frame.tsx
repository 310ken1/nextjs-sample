"use client";

import styles from "./Frame.module.css";
import SideBar from "./SideBar";
import TitleBar from "./TitleBar";

/**
 * フレームコンポーネント.
 * @param left タイトルバーの左側の要素.
 * @param right タイトルバーの右側の要素.
 * @param top サイドバーの上側の要素.
 * @param bottom サイドバーの下側の要素.
 * @returns フレームコンポーネント.
 */
export default function Frame({
  left,
  right,
  top,
  bottom,
  children,
}: Readonly<{
  left?: JSX.Element[];
  right?: JSX.Element[];
  top?: JSX.Element[];
  bottom?: JSX.Element[];
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className={styles.main}>
      <TitleBar left={left} right={right} />
      <div className={styles.content}>
        <SideBar top={top} bottom={bottom} />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
