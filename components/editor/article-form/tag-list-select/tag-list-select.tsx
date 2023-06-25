import React, { useEffect, useState } from "react";
import style from "./tag-list-select.module.scss";
export default function TagListSelect({
  tagList,
  onTagSelectedChange,
}: {
  tagList: string[];
  onTagSelectedChange: (value: string[]) => void;
}) {
  const handleRemoveTagSelected = (e: React.MouseEvent<HTMLElement>) => {
    const tagRemove = e.currentTarget.getAttribute("id");
    const newTagsSelected = tagList.filter((tag) => tag !== tagRemove);
    onTagSelectedChange(newTagsSelected);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newTag = e.currentTarget.value;
      if (tagList.some((tag) => tag === newTag)) {
        return;
      }
      e.currentTarget.value = "";
      const newTagsSelected = [...tagList, newTag];
      onTagSelectedChange(newTagsSelected);
    }
  };

  const tagSelectedElements = tagList.map((item) => (
    <div key={item} className={`${style["tag-default"]} ${style["tag-pill"]}`}>
      <i
        id={item}
        className={`${style["remove-icon"]} fa-solid fa-xmark me-1`}
        onClick={handleRemoveTagSelected}
      ></i>
      {item}
    </div>
  ));

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Enter tags"
        onKeyUp={handleAddTag}
      />
      <div className={style["tag-list"]}>{tagSelectedElements}</div>
    </div>
  );
}
