"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import Frame from "@/components/Frame";
import { Button } from "react-bootstrap";
import styles from "./page.module.css";
import message from "@/message.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATE = {
  list: 0,
  grid: 1,
} as const;
type State = (typeof STATE)[keyof typeof STATE];

/**
 * ホームページコンポーネント.
 * @returns ホームページコンポーネント.
 */
export default function Home(): JSX.Element {
  const router = useRouter();
  const [state, setState] = useState<State>(STATE.list);
  return (
    <Frame
      left={[<div key="1">{message.home.title}</div>]}
      right={[
        <div
          key="1"
          className={`bi bi-person-circle ${styles.icon}`}
          onClick={() => alert("ユーザーアイコンクリック")}
        />,
      ]}
      top={[
        <Button
          key="1"
          className={`bi bi-house ${styles.button}`}
          variant="light"
          onClick={() => {
            router.push("/");
          }}
        />,
        <Button
          key="2"
          className={`bi bi-arrow-clockwise ${styles.button}`}
          variant="light"
          onClick={() => {
            window.location.reload();
          }}
        />,
        <Button
          key="3"
          className={`bi ${
            state === STATE.list ? "bi-grid-3x3" : "bi-card-list"
          } ${styles.button}`}
          variant="light"
          onClick={() => {
            setState(state === STATE.list ? STATE.grid : STATE.list);
          }}
        />,
      ]}
      bottom={[
        <Button
          key="1"
          className={`bi bi-gear ${styles.button}`}
          variant="light"
          onClick={() => {
            router.push("/setting");
          }}
        />,
      ]}
    >
      {state === STATE.list ? (
        <div>リストページ</div>
      ) : (
        <div>グリッドページ</div>
      )}
    </Frame>
  );
}
