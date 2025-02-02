"use client";

import Frame from "@/components/Frame";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import styles from "./setting.module.css";
import message from "@/message.json";

/**
 * 設定画面コンポーネント.
 * @returns 設定画面コンポーネント.
 */
export default function Setting(): JSX.Element {
  const router = useRouter();
  return (
    <Frame
      left={[<div key="1">{message.setting.title}</div>]}
      right={[<i key="1" className={`bi bi-person-circle ${styles.icon}`} />]}
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
      ]}
    >
      設定画面
    </Frame>
  );
}
