"use client";

import React from "react";
import styles from "@/components/login/styles.module.css";
import Image from "next/image";
import { Input, Modal } from "antd";
import { useLogin } from "./hook";

export default function LoginPage() {
  const {
    onChangeInputs,
    isValid,
    onClickLogin,
    errorMessage,
    isModalVisible,
    handleModalClose,
    onClickMoveToSignup,
  } = useLogin();

  return (
    <div className={styles.startLayout}>
      <div className={styles.componentsContainer}>
        <div className={styles.loginContainer}>
          <Image
            src="/icon/logo.png"
            alt="로고"
            width={120}
            height={75}
            className={styles.mainLogo}
          />
          <span className={styles.welcomeTitle}>
            트립트립에 오신 걸 환영합니다.
          </span>
          <div className={styles.loginNotice}>
            트립트립에 로그인 하세요.
            <div className={styles.loginInputs}>
              <Input
                type="text"
                className={
                  isValid === true ? styles.inputValid : styles.inputEmail
                }
                placeholder="이메일을 입력해 주세요."
                onChange={onChangeInputs}
              />
              <Input
                type="password"
                className={
                  isValid === true ? styles.inputValid : styles.inputPassword
                }
                placeholder="비밀번호를 입력해 주세요."
                onChange={onChangeInputs}
              />
              {isValid && (
                <div className={styles.checkInputs}>{errorMessage}</div>
              )}
            </div>
          </div>
          <button className={styles.loginButton} onClick={onClickLogin}>
            로그인
          </button>
          <button className={styles.moveToSignup} onClick={onClickMoveToSignup}>
            회원가입
          </button>
        </div>
        <Image
          src="/images/startpage.png"
          alt="메인화면"
          width={1080}
          height={0}
          className={styles.mainImage}
        />
      </div>

      <Modal
        title="로그인 성공"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        okText="확인"
      >
        <p>로그인이 완료되었습니다!</p>
      </Modal>
    </div>
  );
}
