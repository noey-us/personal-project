"use client";

import { useBoardsList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { IBoardsListProps } from "./types";
import Link from "next/link";
import { useSearchComponent } from "../search/hook";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";

export default function BoardList(
  props: IBoardsListProps & { keyword: string }
) {
  const { onClickDelete } = useBoardsList();
  const { keyword } = useSearchComponent(props);
  console.log("🚀 ~ BoardList ~ keyword:", keyword);
  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: { page: 1 }, // 페이지 번호를 맞춰주면, 해당 페이지의 데이터만 가져올 수 있음
  });

  return (
    <div className={styles.boardLayout}>
      <div className={styles.boardBox}>
        <div className={styles.boardNav}>
          <span className={styles.navText}>번호</span>
          <span className={styles.navTitle}>제목</span>
          <span className={styles.navText}>작성자</span>
          <span className={styles.navText}>날짜</span>
        </div>
        {data?.fetchBoards.map((el, index) => {
          return (
            <div className={styles.postLists} key={el._id}>
              {/* 게시글 하나 */}
              <Link href={`/boards/${el._id}`}>
                <div className={styles.eachPost}>
                  <div className={styles.postNumber}>{index + 1}</div>
                  <div className={styles.postTitle}>
                    {/* <span style={{ margin: "10px" }}>{el.title}</span> */}
                    <span style={{ margin: "10px" }}>
                      {el.title
                        .replaceAll(keyword, `@#$${keyword}@#$`)
                        .split("@#$")
                        .map((item, index) => (
                          <span
                            key={index}
                            style={{
                              color: keyword.includes(item) ? "red" : "black",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                    </span>
                  </div>
                  <div className={styles.postWriter}>{el.writer}</div>
                  <div className={styles.postCreateAt}>
                    {new Date(el.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <button
                    className={styles.deleteButton}
                    id={el._id}
                    onClick={(event) => {
                      onClickDelete(event);
                      // 게시글 삭제 후 리스트 갱신
                      refetch(); // 데이터를 새로 가져옴
                    }}
                  >
                    <Image
                      src="/icon/delete.svg"
                      className={styles.deleteImg}
                      alt="프로필 이미지"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
