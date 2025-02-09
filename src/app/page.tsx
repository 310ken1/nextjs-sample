"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import Frame from "@/components/Frame";
import { Button } from "react-bootstrap";
import styles from "./page.module.css";
import message from "@/message.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * ページの状態.
 */
const STATE = {
  list: 0,
  grid: 1,
} as const;
type State = (typeof STATE)[keyof typeof STATE];

/**
 * サイドバーボタン.
 * @property key キー.
 * @property icon アイコン.
 * @property onClick クリック時の処理.
 */
type SidebarButton = {
  key: string;
  icon: string;
  onClick: () => void;
};

/**
 * カスタムフレームコンポーネント.
 * @param left タイトルバーの左側の要素.
 * @param right タイトルバーの右側の要素.
 * @param top サイドバーの上側の要素.
 * @param bottom サイドバーの下側の要素.
 * @returns カスタムフレームコンポーネント.
 */
function CustomFrame({
  left,
  right,
  top,
  bottom,
  children,
}: Readonly<{
  left?: JSX.Element[];
  right?: JSX.Element[];
  top?: SidebarButton[];
  bottom?: SidebarButton[];
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <Frame
      left={left}
      right={right}
      top={top?.map(({ key, icon, onClick }) => (
        <Button
          key={key}
          className={`bi ${icon} ${styles.button}`}
          variant="light"
          onClick={onClick}
        />
      ))}
      bottom={[
        ...(bottom
          ? bottom.map(({ key, icon, onClick }) => (
              <Button
                key={key}
                className={`bi ${icon} ${styles.button}`}
                variant="light"
                onClick={onClick}
              />
            ))
          : []),
        <div key="0">powered by xxxxx</div>,
      ]}
    >
      {children}
    </Frame>
  );
}

/**
 * ホームページコンポーネント.
 * @returns ホームページコンポーネント.
 */
export default function Home(): JSX.Element {
  const router = useRouter();
  const [state, setState] = useState<State>(STATE.list);

  /* prettier-ignore */
  const topButtons : SidebarButton[] = [
    { key: "1", icon: "bi-house", onClick: () => router.push("/") },
    { key: "2", icon: "bi-arrow-clockwise", onClick: () => window.location.reload() },
    { key: "3", icon: state === STATE.list ? "bi-grid-3x3" : "bi-card-list", onClick: () => setState(state === STATE.list ? STATE.grid : STATE.list) },
  ];

  /* prettier-ignore */
  const bottomButtons: SidebarButton[] = [
    { key: "2", icon: "bi-gear", onClick: () => router.push("/setting") },
  ];

  return (
    <CustomFrame
      left={[<div key="1">{message.home.title}</div>]}
      right={[
        <div
          key="1"
          className={`bi bi-person-circle ${styles.icon}`}
          onClick={() => alert("ユーザーアイコンクリック")}
        />,
      ]}
      top={topButtons}
      bottom={bottomButtons}
    >
      {state === STATE.list ? (
        <div>リストページ</div>
      ) : (
        <div>グリッドページ</div>
      )}
    </CustomFrame>
  );
}
