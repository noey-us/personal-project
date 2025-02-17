"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { CiWallet } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // 유저 이름 상태 추가
  const [userPoints, setUserPoints] = useState(0); // 유저 포인트 상태 추가
  const router = useRouter();
  const [userImage, setUserImage] = useState("/icon/profile_img.png");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserName(userData.name);
        setUserPoints(userData.points);
        setUserImage(userData.profileImage || "/icon/profile_img.png"); // 유저 프로필 이미지 설정
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className={styles.userProfile}>
          {/* 드롭다운 메뉴 내 유저 프로필 이미지 적용 */}
          <Image
            src={userImage}
            alt="회원 프로필"
            width={40}
            height={40}
            sizes="100vw"
            className={styles.profileImage}
          />
          <span className={styles.userName}>{userName}</span>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "points",
      label: (
        <div className={styles.dropMenu}>
          <CiWallet />
          {userPoints.toLocaleString()} P
        </div>
      ),
      disabled: true,
    },
    {
      key: "charge",
      label: (
        <>
          <Link href="/mypage" className={styles.dropMenu}>
            <AiFillThunderbolt />
            포인트 충전
          </Link>
        </>
      ),
    },
    {
      key: "logout",
      label: (
        <div className={styles.dropMenu}>
          <MdOutlineLogout /> 로그아웃
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.headerbox}>
        <div className={styles.leftbar}>
          <Image
            src="/icon/logo.png"
            alt="트립트립 로고"
            width={60}
            height={60}
            sizes="100vw"
          />
          <div className={styles.categoryNav}>
            <Link href="/boards">
              <button className={styles.triptalk}>트립토크</button>
            </Link>
            <Link href="/main">
              <button className={styles.reservation}>숙박권 구매</button>
            </Link>
            <Link href="/mypage">
              <button className={styles.mypageButton}>마이페이지</button>
            </Link>
          </div>
        </div>
        <div className={styles.personalNav}>
          {isLoggedIn ? (
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className={styles.dropdown}
            >
              <button className={styles.dropdownButton}>
                {/* 드롭다운 버튼 내 프로필 이미지 적용 */}
                <Image
                  src={userImage}
                  alt="유저 프로필"
                  width={40}
                  height={40}
                  sizes="100vw"
                  className={styles.profileButton}
                />
                <Image
                  src="/icon/down_arrow.svg"
                  alt="드롭다운"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
              </button>
            </Dropdown>
          ) : (
            <Link href="/">
              <button className={styles.toLoginButton}>
                로그인 <IoIosArrowForward />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
