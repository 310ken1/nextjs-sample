"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import Frame from "@/components/Frame";
import { Button } from "react-bootstrap";
import styles from "./page.module.css";
import message from "@/message.json";
import { useRouter } from "next/navigation";

/**
 * ホームページコンポーネント.
 * @returns ホームページコンポーネント.
 */
export default function Home(): JSX.Element {
  const router = useRouter();
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
      ホームページ
    </Frame>
  );
}
