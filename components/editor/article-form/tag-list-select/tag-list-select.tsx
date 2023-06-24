import React, { useEffect, useState } from "react";
import style from "./tag-list-select.module.scss";
export default function TagListSelect({
  tagList,
  onTagSelectedChange,
}: {
  tagList: string[];
  onTagSelectedChange: (value: string[]) => void;
}) {
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const handleRemoveTagSelected = (e: React.MouseEvent<HTMLElement>) => {
    const tagRemove = e.currentTarget.getAttribute("id");
    setTagsSelected(tagsSelected.filter((tag) => tag !== tagRemove));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newTag = e.currentTarget.value;
      if(tagsSelected.some(tag => tag === newTag)) {
        return;
      }
      e.currentTarget.value = "";
      setTagsSelected([...tagsSelected, newTag]);
    }
  };

  useEffect(() => {
    if (tagList && tagList.length > 0) {
      setTagsSelected(tagList);
    }
  }, []);

  useEffect(() => {
    onTagSelectedChange(tagsSelected);
  }, [tagsSelected]);

  const tagSelectedElements = tagsSelected.map((item) => (
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
