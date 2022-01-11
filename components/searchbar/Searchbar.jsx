import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Searchbar() {
  // define IP of backend to get data
  const IP2 = "http://localhost:5000";

  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeId, setActiveId] = useState(-1);
  const [backSearchQuery, setBackSearchQuery] = useState("");
  const [displayBackQuery, setDisplayBackQuery] = useState(false);
  const [displayInputQuery, setDisplayInputQuery] = useState(true);
  const router = useRouter();

  useEffect(() => {
    var backSearchQuery = searchText;
    if (searchText.length > 3 && searchText.length < 25) {
      async function func() {
        const result = await fetch(
          `${IP2}/api/product/autocomplete/${searchText}`
        )
          .then((result) => result.json())
          .then((result) => {
            if (searchText.length < 15) {
              setSuggestions(result.data);
            } else {
              setSuggestions([]);
            }
            if (result.match) {
              backSearchQuery = result.data[0].title;
              setDisplayBackQuery(true);
              setDisplayInputQuery(true);
              setActiveId(-1);
            }

            result.data.forEach((suggestion, idx) => {
              if (idx === activeId) {
                backSearchQuery = suggestion.title;
                setDisplayBackQuery(true);
                setDisplayInputQuery(false);
              }
            });
          });
        setBackSearchQuery(backSearchQuery);
      }
      func();
    }
  }, [searchText, activeId]);

  const handleKeyDown = (e) => {
    if (suggestions.length > 1) {
      if (e.keyCode === 38 && activeId > 0) {
        setActiveId(activeId - 1);
      } else if (e.keyCode === 38 && activeId === 0) {
        setActiveId(suggestions.length - 1);
      } else if (e.keyCode === 40 && activeId < suggestions.length - 1) {
        setActiveId(activeId + 1);
      } else if (e.keyCode === 40 && activeId === suggestions.length - 1) {
        setActiveId(0);
      }
    }
    if (e.keyCode === 9) {
      e.preventDefault();
      setDisplayBackQuery(false);
      setDisplayInputQuery(true);
      setActiveId(-1);
      setSearchText(backSearchQuery);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/products/search/${searchText}`,
    });
    console.log("form");
    setSearchText("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="searchForm"
        className={`${styles.container}`}
      >
        <div className={`${styles.searchBar}  bg_gradient`}>
          <Image
            src={"/assets/img/logo.webp"}
            alt="logo of doge cart"
            width="30px"
            height="30px"
            className={`${styles.img}`}
          />

          <input
            type="text"
            placeholder="Search for the product !"
            name="search-product"
            value={searchText.toLowerCase()}
            onChange={(e) => {
              setSearchText(e.currentTarget.value.toLowerCase());
            }}
            onEnter={(e) => {
              console.log("form enter");
            }}
            style={{ opacity: displayInputQuery ? "1" : "0" }}
            onKeyDown={handleKeyDown}
            className={`${styles.searchInputBar}`}
          />

          {displayBackQuery && (
            <input
              type="text"
              name="search-product-back-query"
              value={backSearchQuery.toLowerCase()}
              onKeyDown={handleKeyDown}
              disabled={true}
              className={`${styles.backSearchQuery}`}
            />
          )}

          <Image
            src={"/assets/img/searchIcon.webp"}
            alt="logo of doge cart"
            width="25px"
            height="25px"
            className={`${styles.img}`}
          />
        </div>
        <ul className={styles.queryresultContainer}>
          {suggestions.map((suggestion, idx) => (
            <li
              className={`${styles.querybox} ${
                activeId === idx ? styles.activeQuery : " "
              }`}
              onClick={(e) => {
                router.push({
                  pathname: `/products/${suggestion.category}/${suggestion.subCategory}/${suggestion._id}`,
                });
              }}
              key={idx}
            >
              {suggestion.title.toLowerCase()}
            </li>
          ))}
        </ul>
        <input style={{ display: "none" }} type="submit" />
      </form>
    </>
  );
}
