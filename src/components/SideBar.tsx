"use client";

import styles from "./SideBar.module.css";

/**
 * サイドバーコンポーネント.
 * @param top 上側の要素.
 * @param bottom 下側の要素.
 * @returns サイドバーポーネント.
 */
export default function SideBar({
  top = [],
  bottom = [],
}: Readonly<{ top?: JSX.Element[]; bottom?: JSX.Element[] }>): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        {top.map((element, index) => (
          <div className={styles.item} key={index}>
            {element}
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        {bottom.map((element, index) => (
          <div className={styles.item} key={index}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}
