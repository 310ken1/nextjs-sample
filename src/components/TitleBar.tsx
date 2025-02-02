"use client";

import styles from "./TitleBar.module.css";

/**
 * タイトルバーコンポーネント.
 * @param left 左側の要素.
 * @param right 右側の要素.
 * @returns タイトルバーポーネント.
 */
export default function TitleBar({
  left = [],
  right = [],
}: Readonly<{ right?: JSX.Element[]; left?: JSX.Element[] }>): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        {left.map((element, index) => (
          <div className={styles.item} key={index}>
            {element}
          </div>
        ))}
      </div>
      <div className={styles.right}>
        {right.map((element, index) => (
          <div className={styles.item} key={index}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
}
