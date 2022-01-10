import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Searchbar() {
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
      var result = setSuggestionsWithQuery(searchText);
      if (searchText.length < 15) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
      if (result.match) {
        backSearchQuery = result.data[0].name;
        setDisplayBackQuery(true);
        setDisplayInputQuery(true);
        setActiveId(-1);
      }

      result.data.forEach((suggestion, idx) => {
        if (idx === activeId) {
          backSearchQuery = suggestion.name;
          setDisplayBackQuery(true);
          setDisplayInputQuery(false);
        }
      });
    }
    setBackSearchQuery(backSearchQuery);
  }, [searchText, activeId]);

  const setSuggestionsWithQuery = (queryTest) => {
    const queryResult = [
      {
        id: 0,
        name: "helloworlagfeunjkdisd",
      },
      {
        id: "2",
        name: "helloworldisd",
      },
      {
        id: "3",
        name: "helloworldivenlakcm.vbelnakdojfesd",
      },
      {
        id: "4",
        name: "helloworldisd",
      },
      {
        id: "5",
        name: "hellowor  ldisd a  af a af  eafc aef feafdfgbrf va",
      },
      {
        id: "6",
        name: "helloworlagfeunjkdisd",
      },
      {
        id: "7",
        name: "helloworldisd",
      },
      {
        id: "8",
        name: "helloworldivenlakcm.vbelnakdojfesd",
      },
      {
        id: "9",
        name: "helloworldisd",
      },
      {
        id: "10",
        name: "hellowor  ldisd a  af a af  eafc aef feafdfgbrf va",
      },
    ];

    console.log("searching", queryTest);
    return { data: queryResult, match: false };
  };

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

    console.log(setSuggestionsWithQuery(searchText));
    router.push({
      pathname: `/products/search/${searchText}`,
    });
    setSearchText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.container}`}>
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
            value={searchText}
            onChange={(e) => {
              setSearchText(e.currentTarget.value);
            }}
            style={{ opacity: displayInputQuery ? "1" : "0" }}
            onKeyDown={handleKeyDown}
            className={`${styles.searchInputBar}`}
          />

          {displayBackQuery && (
            <input
              type="text"
              name="search-product-back-query"
              value={backSearchQuery}
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
                console.log(suggestion.id);
              }}
              key={idx}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
