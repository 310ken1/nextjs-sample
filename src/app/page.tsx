"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import Frame from "@/components/Frame";
import { Button } from "react-bootstrap";
import styles from "./page.module.css";
import message from "@/message.json";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useObservationPoints } from "@/hooks/useObservationPoints";
import { useWeatherData } from "@/hooks/useMeteo";

/**
 * ページの状態.
 */
const STATE = {
  list: 0,
  grid: 1,
} as const;
type State = (typeof STATE)[keyof typeof STATE];

/**
 * 観測地点.
 * @property name 名前.
 * @property latitude 緯度.
 * @property longitude 経度.
 */
type Point = {
  name: string;
  latitude: number;
  longitude: number;
};

/**
 * モード.
 * @property state 状態.
 * @property param パラメータ.
 */
type Mode = {
  state: State;
  param: Point | undefined;
};

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
  const [mode, setMode] = useState<Mode>({
    state: STATE.list,
    param: undefined,
  });

  const {
    data: points,
    error: points_error,
    isLoading: points_isLoading,
  } = useObservationPoints();
  const {
    data: history,
    error: history_error,
    isLoading: history_isLoading,
  } = useWeatherData(
    mode.param?.latitude,
    mode.param?.longitude,
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    new Date()
  );

  const left: JSX.Element[] = [<div key="1">{message.home.title}</div>];
  const right: JSX.Element[] = [
    <div
      key="1"
      className={`bi bi-person-circle ${styles.icon}`}
      onClick={() => alert("ユーザーアイコンクリック")}
    />,
  ];

  /* prettier-ignore */
  const topButtons : SidebarButton[] = [
    { key: "1", icon: "bi-house", onClick: () => {
        router.push("/")
        setMode({ state: STATE.list, param: undefined });
      }
    },
    { key: "2", icon: "bi-arrow-clockwise", onClick: () => window.location.reload() }
 ];

  /* prettier-ignore */
  const bottomButtons: SidebarButton[] = [
    { key: "2", icon: "bi-gear", onClick: () => router.push("/setting") },
  ];

  if (points_error) {
    return <div>{points_error.message}</div>;
  }

  return (
    <CustomFrame
      left={left}
      right={right}
      top={topButtons}
      bottom={bottomButtons}
    >
      {mode.state === STATE.list ? (
        <div>
          <h1>観測地点リスト</h1>
          <ul>
            {points?.map(
              (point: {
                name: string;
                latitude: number;
                longitude: number;
              }) => (
                <li key={point.name}>
                  <a
                    href="#"
                    onClick={() => {
                      setMode({ state: STATE.grid, param: point });
                    }}
                  >
                    {point.name}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div>
          <h1>{mode.param?.name}の気温履歴</h1>
          {history?.map((data, index) => (
            <div key={index}>
              {data.temperature}
              <br />
            </div>
          ))}
        </div>
      )}
    </CustomFrame>
  );
}
