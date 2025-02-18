"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useProductMain } from "./hook";
import { Button, DatePicker, Flex, Input } from "antd";
import {
  CalendarOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";

// 더미 데이터
const carouselData = [
  {
    id: 1,
    image: "/images/포항숙소.jpg",
    title: "포항: 당장 가고 싶은 숙소",
    description: "바다와 가까운 위치에 있어 훌륭한 전망을 제공합니다.",
    price: "32,900원",
  },
  {
    id: 2,
    image: "/images/거제숙소.jpg",
    title: "거제: 마음까지 깨끗해지는 하얀 숙소",
    description:
      "아름다운 거제 바다 오션뷰가 펼쳐지는 거제 바다그리고 펜션입니다.",
    price: "45,200원",
  },
  {
    id: 3,
    image: "/images/울주숙소.jpg",
    title: "울주: 마음까지 깨끗해지는 하얀 숙소",
    description: "뛰어난 청결 상태와 친절한 서비스로 호평받고 있습니다.",
    price: "41,800원",
  },
  // 필요한 데이터 추가
];

const categories = [
  { icon: "🏠", label: "전체 보기" },
  { icon: "🏨", label: "호텔" },
  { icon: "🏖️", label: "리조트" },
  { icon: "🌳", label: "펜션" },
  { icon: "⛺", label: "글램핑" },
  { icon: "🚗", label: "렌트카" },
  { icon: "🎫", label: "액티비티" },
  { icon: "🏰", label: "명소" },
  { icon: "🍽️", label: "맛집탐방" },
  { icon: "🏘️", label: "홈페이지" },
];

export default function MainComponent() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });
  const {
    onClickAvailable,
    onClickNotAvailable,
    isAvailable,
    isNotAvailable,
    keyword,
    onChangeDate,
    onChangeSearch,
    onClickSearch,
    onClickMovePage,
    onClickMoveDetail,
  } = useProductMain();

  const { RangePicker } = DatePicker;

  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainContainer}>
        {/* 제목 부분 */}
        <h2 className={styles.title}>
          2024 끝여름 낭만있게 마무리 하고 싶다면?
        </h2>

        {/* 캐러셀 영역 */}
        <div className={styles.carousel} ref={emblaRef}>
          <div className={styles.carouselContainer}>
            {carouselData.map((item) => (
              <div key={item.id} className={styles.carouselItem}>
                <Image
                  src={`${item.image}`}
                  alt={item.title}
                  className={styles.carouselImage}
                  width={512}
                  height={0}
                  sizes="100vw"
                />
                <div className={styles.carouselText}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <p>{item.description}</p>
                  <p className={styles.price}>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.adImage}>
          <Image
            src="/images/adImg.png"
            alt="광고 이미지"
            width={1280}
            height={0}
            sizes="100vw"
          />
        </div>

        {/* 숙소 목록 제목 */}
        <div className={styles.subtitle}>여기에서만 예약할 수 있는 숙소</div>

        {/* 검색 및 필터 버튼 */}
        <div className={styles.filterContainer}>
          <button
            className={
              isAvailable === true ? styles.searchButton : styles.filterButton
            }
            onClick={onClickAvailable}
          >
            예약 가능 숙소
          </button>
          <button
            className={
              isNotAvailable === true
                ? styles.searchButton
                : styles.filterButton
            }
            onClick={onClickNotAvailable}
          >
            예약 마감 숙소
          </button>
        </div>
        <div className={styles.menuContainer}>
          <div className={styles.searchContainer}>
            <Input
              onChange={onChangeSearch}
              value={keyword}
              prefix={<SearchOutlined />}
              className={styles.searchBar}
              placeholder="제목을 검색해 주세요"
            />
            <Flex className={styles.datePickerContainer}>
              <div className={styles.datePicker}>
                <CalendarOutlined />
                <RangePicker
                  format="YYYY-MM-DD"
                  className={styles.dataPickerInput}
                  style={{ flex: 1 }}
                  placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
                  onChange={onChangeDate}
                />
              </div>
            </Flex>
            <Button className={styles.searchButton} onClick={onClickSearch}>
              검색
            </Button>
          </div>
          <div>
            <Button className={styles.newWriteButton} onClick={onClickMovePage}>
              <FormOutlined />
              숙박권 판매하기
            </Button>
          </div>
        </div>
        {/* 카테고리 버튼 탭 */}
        <div className={styles.categoryTabs}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryButton}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span>{category.label}</span>
            </div>
          ))}
        </div>

        {/* 숙소 목록 그리드 */}
        {isAvailable === true ? (
          <div className={styles.gridContainer}>
            {/* 카드 반복 */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={onClickMoveDetail}
              >
                <Image
                  src="/images/거제숙소.jpg"
                  alt="숙소 이미지"
                  className={styles.cardImage}
                  width={150}
                  height={0}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>강릉</h2>
                  <span className={styles.cardDescription}>
                    숙소 설명이 들어갈 자리입니다.
                  </span>
                  <p className={styles.hashtag}>#6인 이하 #편리한 위치</p>
                  <p className={styles.cardPrice}>32,900 원</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {/* 카드 반복 */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={onClickMoveDetail}
              >
                <Image
                  src="/images/mainA.png"
                  alt="숙소 이미지"
                  className={styles.cardImage}
                  width={150}
                  height={0}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>얄라리 얄라 얄라셩...</h2>
                  <span className={styles.cardDescription}>
                    숙소 설명이 들어갈 자리입니다.
                  </span>
                  <p className={styles.hashtag}>#6인 이하 #편리한 위치</p>
                  <p className={styles.cardPrice}>32,900 원</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
