"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LOGIN_USER } from "./queries";

export const useLogin = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "아이디 또는 비밀번호를 확인해 주세요."
  );
  const [isModalVisible, setIsModalVisible] = useState(false); // 로그인 성공 모달 상태
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const router = useRouter();

  // 입력값 변경 핸들러
  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인 요청 함수
  const onClickLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          email: inputs.email,
          password: inputs.password,
        },
      });

      if (data?.loginUser?.accessToken) {
        // 로그인 성공 시 accessToken 저장
        localStorage.setItem("token", data.loginUser.accessToken);

        // FormData 리셋
        setInputs({ email: "", password: "" });

        // 로그인 성공 모달 띄우기
        setIsModalVisible(true);
      } else {
        setIsValid(true);
        setErrorMessage("로그인 정보를 확인해주세요.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("로그인 에러:", err.message);
        setIsValid(true);
        setErrorMessage(err.message || "로그인 중 오류가 발생했습니다.");
      } else {
        console.error("알 수 없는 에러 발생", err);
        setIsValid(true);
        setErrorMessage("예기치 않은 오류가 발생했습니다.");
      }
    }
  };

  // 모달 닫기 시 boards로 이동
  const handleModalClose = () => {
    setIsModalVisible(false);
    router.push("/boards");
  };

  const onClickMoveToSignup = () => {
    router.push(`/signup`);
  };

  return {
    onChangeInputs,
    isValid,
    onClickLogin,
    errorMessage,
    loading,
    isModalVisible,
    handleModalClose,
    onClickMoveToSignup,
  };
};
